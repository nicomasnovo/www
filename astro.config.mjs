// @ts-check
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import cloudflare from '@astrojs/cloudflare'
import compressor from 'astro-compressor'
import vue from '@astrojs/vue'

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    vue(),
    tailwind(),
    compressor(),
    (await import('astro-compress')).default(),
    icon()
  ],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
})