const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert("click")
  },
  children: "Hello World"
}


function render(vNode, container) {
  const el = document.createElement(vNode.tag);

  for (const key in vNode.props) {
    if (/^on/.test(key)) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, vNode.props[key]);
    }
  }
  if (Array.isArray(vNode.children)) {
    vNode.children.forEach(child => render(child,el));
  } else {
    el.appendChild(document.createTextNode(vNode.children));
  }
  container.appendChild(el);
}

render(vnode, document.body);
