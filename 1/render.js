const obj = {
  tag:"div",
  children:[
    {
      tag:"h1",
      children:[
        "Hello",
        {
          tag:"p",
          children:"World"
        }
      ]
    },
  ]
}


function render(obj,root){
  const el = document.createElement(obj.tag);
  if(typeof obj.children === "string"){
    el.innerText = obj.children;
  }else if(Array.isArray(obj.children)){
    obj.children.forEach(child=>{
      if(typeof child === "string"){
        el.innerText += child;
      }
      else{
        render(child,el);
      }
    });
  }
  root.appendChild(el)
}


render(obj,document.body);
