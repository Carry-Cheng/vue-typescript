import { WatchProxyMap } from '@/td/types'

export default class ProxyHandler {
  static readonly proxy: Map<string, WatchProxyMap> = new Map<string, WatchProxyMap>()
  static createProxy(target: any = Object.create(null)) {
    return new Proxy(target, {
      get(target: any, propName: string) {
        return target[propName]
      },
      set(target: any, propName: string, value: any) {
        const old = target[propName]
        target[propName] = value
        if (ProxyHandler.proxy.has(propName)) {
          const watchProxyMap: WatchProxyMap | undefined = ProxyHandler.proxy.get(propName)
          if (!watchProxyMap) return true
          if (old !== value) {
            // Reflect.apply(watchProxyMap.handler, undefined, [value, old])
            // bind this on target.
            Reflect.apply(watchProxyMap.handler, target, [value, old])
          }
        }
        return true
      }
    })
  }
}