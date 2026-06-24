// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/rest-api-design-from-zero-to-hero',
  output: 'static',
  integrations: [starlight({
      title: 'REST API Design — From Zero to Hero',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/rest-api-design-from-zero-to-hero/enhance.js' } },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/rest-api-design-from-zero-to-hero' }],
      sidebar: [
        { label: 'HTTP & REST Foundations', items: [{ autogenerate: { directory: 'http-and-rest' } }] },
        { label: 'Resource & URI Design', items: [{ autogenerate: { directory: 'resource-and-uri-design' } }] },
        { label: 'Methods, CRUD & Idempotency', items: [{ autogenerate: { directory: 'methods-crud-idempotency' } }] },
        { label: 'Status Codes & Errors', items: [{ autogenerate: { directory: 'status-and-errors' } }] },
        { label: 'Querying Collections', items: [{ autogenerate: { directory: 'collections-querying' } }] },
        { label: 'Versioning & Caching', items: [{ autogenerate: { directory: 'versioning-caching' } }] },
        { label: 'Security', items: [{ autogenerate: { directory: 'security' } }] },
        { label: 'Docs, Testing & Building', items: [{ autogenerate: { directory: 'docs-testing-building' } }] },
      ],
      }), preact()],
});