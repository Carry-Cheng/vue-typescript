import { WatchProxyMap } from '@/td/types'

export default class ProxyHandler {
  static readonly proxy: Map<string, WatchProxyMap> = new Map<string, WatchProxyMap>()
  static createProxy(target: any = Object.create(null)) {
    const PROXY_TARGET = new Proxy(target, {
      get(target: any, propName: string) {
        return target[propName]
      },
      set(target: any, propName: string, value: any) {
        console.info('set')
        const old = target[propName]
        target[propName] = value
        if (ProxyHandler.proxy.has(propName)) {
          const watchProxyMap: WatchProxyMap | undefined = ProxyHandler.proxy.get(propName)
          if (!watchProxyMap) return true
          if (old !== value) {
            console.info(target)
            console.info(PROXY_TARGET)
            console.info(`now is ${value}, old is ${old}`)
            console.info(PROXY_TARGET[watchProxyMap.name])
            console.info(typeof PROXY_TARGET[watchProxyMap.name])
            console.info(typeof watchProxyMap.handler)
            console.info(watchProxyMap.name in target)
            console.info(watchProxyMap.name in PROXY_TARGET)
            // PROXY_TARGET[watchProxyMap.name](value)
            // target[watchProxyMap.name](value)
            // watchProxyMap.handler(value)
            // watchProxyMap.handler.apply(target, [value])
            // Reflect.apply(PROXY_TARGET[watchProxyMap.name], target, [value, old])
            // Reflect.apply(PROXY_TARGET[watchProxyMap.name], undefined, [value, old])
            // Reflect.apply(PROXY_TARGET[watchProxyMap.name], PROXY_TARGET, [value, old])
            // Reflect.apply(watchProxyMap.handler, target, [value, old])
            // Reflect.apply(watchProxyMap.handler, undefined, [value, old])
            // Reflect.apply(watchProxyMap.handler, PROXY_TARGET, [value, old])
          }
        }
        return true
      }
    })
    return PROXY_TARGET
  }
}