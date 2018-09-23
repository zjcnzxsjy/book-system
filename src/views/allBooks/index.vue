<template>
    <div>
        <mt-header title='全部图书' fixed>
            <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
        </mt-header>
        <div class='book-wrapper' ref='List'>
            <div v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="20"
            infinite-scroll-immediate-check='false'>
                <div>
                    <book-list v-for='(item, index) in bookList' :data='item' :key='index' @click.native='handleClick(item)'></book-list>
                </div>
                
                <!--底部判断是加载图标还是提示“全部加载”-->
                <div class="more_loading">
                    <mt-spinner type="snake" color="#00ccff" :size="8" v-show="moreLoading&&!allLoaded&&queryLoading"></mt-spinner>
                    <span v-show="allLoaded">已全部加载</span>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import bookList from '@/components/booklist/bookList'
export default {
    name: 'allBooks',
    components: {
        bookList
    },
    data () {
        return {
            bookList: [],
            //初始化无限加载相关参数
            queryLoading: false,
            moreLoading: false,
            allLoaded: false,
            limit: 8,
            start: 0
        }
    },
    created () {
        this.getDatas()
        .then((res) => {
            this.bookList = res.data.data;
            if (res.data.all === res.data.data.length) {
                this.moreLoading = true;
            }
        })
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        getDatas () {
            return this.$axios.get('/api/book/addedBooks', {
                params: {
                    start: this.start,
                    limit: this.limit
                }
            })
        },
        loadMore () {
            if(this.allLoaded){
                this.moreLoading = true;
                return;
            }
            if(this.queryLoading){
                return;
            }
            this.moreLoading = true;
            this.start += this.limit;
            this.getDatas()
            .then((res) => {
                this.bookList = this.bookList.concat(res.data.data);
                this.queryLoading = false;
                this.moreLoading = false;
                this.allLoaded = res.data.all === this.bookList.length;
            })
        },
        handleClick (data) {
            this.$router.push('/book/details/'+ data.ISBN +'');
        }
    }
}
</script>
<style lang="scss" scoped>
.book-header {
    position: relative;
}
.book-wrapper{
    position: absolute;
    bottom: 0;
    left: 0;
    top: $height-40;
    right: 0;
    overflow-y: auto;
    .more_loading {
        color: $Oslo-Gray;
        display: flex;
        justify-content: center;
    }
}
</style>
