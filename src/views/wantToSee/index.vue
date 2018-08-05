<template>
    <div>
        <mt-header title='想看' fixed>
            <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
            <div slot='right'>
                <router-link to='/searchBooks'>
                    <mt-button icon="search" class="icon-white icon-margin"></mt-button>
                </router-link>
                <router-link to='/addBook'>
                    <mt-button class='el-icon-third-plus-circle icon-white icon-margin'></mt-button>
                </router-link>
            </div>
        </mt-header>
        <div class='tabbar-wrapper'>
            <mt-tabbar v-model="selected" @input='tacChange'>
                <mt-tab-item id='wanted'>
                    想看图书
                </mt-tab-item>
                <mt-tab-item id='recommend'>
                    我的推荐
                </mt-tab-item>
            </mt-tabbar>
        </div>
            <mt-tab-container class='book-list' v-model='selected'>
                <mt-tab-container-item id='wanted'>
                    <recommend-list :data='wantedList'></recommend-list>
                </mt-tab-container-item>
                <mt-tab-container-item id='recommend'>
                    <recommend-list :data='recommendList' :showRecommend='showRecommend'></recommend-list>
                </mt-tab-container-item>
            </mt-tab-container>
    </div>
</template>
<script>
import recommendList from '@/components/booklist/recommendList'
export default {
    name: 'wantToSee',
    components: {
        recommendList
    },
    data () {
        return {
            selected: 'wanted',
            wantedList: [{
                name: 'java数据库系统开发实例导航java数据库系统开发实例导航java数据库系统开发实例导航',
                reason: '我想学习XXXXXXXXXX这块知识，这本书包含的XXXXXXXXXX内容让我感兴趣;我想学习XXXXXXXXXX这块知识，这本书包含的XXXXXXXXXX内容让我感兴趣;',
                recommend: '王小雨',
                like: 26,
                isPraise: false
            },{
                name: 'JavaScript高级程序设计',
                reason: '我想学习XXXXXXXXXX这块知识，这本书包含的XXXXXXXXXX内容让我感兴趣',
                recommend: '忧伤的小胖',
                like: 24,
                isPraise: false
            }],
            recommendList: [{
                name: 'java数据库系统开发实例导航java数据库系统开发实例导航java数据库系统开发实例导航',
                reason: '我想学习XXXXXXXXXX这块知识，这本书包含的XXXXXXXXXX内容让我感兴趣;我想学习XXXXXXXXXX这块知识，这本书包含的XXXXXXXXXX内容让我感兴趣;',
                recommend: '王小雨',
                like: 26
            },{
                name: 'JavaScript高级程序设计',
                reason: '我想学习XXXXXXXXXX这块知识，这本书包含的XXXXXXXXXX内容让我感兴趣',
                recommend: '忧伤的小胖',
                like: 24
            }],
            showRecommend: false
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        tacChange() {
            document.querySelectorAll('.add-animation').forEach(function(item) {
                item.classList.remove('add-animation');
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.icon-white {
    color: $White;
}
.icon-margin {
    margin-right: 0.1852rem;
}
.tabbar-wrapper {
    position: absolute;
    height: 26px;
    top: 40px;
    left: 0;
    right: 0;
}
.book-list {
    position: absolute;
    top: 66px;
    left: 0;
    right: 0;
}
</style>

