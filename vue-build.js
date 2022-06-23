async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))
    ret.push(p)
    if (maxConcurrency <= source.length) {
      const e = p.then(() => {
        console.log('executing.splice', item)
        executing.splice(executing.indexOf(e), 1)
        
      })
      executing.push(e)
      console.log('222')
      if (executing.length >= maxConcurrency) {
        console.log('333', e)
        await Promise.race(executing)
        console.log('444')
      }
    }
  }
  return Promise.all(ret)
}
// 模拟实现代码
const source = [2000, 1000, 3000, 6500]
async function build(target) {
  console.log('target', target)
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('build', target)
      resolve('success')
    }, target);
  })
}
// runParallel(2, source, build)
(async()=>{
  const p = Promise.resolve().then(() => console.log('p1'))

await p
  
})()
