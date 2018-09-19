
let local={  
  fetch (key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  },
  save (key,value) {    // watch所监听的函数名称
    window.localStorage.setItem(key, JSON.stringify(value));
  },
}

export default {
   install(Vue, options) {
        Vue.prototype.$local = local
    },
}