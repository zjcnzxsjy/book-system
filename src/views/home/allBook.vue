<template>
    <div>
        <mt-header class='all-book-header'>
            <div slot='left' class='header-name'>全部图书</div>
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
    name: 'allBook',
    data () {
        return {
            bookList: [{
                photoUrl: '/static/imgs/s8958650.jpg',
                name: 'JavaScript高级程序设计',
                author: '王小明',
                store: 2,
                mark: '8.0',
                comment: 146,
                like: 46 
            },{
                photoUrl: '/static/imgs/s1958902.jpg',
                name: 'JavaScript DOM编程艺术',
                author: '占盼盼',
                store: 1,
                mark: '9.2',
                comment: 14,
                like: 1430 
            }]
        }
    },
    components: {
        bookList
    }
}
</script>
<style lang="scss" scoped>
.all-book-header {
    background: transparent;
    color: $Black;
    .header-name {
        border-left: 0.037rem solid;
        padding-left: 0.0926rem;
    }
}
</style>


