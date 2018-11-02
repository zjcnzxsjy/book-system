<template>
    <!-- <div class='footer-wrapper'>
      <mt-tabbar v-model="selected" @input='tabClick'>
          <mt-tab-item v-for='(menu, index) in menus' :key='index' :id='menu.path'>
              {{menu.name}}
          </mt-tab-item>
      </mt-tabbar>
    </div> -->
    <mt-tabbar v-model="selected" @input='tabClick' fixed>
        <mt-tab-item v-for='(menu, index) in menus' :key='index' :id='menu.path'>
            {{menu.name}}
        </mt-tab-item>
    </mt-tabbar>
</template>
<script>
export default {
  name: "appFooter",
  data() {
    return {
      menus: [
        {
          name: "首页",
          path: '/home'
        },
        {
          name: "我的借阅",
          path: '/borrow'
        }
      ],
      selected: this.$route.path === '/home' ? '/home' : '/borrow'
    };
  },
  watch: {
    //浏览器自带前进或后退触发时页签需要跳转
    $route(val) {
      if ('/home' === val.path || '/borrow' === val.path) {
        this.selected = val.path;
      }
    }
  },
  methods: {
    tabClick(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
// .footer-wrapper {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
// }
</style>



