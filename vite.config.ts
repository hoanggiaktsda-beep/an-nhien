import { defineConfig } from 'vite';
export default defineConfig({ server: { allowedHosts: ['terminal.local'] }, base: process.env.GITHUB_PAGES === 'true' ? '/an-nhien/' : '/' });
