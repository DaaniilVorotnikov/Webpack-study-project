async function start(){
   return await Promise.resolve('async is working')
}

start().then(console.log)

const unused = 42

class Util {
   static id = Date.now()
}

import('lodash').then( _ => {
   console.log('Lodash', _.sortedLastIndexBy(0, 42, 3))
})

console.log('Util id:', Util.id)