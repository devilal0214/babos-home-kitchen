import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import { authenticateAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Public: Submit a new order (called from cart page before WhatsApp opens)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { customer_name, customer_mobile, delivery_type, delivery_date, delivery_time, address, items, subtotal } = req.body;

  if (!customer_name || !customer_mobile || !delivery_type || !delivery_date || !delivery_time || !Array.isArray(items)) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const db = getDb();
    const result = db.prepare(
      'INSERT INTO orders (customer_name, customer_mobile, delivery_type, delivery_date, delivery_time, address, items_json, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(
      customer_name,
      customer_mobile,
      delivery_type,
      delivery_date,
      delivery_time,
      address || null,
      JSON.stringify(items),
      Number(subtotal) || 0,
    );
    res.status(201).json({ id: Number(result.lastInsertRowid), success: true });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: Get all orders (newest first)
router.get('/', authenticateAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all() as Record<string, unknown>[];
    const orders = rows.map((row) => ({
      ...row,
      items: JSON.parse((row.items_json as string) || '[]'),
    }));
    res.json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: Update order status
router.patch('/:id/status', authenticateAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { status } = req.body;
  if (!['pending', 'delivered', 'rejected'].includes(status)) {
    res.status(400).json({ error: 'Invalid status' });
    return;
  }
  try {
    const db = getDb();
    const result = db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
    if ((result as { changes: number }).changes === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json({ success: true, status });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: Get unique users (deduplicated by mobile — latest name per mobile)
router.get('/users', authenticateAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const db = getDb();
    const rows = db.prepare(`
      SELECT customer_name AS name, customer_mobile AS mobile
      FROM orders
      GROUP BY customer_mobile
      ORDER BY MAX(created_at) DESC
    `).all();
    res.json(rows);
  } catch (err) {
    console.error('Get order users error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
