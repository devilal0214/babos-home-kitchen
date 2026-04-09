import express from 'express';
import cors from 'cors';
import path from 'path';
import puppeteer from 'puppeteer';
import { initDb, closeDb } from './db.js';
import authRouter from './routes/auth.js';
import menusRouter from './routes/menus.js';
import galleryRouter from './routes/gallery.js';
import ordersRouter from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 3003;
const IS_PROD = process.env.NODE_ENV === 'production';

// In production: serve static assets BEFORE CORS middleware so browser module
// requests (which include an Origin header) are not blocked by CORS checks.
if (IS_PROD) {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));
}

// Allow dev origins + production domain
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://jobs.jaiveeru.site',
  'https://babos.jaiveeru.site',
];
app.use(cors({
  // In production everything comes from the same domain via LiteSpeed proxy —
  // echoing the Origin header back is safe (auth is protected by JWT).
  // In dev, restrict to known local origins.
  origin: IS_PROD
    ? true
    : (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) cb(null, true);
        else cb(null, false);
      },
  credentials: true,
}));

app.use(express.json({ limit: '5mb' }));

// Serve uploaded gallery images as static files (dev mode; prod handled above)
if (!IS_PROD) {
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));
}

app.use('/api/auth', authRouter);
app.use('/api/menus', menusRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/orders', ordersRouter);

// PDF Generation endpoint
app.post('/api/generate-pdf', async (req, res) => {
  const { html } = req.body;
  if (!html) {
    res.status(400).json({ error: 'HTML content required' });
    return;
  }
  
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    res.send(Buffer.from(pdf));
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  } finally {
    if (browser) await browser.close();
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// In production: SPA fallback (static files already registered above)
if (IS_PROD) {
  const distPath = path.join(process.cwd(), 'dist');
  app.use((_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

initDb()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Babo's Kitchen API running on http://localhost:${PORT} [${IS_PROD ? 'production' : 'development'}]`);
    });

    const shutdown = () => {
      closeDb();
      server.close(() => process.exit(0));
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
