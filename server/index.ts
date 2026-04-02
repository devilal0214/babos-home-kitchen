import express from 'express';
import cors from 'cors';
import path from 'path';
import { initDb } from './db.js';
import authRouter from './routes/auth.js';
import menusRouter from './routes/menus.js';
import galleryRouter from './routes/gallery.js';
import ordersRouter from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json({ limit: '5mb' }));

// Serve uploaded gallery images as static files
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

app.use('/api/auth', authRouter);
app.use('/api/menus', menusRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/orders', ordersRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Babo's Kitchen API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
