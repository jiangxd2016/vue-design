const customerProxy = function (target) {
  return new Proxy(target, {
    get(target, key) {
      console.log(`getting ${key}`);
      
      bucket.add(effect)
      return target[key]
    },
    set(target, key, value) {
      console.log(`setting ${key}`);
      target[key] = value
      bucket.forEach(fn=>fn())
      return true
    }
  })
} 
const bucket = new Set();
const obj = customerProxy({a:1,b:2});
function effect(){
  document.body.innerText = obj.a;
}

effect()

setTimeout(() => {
  obj.a = 3
  setTimeout(() => {
    console.log(obj.a)
  },2000)
}
, 3000)
