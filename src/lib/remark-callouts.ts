import { visit } from 'unist-util-visit';
import type { Root, Blockquote, Paragraph } from 'mdast';

const CALLOUT_TYPES = ['tip', 'warning', 'note', 'quote', 'info', 'danger', 'success', 'failure', 'bug', 'example', 'question'] as const;
type CalloutType = typeof CALLOUT_TYPES[number];

function parseCallout(text: string): { isCallout: boolean; type?: CalloutType; customTitle?: string; remainingContent?: string } {
  const match = text.match(/^\[!(tip|warning|note|quote|info|danger|success|failure|bug|example|question)\]\s*/i);
  if (!match) {
    return { isCallout: false };
  }

  const calloutType = match[1].toLowerCase() as CalloutType;
  const afterType = text.slice(match[0].length);

  if (!afterType) {
    return {
      isCallout: true,
      type: calloutType,
      customTitle: undefined,
      remainingContent: undefined,
    };
  }

  const firstLineBreak = afterType.search(/[\n\r]/);
  const firstPart = firstLineBreak >= 0 ? afterType.slice(0, firstLineBreak) : afterType;
  const restContent = firstLineBreak >= 0 ? afterType.slice(firstLineBreak + 1) : undefined;

  if (firstPart.length <= 30) {
    return {
      isCallout: true,
      type: calloutType,
      customTitle: firstPart.trim() || undefined,
      remainingContent: restContent,
    };
  }

  return {
    isCallout: true,
    type: calloutType,
    customTitle: undefined,
    remainingContent: afterType,
  };
}

export function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, 'blockquote', (node: Blockquote, index: number | undefined, parent: any) => {
      if (index === undefined || !parent) return;

      const firstParagraph = node.children[0];
      if (!firstParagraph || firstParagraph.type !== 'paragraph') return;

      const firstTextNode = firstParagraph.children[0];
      if (!firstTextNode || firstTextNode.type !== 'text') return;

      const result = parseCallout(firstTextNode.value);
      if (!result.isCallout || !result.type) return;

      const calloutType = result.type;
      const defaultTitle = calloutType.charAt(0).toUpperCase() + calloutType.slice(1);

      const contentNodes: any[] = [];

      if (result.remainingContent) {
        const newFirstParagraph: Paragraph = {
          type: 'paragraph',
          children: [
            { type: 'text', value: result.remainingContent },
            ...firstParagraph.children.slice(1),
          ],
        };
        contentNodes.push(newFirstParagraph);
      } else if (firstParagraph.children.length > 1) {
        const newFirstParagraph: Paragraph = {
          type: 'paragraph',
          children: firstParagraph.children.slice(1),
        };
        contentNodes.push(newFirstParagraph);
      }

      for (let i = 1; i < node.children.length; i++) {
        contentNodes.push(node.children[i]);
      }

      const icons: Record<string, string> = {
        tip: '💡',
        warning: '⚠️',
        note: '📝',
        quote: '💬',
        info: 'ℹ️',
        danger: '🚨',
        success: '✅',
        failure: '❌',
        bug: '🐛',
        example: '📋',
        question: '❓',
      };

      const html = `<div class="callout callout-${calloutType}">
  <div class="callout-title">
    <span class="callout-icon">${icons[calloutType] || '📝'}</span>
    <span class="callout-label">${result.customTitle || defaultTitle}</span>
  </div>
  <div class="callout-content">`;

      const closingHtml = `  </div>
</div>`;

      const calloutNodes: any[] = [
        { type: 'html', value: html },
        ...contentNodes,
        { type: 'html', value: closingHtml },
      ];

      parent.children.splice(index, 1, ...calloutNodes);
    });
  };
}
