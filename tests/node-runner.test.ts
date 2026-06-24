import { describe, it, expect } from 'vitest';
import { buildJsSrcdoc, buildNodeProject } from '../src/components/node-runner';

describe('buildJsSrcdoc', () => {
  it('embeds the user code and an output sink', () => {
    const doc = buildJsSrcdoc("console.log('hi')");
    expect(doc).toContain("console.log('hi')");
    expect(doc).toContain('__out');
    expect(doc).toContain('console.log');
  });
  it('neutralizes a nested </script> in user code', () => {
    expect(buildJsSrcdoc("var s='</script>'")).not.toContain("'</script>'");
  });
});

describe('buildNodeProject', () => {
  it('wraps the lesson code in a runnable Hono server with a node template', () => {
    const p = buildNodeProject("app.get('/ping', (c) => c.text('pong'))");
    expect(p.files['src/index.ts']).toContain("app.get('/ping', (c) => c.text('pong'))");
    expect(p.files['src/index.ts']).toContain("import { Hono } from 'hono'");
    expect(p.template).toBe('node');
    expect(p.files['package.json']).toContain('hono');
  });
});
