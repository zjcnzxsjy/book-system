<template>
    <div>
        <mt-header title='想看' fixed>
            <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
            <div slot='right'>
                <router-link to='/searchBooks'>
                    <mt-button icon="search" class="icon-config"></mt-button>
                </router-link>
                <router-link to='/wannaSee/addBook'>
                    <mt-button class='el-icon-third-plus-circle icon-config'></mt-button>
                </router-link>
            </div>
        </mt-header>
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
    </div>
</template>
<script>
import recommendList from '@/components/booklist/recommendList'
export default {
    name: 'wannaSee',
    components: {
        recommendList
    },
    data () {
        return {
            selected: 'wanna',
            wannaList: [], //想看列表
            recommendList: [], //推荐列表
            showRecommend: false, //是否显示推荐人
            user_id: '22510',
            wannaMoreLoading: false,
            recoMoreLoading: false
        }
    },
    mounted() {
        this.$refs.wanna.getDatas();
        this.$refs.recommend.getDatas();
    },
    methods: {
        back() {
            this.$router.push('/home');
        },
        //点赞效果动画
        tacChange() {
            document.querySelectorAll('.add-animation').forEach(function(item) {
                item.classList.remove('add-animation');
            })
        }
    },
    //首页或者想看推荐成功跳转过来刷新页面
    beforeRouteEnter(to, from, next) {
        if ('home' === from.name || 'wannaIntroduction' === from.name) {
            to.meta.keepAlive = false;
        } else {
            to.meta.keepAlive = true;
        }
        next();
    }
}
</script>
<style lang="scss" scoped>
.icon-config {
    color: $White;
    margin-right: 0.1852rem;
    font-size: 18px;
}
.tabbar-wrapper {
    position: absolute;
    height: $height-40;
    top: $height-40;
    left: 0;
    right: 0;
}
.book-list {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
}
</style>

