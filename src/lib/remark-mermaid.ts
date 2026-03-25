import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';

export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index: number | undefined, parent: any) => {
      if (index === undefined || !parent) return;
      
      if (node.lang === 'mermaid') {
        const escapedCode = node.value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

        const html = `<div class="mermaid-wrapper">
<pre class="mermaid">${escapedCode}</pre>
</div>`;

        parent.children[index] = {
          type: 'html',
          value: html,
        };
      }
    });
  };
}
