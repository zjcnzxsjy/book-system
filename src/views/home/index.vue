<template>
  <div>
    <app-header></app-header>
    <mt-loadmore :top-method="loadTop" :bottomAllLoaded="allLoaded" :max-distance="150" @top-status-change="handleTopChange" ref="loadmore" class='main-content'>

      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
        <span v-show="topStatus === 'drop'">释放更新</span>
      </div>

      <mt-swipe class='swip'>
        <mt-swipe-item v-for='(img, index) in swipImgs' :key='index'>
          <img :src='img.url' class='swip-img' />
        </mt-swipe-item>
      </mt-swipe>

      <new-book></new-book>
      <all-book></all-book>
    </mt-loadmore>
    <app-footer></app-footer>
  </div>

</template>
<script>
import appHeader from "@/views/layout/appHeader";
import appFooter from "@/views/layout/appFooter";
import newBook from "./newBook";
import allBook from "./allBook";
export default {
  name: "navHeader",
  data() {
    return {
      allLoaded: false,
      topStatus: "",
      swipImgs: [
        {
          url: "/static/imgs/timg.jpg"
        },
        {
          url: "/static/imgs/timg1.jpg"
        },
        {
          url: "/static/imgs/timg2.jpg"
        }
      ]
    };
  },
  components: {
    appHeader,
    appFooter,
    newBook,
    allBook
  },
  methods: {
    loadTop: function() {
      // 刷新数据的操作
      var self = this;
      setTimeout(function() {
        self.list.splice(0, self.list.length);
        var i = 0,
          len = 20;
        for (; i < len; i++) {
          self.list.push("demo" + i);
        }
        self.$refs.loadmore.onTopLoaded();
      }, 2000);
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    }
  }
};
</script>
<style lang="scss" scoped>
.is-right span {
  margin-left: 0.1333rem;
}
.main-content {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 26px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .swip {
    height: 200px;
    .swip-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>


