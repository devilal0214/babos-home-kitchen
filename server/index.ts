import express from 'express';
import cors from 'cors';
import path from 'path';
import { initDb } from './db.js';
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
  origin: (origin, cb) => {
    // Allow same-origin (no origin header) and listed origins
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error(`CORS: origin ${origin} not allowed`));
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
    app.listen(PORT, () => {
      console.log(`Babo's Kitchen API running on http://localhost:${PORT} [${IS_PROD ? 'production' : 'development'}]`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
