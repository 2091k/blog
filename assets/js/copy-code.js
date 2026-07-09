document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre.highlight');
  codeBlocks.forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerText = 'Copy';
    btn.title = '复制代码';
    block.appendChild(btn);
    btn.addEventListener('click', async () => {
      const codeText = block.querySelector('code').innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        btn.innerText = 'Copied!';
        btn.classList.add('copied');
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = codeText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.innerText = 'Copied!';
        btn.classList.add('copied');
      }
      setTimeout(() => {
        btn.innerText = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});
