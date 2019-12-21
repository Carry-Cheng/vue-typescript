import Player from '@/core/player'

interface WatchConfig {
  immediate: boolean
}
// Watch decorator
export function Watch (propertyName: string, config: WatchConfig = {
  immediate: false
}) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    if (config.immediate) {
      target[methodName](target[propertyName], target[propertyName])
    }
    let player = Player.getInstance()
    if (propertyName in player) {
      console.info('------------')
      new Proxy(player, {
        get: function (object, key: keyof typeof player): any {
          return object[key]
        },
        set: function (object: any, key: keyof typeof player, value): boolean {
          console.info(key, value)
          object[key] = value
          target[methodName](value, target[propertyName])
          return true
        }
      })
    }
  }
}
