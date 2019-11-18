<template>
  <div class="app-header">
    <div class="app-header-box">
      <div class="app-logo">
        <a href="/find">
          <img :src="Logo" alt="Logo">
        </a>
      </div>
      <ul class="app-ul">
        <li class="app-li" :class="activeIndex === 1 ? 'app-li-active' : ''">
          <a href="/find">发现音乐</a>
        </li>
        <li class="app-li" :class="activeIndex === 2 ? 'app-li-active' : ''">
          <a href="#">我的音乐</a>
        </li>
        <li class="app-li" :class="activeIndex === 3 ? 'app-li-active' : ''">
          <a href="#">朋友</a>
        </li>
      </ul>
      <div class="app-algin-right">
        <div class="app-login">登录</div>
      </div>
      <div class="app-absolute-right">
        <i class="el-icon-search">

        </i>
      </div>
    </div>
    <!-- level 2 -->
    <div class="app-level2">
      <div class="app-level2-box">
        <ul class="app-level2-ul">
          <li class="app-level2-li" :class="activeLevel2Index === 11 ? 'app-level2-li-active' : ''">
            <a href="/find">推荐</a>
          </li>
          <li class="app-level2-li" :class="activeLevel2Index === 12 ? 'app-level2-li-active' : ''">
            <a href="#">排行榜</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/cheng-logo.png'
export default {
  name: 'AppTop',
  data() {
    return {
      Logo: Logo,
      activeIndex: 1,
      activeLevel2Index: 11
    }
  }
}
</script>

<style lang="less" scoped>
.app-header {
  width: 100%;
  position: fixed; left: 0; top: 0; background: #ffffff; box-shadow: 8px -7px 9px 1px;
  .app-header-box {
    margin: 0 10%; position: relative;
    .app-logo { 
      width: 170px; padding: 2px 0; height: 46px; cursor: pointer; display: inline-block; vertical-align: middle;
      img { width: 170px; height: 46px; }
    }
    .app-ul {
      margin: 0; padding: 0; display: inline-block;
      .app-li { 
        margin: 0; padding: 0; line-height: 50px; display: inline-block; vertical-align: middle; text-align: center;
        a { text-decoration: none; padding: 0 20px; color: #333333; font-size: 18px; font-weight: 400; }
      }
      .app-li:hover {
        background: #ffffff;
        a { color: #f15555; }
      }
      .app-li-active, .app-li-active:hover {
        background: #f15555;
        a { color: #ffffff; }
      }
    }
    .app-algin-right {
      float: right; line-height: 50px; cursor: pointer;
      .app-login {
        color: #333333; font-size: 18px; font-weight: 400;
      }
      .app-login:hover {
        color: #f15555; font-size: 18px; font-weight: 400;
      }
    }
    .app-absolute-right {
      position: absolute; width: auto; height: 50px; top: 0; right: 50px; line-height: 50px; cursor: pointer;
      i { font-size: 22px; color: #f15555; vertical-align: middle;}
    }
  }
  .app-level2 {
    width: 100%; height: 30px;
    border-top: 5px solid #f15555;
    .app-level2-box {
      margin: 0 calc(10% + 170px);
      .app-level2-ul {
        margin: 0; padding: 0;
        .app-level2-li {
          width: 112px; text-align: center; line-height: 30px;list-style: none; display: inline-block;
          a { text-decoration: none; color: #333333; font-size: 18px; font-weight: 400; }
        }
        .app-level2-li-active {
          a { color: #f15555; }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .app-header-box {
    margin: 0 0!important;
  }
}
</style>
