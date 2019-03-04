title: 基于vue+mint-ui的图书借阅系统

基于vue+mint-ui开发了一个移动端的图书借阅系统，特记录下开发过程中心(踩)得(过)体(的)会(坑)。

整体需求说明

主要功能

借阅者：图书检索，新书推荐，线上预定评价，线下借阅归还
管理员：图书上架（下架），线上报表，线下借阅归还

功能模块

1、借阅者
1）游览书单模块
2）新书推荐模块
3）图书详情 模块
4）我的借阅 模块
5）借阅详情 模块
2、管理员
1）新书上架 模块
2）图书借阅 模块
3）图书归还模块
4）图书统计 汇总模块
5）图书统计明细模块

关键难点(采坑)

布局

由于移动端设备的多样性，需要对不同的移动web做适配 ，本项目采用淘宝的lib-flexible弹性布局方案。本项目采用了mint-ui第三方框架，如果直接直接应用lib-flexible,并且将index.html中<meta name="viewport" content="width=device-width, initial-scale=1.0">那么就会将mint-ui中组件的px转换成rem,这显然不是我们愿意看到的。所以index.html的meta标签仍然需要保留，我们在需要转rem的地方手动写rem(快捷键Alt+Z px to rem)。我使用的IDE是vscode,下载px-to-rem插件，一般我们设计稿是750px,然后将16设置为75。

// Number of pixels per 1rem
"px-to-rem.px-per-rem": 75
1px的问题

伪类 + transform

.border1
    height: .5rem
    position: relative
.border1:before
    position: absolute
    top:-.5rem
    left:0
    content: ''
    width:100%
    height:1px
    border-top:1px solid rgba(0,0,0,.3)
    transform: scaleY(0.5)
这种方式的原理很简单，就是把原先元素的border去掉，然后利用:before或者:after重做border ，并transform的scale缩小一半，原先的元素相对定位，新做的border绝对定位。

前进后退的动画效果

应用vue2-animate插进

//main.js
import 'vue2-animate/dist/vue2-animate.min.css'
配合vue的transition标签

<div id="app">
    <transition 
    :name='transitionName'  //动画名称
    :enter-active-class="enterActiveClass"  //组件进入时的动画
    :leave-active-class="leaveActiveClass"  //组件离开时的动画
    :duration='300'  //持续时间
    >
      <router-view :key='$route.path' class='main-wrapper'/>
    </transition>
</div>
通过监听路径的长短判断前进和后退的页面(路径长的页面表示next页)

watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
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
无限滚动加载

想看图书和我的推荐使用了v-infinite-scroll指令，并且两个页面是在tab组内，如果在想看图书的tab内滚动一段距离后，切换到我的推荐tab内，发现里面的内容也滚动了一段距离。所以我们需要加sleected属性，在recommend-list组件内判断(v-if='selected === id')当前tab和组件id是否一致。

//页面结构
<div class='tabbar-wrapper'>
    <mt-tabbar v-model="selected" @input='tacChange'>
        <mt-tab-item id='wanna'>
            想看图书
        </mt-tab-item>
        <mt-tab-item id='recommend'>
            我的推荐
        </mt-tab-item>
    </mt-tabbar>
</div>
<mt-tab-container class='book-list' v-model='selected'>
    <mt-tab-container-item id='wanna'>
        <recommend-list :data='wannaList' 
        requestUrl='/api/book/otherRecommendList' 
        :user_id='user_id'
        :selected='selected'
        id='wanna'
        ref='wanna'>
        </recommend-list>
    </mt-tab-container-item>
    <mt-tab-container-item id='recommend'>
        <recommend-list :data='recommendList' 
        :showRecommend='showRecommend'
        requestUrl='/api/book/recommendList' 
        :user_id='user_id'
        :selected='selected'
        id='recommend'
        ref='recommend'>
        </recommend-list>
    </mt-tab-container-item>
</mt-tab-container>
轮播图

使用mint-ui自带的vue-swipe，图片轮播后在某些设备中轮播图的高度会变化，导致布局异常。后来切换成vue-awesome-swiper就不会有这样的问题了。具体原因还没去了解，之后会再补充。

颜色变量统一管理

本项目使用的css预处理器是sass，将所有颜色的变量放在color.scss文件内，英文名称的命名可以参考链接里的名称https://www.zhangxinxu.com/study/201008/css3-color-names.php，

/* cloor */
$Mischka: #dcdfe6;
$Shuttle-Gray: #656b79;
$Dodger-Blue: #26a2ff;
$Web-Orange: #FFA500;
$White: #fff;
$Black: #000;
$Oslo-Gray: #8f949a;
$Red: #FF0000;
$Aqua-Haze: #F6F8FA;
$Green: #00FF00;
$Wild-Sand: #F5F5F5;
$Napa: #ACA899;
在main.js中引入color.js

import '../static/css/color.scss'