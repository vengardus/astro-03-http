// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';


import cloudflare from '@astrojs/cloudflare';


import db from '@astrojs/db';


import react from '@astrojs/react';


import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db(), react({
    include: ['**/react/**/*'],
  }), tailwind()],
  output: 'hybrid',
  adapter: cloudflare(),
});