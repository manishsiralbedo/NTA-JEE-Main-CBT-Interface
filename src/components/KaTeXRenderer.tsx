import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXRendererProps {
  content: string;
  className?: string;
  displayMode?: boolean;
}

/**
 * Parses mixed text and LaTeX equations:
 * - $...$ for inline equations
 * - $$...$$ for block equations
 * - \begin{...}...\end{...} or raw latex
 */
export const KaTeXRenderer: React.FC<KaTeXRendererProps> = ({
  content,
  className = '',
  displayMode = false,
}) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    // If whole string is purely math without delimiters or user forced displayMode
    if (displayMode && !content.includes('$')) {
      try {
        return katex.renderToString(content, {
          displayMode: true,
          throwOnError: false,
        });
      } catch {
        return content;
      }
    }

    // Split text by $$ (display math) first, then by $ (inline math)
    const displayParts = content.split(/(\$\$[\s\S]*?\$\$)/g);

    return displayParts
      .map((part) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2).trim();
          try {
            return `<div class="my-2 flex justify-center overflow-x-auto py-1">${katex.renderToString(
              math,
              { displayMode: true, throwOnError: false }
            )}</div>`;
          } catch {
            return `<code>${math}</code>`;
          }
        }

        // Inline math split
        const inlineParts = part.split(/(\$[^$\n]+?\$)/g);
        return inlineParts
          .map((subPart) => {
            if (subPart.startsWith('$') && subPart.endsWith('$') && subPart.length > 2) {
              const math = subPart.slice(1, -1);
              try {
                return katex.renderToString(math, {
                  displayMode: false,
                  throwOnError: false,
                });
              } catch {
                return `<code>${math}</code>`;
              }
            }
            // Replace line breaks with <br/> and escape basic HTML
            return subPart
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/\n/g, '<br/>');
          })
          .join('');
      })
      .join('');
  }, [content, displayMode]);

  return (
    <div
      className={`latex-content leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
