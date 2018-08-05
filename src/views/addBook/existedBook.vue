<template>
    <div>
        <self-header>
            <div slot='prepend' class='el-icon-third-left' @click='back'></div>
        </self-header>
        <div class='book-wrapper'>
            <mt-header class='book-header'>
                <div slot='left' class='header-name'>
                    <mt-button class="el-icon-third-info-circle"></mt-button>
                    <span>有同名书籍已经上架了哦</span>
                </div>
            </mt-header>
            <cover-list :data='bookList'></cover-list>
        </div>
    </div>
</template>
<script>
import selfHeader from '@/components/header/index'
import coverList from '@/components/booklist/coverList'
export default {
    name: 'existedBook',
    components: {
        selfHeader,
        coverList
    },
    data () {
        return {
            bookList: [{
                coverUrl: '/static/imgs/s8958650.jpg',
                name: 'JavaScript高级程序设计',
                author: '王小明',
                store: 2,
                mark: '8.0分',
                comment: 146,
                like: 46 
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
        border-bottom: 0.0185rem solid $Mischka;
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
}
</style>

