document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre.highlight');

  codeBlocks.forEach(block => {
    // 创建复制按钮
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerText = 'Copy';
    btn.title = '复制代码';
    block.appendChild(btn);

    btn.addEventListener('click', async () => {
      let codeText = '';
      const codeWrap = block.querySelector('code');
      // 判断是否是 Rouge 表格行号布局
      const table = codeWrap.querySelector('.rouge-table');
      if (table) {
        // 存在表格：只取右侧 rouge-code 单元格内容
        const codeTd = table.querySelector('.rouge-code');
        codeText = codeTd.innerText;
      } else {
        // 无表格（无行号模式）直接取全部代码
        const clone = codeWrap.cloneNode(true);
        clone.querySelectorAll('.lineno').forEach(el => el.remove());
        codeText = clone.innerText;
      }

      // 清理多余空行、首尾空白
      codeText = codeText.replace(/^\s+|\s+$/g, '');
      codeText = codeText.replace(/\n\s*\n+/g, '\n');

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
