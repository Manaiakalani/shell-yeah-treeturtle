// prdTemplate.js — Convenience wrapper for template context

/**
 * Build the template context object used by prdGenerator
 */
export function buildTemplateContext({ regionLabel, trees, turtleFacts }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    appName: 'TreeTurtle — Local Nature Explorer',
    date: dateStr,
    regionLabel,
    trees,
    turtleFacts,
  };
}
