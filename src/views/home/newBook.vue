<template>
    <div>
        <mt-header class='new-book-header' v-if='bookList.length > 0'>
            <div slot='left'class='header-name'>新书上架</div>
            <div slot='right'>
                <span>查看更多</span>
                <mt-button class="el-icon-third-right"></mt-button>
            </div>
        </mt-header>
        <book-list :data='bookList'></book-list>
    </div>
</template>
<script>
import bookList from '@/components/booklist/bookList'
export default {
    name: 'newBook',
    data () {
        return {
            bookList: [{
                photoUrl: '/static/imgs/s1160143.jpg',
                name: 'java数据库系统开发实例导航',
                author: '王小明',
                store: 2,
                mark: '8.0',
                comment: 146,
                like: 46 
            },{
                photoUrl: '/static/imgs/s8888997.jpg',
                name: 'java入门经典',
                author: '占盼盼',
                store: 1,
                mark: '9.2',
                comment: 14,
                like: 1430 
            }]
            //bookList: []
        }
    },
    components: {
        bookList
    }
}
</script>
<style lang="scss" scoped>
.new-book-header {
    background: transparent;
    color: $Black;
    .header-name {
        border-left: 0.037rem solid;
        padding-left: 0.0926rem;
    }
}
</style>


