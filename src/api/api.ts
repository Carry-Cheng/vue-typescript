
interface ApiObject {
  [propName: string]: string
}
export const API: ApiObject = {
  'root': '/',
  'findRecommendList': '/find/recommendList',
  'createSinger': '/v1/manager/singer/createSinger',
  'getSinger': '/v1/manager/singer/getSinger'
}
