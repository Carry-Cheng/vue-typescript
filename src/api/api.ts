
interface ApiObject {
  [propName: string]: string
}
export const API: ApiObject = {
  'root': '/',
  'findRecommendList': '/find/recommendList',
  // 歌手管理
  'createSinger': '/v1/manager/singer/createSinger',
  'getSinger': '/v1/manager/singer/getSinger',
  'searchSinger': '/v1/manager/singer/searchSinger',
  // 专辑管理
  'createAlbum': '/v1/manager/album/createAlbum',
  'getAlbum': '/v1/manager/album/getAlbum',
  'searchAlbum': '/v1/manager/album/searchAlbum',
  // 音乐管理
  'createMusicInfo': '/v1/manager/music/createMusicInfo',
  'getMusicInfo': '/v1/manager/music/getMusicInfo'
}
