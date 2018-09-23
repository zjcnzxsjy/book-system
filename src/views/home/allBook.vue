<template>
    <div>
        <mt-header class='all-book-header'>
            <div slot='left' class='header-name'>全部图书</div>
            <div slot='right'>
                <router-link to='/book/allBooks' class='more'>
                    <span>查看更多</span>
                    <mt-button class="el-icon-third-right"></mt-button>
                </router-link>
            </div>
        </mt-header>
        <div>
            <book-list v-for='(item,index) in data' :data='item' :key='index' @click.native='handleClick(item)'></book-list>
        </div>
        
    </div>
</template>
<script>
import bookList from '@/components/booklist/bookList'
export default {
    name: 'allBook',
    props: {
        data: {
            type: Array,
            default: []
        },
        requestUrl: String,
        start: Number,
        limit: Number
    },
    components: {
        bookList
    },
    methods: {
        getDatas () {
            return this.$axios.get(this.requestUrl, {
                params: {
                    start: this.start,
                    limit: this.limit
                }
            });
        },
        handleClick (data) {
            //跳转到图书详情页面
            this.$router.push('/book/details/'+ data.ISBN +'');
        }
    }
}
</script>
<style lang="scss" scoped>
.all-book-header {
    background: transparent;
    color: $Black;
    .more {
        color: $Oslo-Gray;
        text-decoration: none;
    }
    .header-name {
        border-left: 0.037rem solid;
        padding-left: 0.0926rem;
    }
}
</style>


