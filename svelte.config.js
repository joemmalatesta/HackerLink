import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  vitePlugin: {
    inspector: true
  },
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess()
};
export default config;