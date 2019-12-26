import { WatchProxyMap } from '@/td/types'

export default class ProxyHandler {
  static readonly proxy = new Map<string, WatchProxyMap>()
  static readonly proxyFirst = new Map<string, boolean>()
  static createProxy(target: any = Object.create(null)) {
    const handler = {
      get(target: any, propName: string) {
        return target[propName]
      },
      set(target: any, propName: string, value: any) {
        const old = target[propName]
        target[propName] = value
        if (ProxyHandler.proxy.has(propName)) {
          const watchProxyMap: WatchProxyMap | undefined = ProxyHandler.proxy.get(propName)
          if (!watchProxyMap) return true
          if (watchProxyMap.config.immediate) {
            target[watchProxyMap.handler](value, old)
          } else {
            if (ProxyHandler.proxyFirst.get(propName) && old !== value) {
              target[watchProxyMap.handler](value, old)
            }
            ProxyHandler.proxyFirst.set(propName, true)
          }
        }
        return true
      }
    }
    return new Proxy(target, handler)
  }
}