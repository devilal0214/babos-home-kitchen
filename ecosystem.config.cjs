// PM2 ecosystem config — used on the production server
// Run: pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'babos-kitchen',
      script: 'dist-server/index.js',
      cwd: '/home/babos.jaiveeru.site/app',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};
