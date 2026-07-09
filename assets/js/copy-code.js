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
      // 克隆节点，不改动页面真实DOM
      const clone = codeEl.cloneNode(true);
      // 删除所有行号标签
      clone.querySelectorAll('.lineno').forEach(item => item.remove());
      // 获取文本并清理多余换行、首尾空白
      let codeText = clone.innerText;
      // 清除连续空行、首尾空白
      codeText = codeText.replace(/^\s+|\s+$/g, '');
      codeText = codeText.replace(/\n\s*\n+/g, '\n');

      try {
        await navigator.clipboard.writeText(codeText);
        btn.innerText = 'Copied!';
        btn.classList.add('copied');
      } catch (err) {
        // 兼容老旧浏览器
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
