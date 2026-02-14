// copyButton.js — Clipboard copy utilities with toast feedback

/**
 * Copy text to clipboard and show a toast
 */
export async function copyToClipboard(text, toastEl) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(toastEl);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(toastEl);
      return true;
    } catch (e) {
      console.error('Copy failed:', e);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function showToast(el) {
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}
