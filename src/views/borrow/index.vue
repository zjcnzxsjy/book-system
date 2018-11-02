<template>
    <div>
        <div class='header-wrapper'>
            <mt-header title='我的借阅'>
                <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
                <div slot='right'>
                    <span @click='helpBtn'>怎样还书？</span>
                </div>
            </mt-header>
        </div>
        <div class='borrow-wrapper'>
            <div class='tab-bar'> 
                <mt-tabbar v-model="selected">
                    <mt-tab-item v-for='(menu, index) in tabs' :key='index' :id='menu.id'>
                        {{menu.name}}
                    </mt-tab-item>
                </mt-tabbar>
            </div>
            
            <mt-tab-container class='book-list' v-model='selected'>
                <mt-tab-container-item id='all' key='all'>
                    <borrow-list v-for='(data, index) in datas' :data='data' :key='index' @click.native='handleClick(data)' @refresh='handleRefresh'></borrow-list>
                </mt-tab-container-item>
                <mt-tab-container-item id='get' key='get'>
                    <borrow-list v-for='(data, index) in getDatas' :data='data' :key='index' @click.native='handleClick(data)' @refresh='handleRefresh'></borrow-list>
                </mt-tab-container-item>
                <mt-tab-container-item id='return' key='return'>
                    <borrow-list v-for='(data, index) in returnDatas' :data='data' :key='index' @click.native='handleClick(data)' @refresh='handleRefresh'></borrow-list>
                </mt-tab-container-item>
                <mt-tab-container-item id='comment' key='comment'>
                    <borrow-list v-for='(data, index) in commentDatas' :data='data' :key='index' @click.native='handleClick(data)' @refresh='handleRefresh'></borrow-list>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import appFooter from "@/views/layout/appFooter";
import borrowList from '@/components/borrowlist/index'
import { MessageBox } from 'mint-ui';
export default {
    name: 'borrow', //我的借阅
    components: {
        appFooter,
        borrowList
    },
    data () {
        return {
            tabs: [{
                name: '全部',
                id: 'all'
            }, {
                name: '待取书',
                id: 'get'
            }, {
                name: '待还书',
                id: 'return'
            }, {
                name: '待评价',
                id: 'comment'
            }],
            selected: 'all', //页签选择
            datas: []  //借阅信息
        }
    },
    computed: {
        //待取书
        getDatas () {
            return this.datas.filter((data) => {
                return 1 === data.borrowstatus;
            })
        },
        //待还书
        returnDatas () {
             return this.datas.filter((data) => {
                return 2 === data.borrowstatus;
            })
        },
        //待评价
        commentDatas () {
             return this.datas.filter((data) => {
                return 3 === data.borrowstatus;
            })
        }
    },
    created() {
        this.refresh();
    },
    methods: {
        //默认最多借阅20本书
        async refresh() {
            let result =  await this.$axios.get('/api/user/searchBorrow', {
                params: {
                    user_id: '22510',
                    start: 0,
                    limit: 20
                }
            })
            this.datas = result.data.list
        },
        handleRefresh() {
            this.refresh();
        },
        //后退默认都返回首页
        back () {
            this.$router.push('/home');
        },
        //帮助按钮
        helpBtn() {
            MessageBox({
                title: '还书小贴士',
                message: '还书请前往新大楼20楼XXX处。（如按期还书，并为图书打分，系统将自动返还押金每本20经验值）'
            })
        },
        handleClick (data) {
            this.$router.push('/borrow/details/'+ data.borrowid +'');
        }
    },
    //从首页跳转过来刷新页面
    beforeRouteLeave(to, from, next) {
        console.log(to.name);
      if ('home' === to.name) {
        to.meta.keepAlive = false;
      } else {
        to.meta.keepAlive = true;
      }
      next();
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
    position: relative;
}
.borrow-wrapper {
    position: absolute;
    top: $height-40;
    left: 0;
    right: 0;
    bottom: $height-40;
    overflow: hidden;
    .tab-bar {
        position: relative;
        height: $height-40;
    }
    .book-list {
        height: calc(100% - 40px);
        overflow-y: auto;
    }
}
</style>


