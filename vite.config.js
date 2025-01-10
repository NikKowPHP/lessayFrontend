import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/lib': path.resolve(__dirname, './src/lib'),
            '@/services': path.resolve(__dirname, './src/lib/services'),
            '@/providers': path.resolve(__dirname, './src/lib/providers'),
            '@/store': path.resolve(__dirname, './src/store'),
            '@/types': path.resolve(__dirname, './src/lib/types'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/constants': path.resolve(__dirname, './src/lib/constants'),
            '@/models': path.resolve(__dirname, './src/lib/models'),
            '@/hooks': path.resolve(__dirname, './src/hooks'),
            '@/pages': path.resolve(__dirname, './src/pages'),
        },
    },
});
