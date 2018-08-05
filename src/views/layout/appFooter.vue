<template>
    <mt-tabbar v-model="selected" @input='tabClick' fixed>
        <mt-tab-item v-for='(menu, index) in menus' :key='index' :id='menu.name'>
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
          name: "首页"
        },
        {
          name: "我的借阅"
        }
      ],
      selected: "首页"
    };
  },
  methods: {
    tabClick(id) {
      console.log(id);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>



