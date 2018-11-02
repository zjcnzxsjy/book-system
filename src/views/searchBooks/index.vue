<template>
    <div class='search-wrapper'>
        <self-header @input='handleInput'>
            <span slot='append' @click='cancel' v-if='!showSearch'>取消</span>
            <span slot='append' @click='search' v-else>搜索</span>
        </self-header>
        <div class='search-result'>
            <div class='search-result-title'>{{title}}</div>
            <book-list v-for='(item, index) in bookList' :data='item' :key='index' @click.native='handleClick(item)'></book-list>
        </div>
    </div>
</template>
<script>
import selfHeader from '@/components/header/index'
import bookList from '@/components/booklist/bookList'
export default {
    name: 'search',
    options: {
        componentName: 'input',
    },
    data() {
        return {
            value: '',
            showSearch: false, //是否显示清空图标
            title: '搜索结果',
            bookList: []
        }
    },
    components: {
        selfHeader,
        bookList
    },
    methods: {
        cancel() {
            this.$router.go(-1);
        },
        search () {
            this.$axios.get('/api/book/searchBooks', {
                params: {
                    title: this.value,
                    start: 0,
                    limit: 6
                }
            })
            .then((res) => {
                this.bookList = res.data.list;
                res.data.list.length === 0 && (this.title = '暂无您想要搜索的图书');
            })
        },
        handleInput(val) {
            this.value = val;
        },
        handleClick(data) {
            this.$router.push('book/details/'+ data.ISBN +'');
        }
    },
    watch: {
        //没有字符串输入时不显示清除图标
        value (val) {
            val === ''? (this.showSearch = false) : (this.showSearch = true);
        }
    }
}
</script>
<style lang="scss" scoped>
.search-wrapper {
    display: flex;
    flex-direction: column;
    .search-panel {
        display: flex;
        background-color: $Dodger-Blue;
        padding: 0.2778rem 10px;
        align-items: center;
        .search-input {
            flex: 1;
        }
        .cancel {
            display: inline-block;
            width: 0.7407rem;
            margin-left: 0.2778rem;
        }
    }
    .search-result {
        height: calc(100% - 40px);
        overflow-y: auto;
        .search-result-title{
            padding: 0.2778rem 0 0.2778rem 0.2778rem;
        }
    }
}
</style>


