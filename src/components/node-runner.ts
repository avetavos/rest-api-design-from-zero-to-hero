export type StackBlitzProject = {
  title: string;
  description: string;
  template: 'node';
  files: Record<string, string>;
};

// Convention: lesson `code` defines routes on a pre-declared Hono `app`
// (e.g. `app.get('/users', (c) => c.json([...]))`). The builder wraps it in a
// runnable @hono/node-server entry so "Open in StackBlitz" boots a real API.

export function buildJsSrcdoc(code: string): string {
  const safe = code.replace(/<\/script/gi, '<\\/script');
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>body{font-family:ui-monospace,SFMono-Regular,monospace;font-size:.85rem;margin:.6rem;white-space:pre-wrap;color:#111;background:#fff}</style></head>' +
    '<body><pre id="__out"></pre><script>(async function(){' +
    'var o=document.getElementById("__out");' +
    'function f(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}' +
    'function w(){o.textContent+=Array.prototype.map.call(arguments,f).join(" ")+"\\n";}' +
    'console.log=w;console.info=w;console.warn=w;console.error=w;console.debug=w;' +
    'window.onerror=function(m){w("Error: "+m);return true;};' +
    'try{\n' + safe + '\n}catch(e){w("Error: "+((e&&e.message)||e));}' +
    '})();</script></body></html>'
  );
}

export function buildNodeProject(code: string): StackBlitzProject {
  const indexTs =
    "import { Hono } from 'hono';\n" +
    "import { serve } from '@hono/node-server';\n\n" +
    'const app = new Hono();\n\n' +
    '// --- lesson code: defines routes on `app` ---\n' +
    code + '\n' +
    '// --- end lesson code ---\n\n' +
    'serve({ fetch: app.fetch, port: 3000 }, (info) => {\n' +
    '  console.log(`API listening on http://localhost:${info.port}`);\n' +
    '});\n\n' +
    'export default app;\n';
  return {
    title: 'REST API example (Hono)',
    description: 'REST API Design — runnable Hono API',
    template: 'node',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'rest-api-example',
          type: 'module',
          scripts: { start: 'tsx watch src/index.ts' },
          dependencies: { hono: '^4.6.0', '@hono/node-server': '^1.13.0' },
          devDependencies: { tsx: '^4.19.0', typescript: '^5.6.0' },
        },
        null, 2,
      ),
      'src/index.ts': indexTs,
      'README.md':
        '# REST API example (Hono)\n\n' +
        'Run `npm install` then `npm start`. The lesson code defines routes on the `app` Hono instance in `src/index.ts`.\n',
    },
  };
}
