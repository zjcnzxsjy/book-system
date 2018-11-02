<template>
  <div class='wrapper'>
      <router-view></router-view>
      <app-footer></app-footer>
  </div>

</template>
<script>
import appFooter from "@/views/layout/appFooter";
export default {
  name: "layout",
  components: {
      appFooter
  }
};
</script>
<style lang="scss" scoped>
</style>




