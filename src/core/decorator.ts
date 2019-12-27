
import ProxyHandler from '@/core/proxy'
import { WatchConfig } from '@/td/types'

// Watch decorator
export function Watch (propertyName: string, config: WatchConfig = {
  immediate: false
}) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    if (!ProxyHandler.proxy.has(propertyName)) {
      ProxyHandler.proxy.set(propertyName, {
        name: methodName,
        handler: target[methodName],
        config
      })
    }
  }
}
