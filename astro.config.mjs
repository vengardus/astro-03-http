// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';


import cloudflare from '@astrojs/cloudflare';


import db from '@astrojs/db';


import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db(), 
    react({
      include: ['**/react/**/*'],
    })
  ],
  output: 'hybrid',
  adapter: cloudflare(),
});