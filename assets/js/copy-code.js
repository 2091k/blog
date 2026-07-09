document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre.highlight');

  codeBlocks.forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerText = 'Copy';
    btn.title = '复制代码';
    block.appendChild(btn);

    btn.addEventListener('click', async () => {
      const codeEl = block.querySelector('code');
      // 克隆一份代码节点，移除所有行号元素再取文本
      const clone = codeEl.cloneNode(true);
      const lineNumbers = clone.querySelectorAll('.lineno');
      lineNumbers.forEach(el => el.remove());
      const codeText = clone.innerText;

      try {
        await navigator.clipboard.writeText(codeText);
        btn.innerText = 'Copied!';
        btn.classList.add('copied');
      } catch (err) {
        // 兼容低版本浏览器
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
