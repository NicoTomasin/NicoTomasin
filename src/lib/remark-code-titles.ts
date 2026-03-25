import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';

export function remarkCodeTitles() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index: number | undefined, parent: any) => {
      if (index === undefined || !parent) return;
      
      const meta = node.meta || '';
      const titleMatch = meta.match(/title="([^"]+)"/);
      
      if (titleMatch) {
        const title = titleMatch[1];
        const lang = node.lang || '';
        
        const escapedCode = node.value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        const cleanMeta = meta.replace(/title="[^"]+"/, '').trim();

        const html = `<div class="code-block-with-title">
<div class="code-block-header">
  <span class="code-block-title">${title}</span>
  <span class="code-block-lang">${lang}</span>
</div>
<pre class="language-${lang}"><code class="language-${lang}">${escapedCode}</code></pre>
</div>`;

        parent.children[index] = {
          type: 'html',
          value: html,
        };
      }
    });
  };
}
