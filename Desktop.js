(function() {
  window.onload = (e) => {
    document.getElementById('body')
      .setAttribute('style', `width: ${screen.width}px; height: ${screen.height}px;`);

    initPage();
  };

  function initPage() {
    const folders = document.getElementsByClassName('folder');

    const menu = document.getElementById('menu');
    const menuItems = document.getElementsByTagName('li');

    let currentFolder = null;
    for (let node of folders) {
      node.addEventListener('contextmenu', e => {
        e.preventDefault();

        // don't show when editing
        if (node.lastChild.nodeName === 'INPUT') {
          return;
        }

        currentFolder = node;

        menu.style.display = 'block';
        menu.style.top = `${e.pageY}px`;
        menu.style.left = `${e.pageX}px`;
      });
    }

    for (const li of menuItems) {
      li.addEventListener('click', e => {
        menu.style.display = 'none';

        const lastChild = currentFolder.lastElementChild;
        if (lastChild.nodeName === 'INPUT') {
          return;
        }

        lastChild.style.display = 'none';

        let input = document.createElement('INPUT');
        input.setAttribute('value', lastChild.innerText);
        input.addEventListener('keydown', e => {
          if (e && e.keyCode === 13) {
            lastChild.innerText = input.value;
            lastChild.style.display = 'inline';
            currentFolder.removeChild(input);
          }
        });
        currentFolder.appendChild(input);
      });
    }
  }
})();
