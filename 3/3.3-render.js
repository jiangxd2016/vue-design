const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert("click")
  },
  children: [{
    tag: function () {
      return {
        tag: "h1",
        props: {
          onClick: () => alert("h1 click")
        },
        children: "hello h1"
      }
    }
  },
    , "hello div"
  ]
}

function renderer(vNode, container) {
  if (typeof vNode === 'string') {
    container.appendChild(document.createTextNode(vNode));
  }
  else if (typeof vNode.tag === 'function') {
    renderMyComponent(vNode, container)
  } else if (typeof vNode.tag === 'string') {
    mountElement(vNode, container);
  }
}

function mountElement(vNode, container) {
  const el = document.createElement(vNode.tag);

  for (const key in vNode.props) {
    if (/^on/.test(key)) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, vNode.props[key]);
    }
  }
  console.log(vNode);

  if (Array.isArray(vNode.children)) {
    vNode.children.forEach(child => renderer(child, el));
  } else if (typeof vNode.tag === 'string') {
    el.appendChild(document.createTextNode(vNode.children));
  }

  container.appendChild(el);
}

function renderMyComponent(vNode, container) {
  const subTree = vNode.tag()
  renderer(subTree, container)
}

renderer(vnode, document.body);
