<template>
  <div id="app">
    <transition  
    :name='transitionName'
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    :duration='300'
    >
      <keep-alive >
        <router-view v-if='$route.meta.keepAlive' :key='$route.path'/>
      </keep-alive>
    </transition>
    <transition 
    :name='transitionName'
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    :duration='300'
    >
      <router-view v-if='!$route.meta.keepAlive' :key='$route.path'/>
    </transition>    
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      transitionName: 'fade',
      enterActiveClass: 'fadeIn',
      leaveActiveClass: 'fadeOut'
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      console.log(toDepth, fromDepth);
      if (toDepth < fromDepth) {
        this.transitionName = 'slide';
        this.enterActiveClass = 'slideInLeft';
        this.leaveActiveClass = 'slideOutRight';
      } else if (toDepth > fromDepth) {
        this.transitionName = 'slide';
        this.enterActiveClass = 'slideInRight';
        this.leaveActiveClass = 'slideOutLeft';
      } else {
        this.transitionName = 'fade';
        this.enterActiveClass = 'fadeIn';
        this.leaveActiveClass = 'fadeOut';
      }
    }
  }
};
</script>

<style lang='scss'>

html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  background-color: $Aqua-Haze;
}
</style>
