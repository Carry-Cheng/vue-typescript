
import ProxyHandler from '@/core/proxy'
import { WatchConfig, WatchProxyMap } from '@/td/types'

// Watch decorator
export function Watch (propertyName: string, config: WatchConfig = {
  immediate: false
}) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    if (!ProxyHandler.proxy.has(propertyName)) {
      let watchProxyMap: WatchProxyMap = {
        handler: methodName,
        config
      }
      ProxyHandler.proxy.set(propertyName, watchProxyMap)
      ProxyHandler.proxyFirst.set(propertyName, false)
    }
  }
}
