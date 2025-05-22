// src/shims.d.ts

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  
  declare module 'vuex' {
    import Vuex from 'vuex'
    export * from 'vuex'
    export default Vuex
  }
  