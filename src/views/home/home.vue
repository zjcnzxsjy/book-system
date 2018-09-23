<template>
  <div>
    <app-header></app-header>
    <mt-loadmore :top-method="loadTop" :bottomAllLoaded="allLoaded" :max-distance="150" @top-status-change="handleTopChange" ref="loadmore" class='main-content'>

      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
        <span v-show="topStatus === 'drop'">释放更新</span>
      </div>

      <!-- <mt-swipe class='swip'>
        <mt-swipe-item v-for='(img, index) in swipImgs' :key='index'>
          <img :src='img.url' class='swip-img' />
        </mt-swipe-item>
      </mt-swipe> -->
      <swiper :options="swiperOption" class='swip'>
        <swiper-slide v-for='(img, index) in swipImgs' :key='index'>
          <img :src='img.url' class='swip-img' />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <new-book ref='newBooks' 
      :data='newBooks'
      requestUrl='/api/book/newBooks'
      :start='0'
      :limit='3'
      ></new-book>
      <all-book ref='allBooks' 
      :data='allBooks'
      requestUrl='/api/book/addedBooks'
      :start='0'
      :limit='3'></all-book>
    </mt-loadmore>
  </div>

</template>
<script>
import appHeader from "@/views/layout/appHeader";
import newBook from "./newBook";
import allBook from "./allBook";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: "home",
  data() {
    return {
      allLoaded: false,
      //下拉加载状态
      topStatus: "",
      swipImgs: [
        {
          url: "/static/imgs/RxJS750.jpg"
        },
        {
          url: "/static/imgs/python201808750315.jpg"
        },
        {
          url: "/static/imgs/DK_BXS_180808_750_315.jpg"
        }
      ],
      allBooks: [],
      newBooks: [],
      //vue-awsome-swiper组件配置
      swiperOption: {
        loop: true, //重复循环
        //显示滑动图标
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      }
    };
  },
  components: {
    appHeader,
    newBook,
    allBook,
    swiper,
    swiperSlide
  },
  mounted() {
    Promise.all([this.$refs.newBooks.getDatas(), this.$refs.allBooks.getDatas()])
    .then((values) => {
      this.newBooks = values[0].data.data;
      this.allBooks = values[1].data.data;
    });
  },
  methods: {
    //下拉刷新
    loadTop: function() {
      // 刷新数据的操作
      var self = this;
      this.refresh();
    },
    async refresh() {
      const [newBookData, allBookData] = await Promise.all([this.$refs.newBooks.getDatas(), this.$refs.allBooks.getDatas()]);
      [this.newBooks, this.allBooks] = [newBookData.data.data, allBookData.data.data];
      this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    }
  },
  //我得借阅页面跳转过来刷新页面
  beforeRouteLeave(to, from, next) {
      if ('borrow' === to.name) {
        to.meta.keepAlive = false;
      } else {
        to.meta.keepAlive = true;
      }
      next();
  }
};
</script>
<style lang="scss" scoped>
.is-right span {
  margin-left: 0.1333rem;
}
.main-content {
  position: absolute;
  top: $height-40;
  left: 0;
  right: 0;
  bottom: $height-40;
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


