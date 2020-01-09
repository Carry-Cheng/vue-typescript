
import ElementUI from 'element-ui'

export enum ExceptionCode {
  SYSTEM_ERROR = '系统错误',
  UNDEFINED = 'undefined',
  NULL = 'null'
}

export class Exception {

  static code(code: string, prop?: string) {
    if (prop) {
      ElementUI.Message.info(`${prop} is ${code}`)
    } else {
      ElementUI.Message.info(code)
    }
  }

  static message(message: string) {
    ElementUI.Message.info(message)
  }

}