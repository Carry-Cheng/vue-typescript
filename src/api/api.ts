
interface ApiObject {
  [propName: string]: string
}
export const API: ApiObject = {
  'root': '/',
  'findRecommendList': '/find/recommendList',
  // 歌手管理
  'createSinger': '/v1/manager/singer/createSinger',
  'getSinger': '/v1/manager/singer/getSinger',
  // 专辑管理
  'createAlbum': '/v1/manager/album/createAlbum',
  'getAlbum': '/v1/manager/album/getAlbum'
}
