<template>
    <div>
        <self-header>
            <div slot='prepend' class='el-icon-third-left' @click='back'></div>
        </self-header>
        <div class='book-wrapper'>
            <mt-header class='book-header'>
                <div slot='left' class='header-name'>
                    <mt-button class="el-icon-third-info-circle"></mt-button>
                    <span>您想看的是否和TA一样？</span>
                </div>
            </mt-header>
            <recommend-list :data='bookList'></recommend-list>
            <div class='button-wrapper'>
                <mt-button size="large" type="primary" @click='next'>继续添加</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import selfHeader from '@/components/header/index'
import recommendList from '@/components/booklist/recommendList'
export default {
    name: 'existedBook',
    components: {
        selfHeader,
        recommendList
    },
    data () {
        return {
            bookList: [{
                name: 'java数据库系统开发实例导航java数据库系统开发实例导航java数据库系统开发实例导航',
                reason: '我想学习XXXXXXXXXX这块知识，这本书包含的XXXXXXXXXX内容让我感兴趣;我想学习XXXXXXXXXX这块知识，这本书包含的XXXXXXXXXX内容让我感兴趣;',
                recommend: '王小雨',
                like: 25
            }]
        }
    },
    methods: {
        back () {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
.book-wrapper {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    .book-header {
        background: transparent;
        height: 30px;
        .header-name {
            height: 30px;
            line-height: 30px;
            color: $Web-Orange;
            font-size: 0.2222rem;
            padding-left: 0.0926rem;
            button {
                height: 30px;
            }
        }
    }
    .button-wrapper {
        padding: 10px 0.9259rem;
    }
}
</style>

