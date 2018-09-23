<template>
    <div>
        <mt-header title='相似图书' fixed>
            <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
        </mt-header>
        <div class='book-wrapper'>
            <section v-if='list.length > 0'>
                <mt-header class='book-header'>
                    <div slot='left' class='header-name'>
                        <mt-button class="el-icon-third-info-circle"></mt-button>
                        <span v-if='0 === search'>有相似书籍已经上架了哦</span>
                        <span v-else>有同名书籍已经上架了哦</span>
                    </div>
                </mt-header>
                <book-list v-for='(item,index) in list' :key='index' :data='item'></book-list>
            </section>
            <section v-if='recommendList.length > 0'>
                <mt-header class='book-header'>
                    <div slot='left' class='header-name'>
                        <mt-button class="el-icon-third-info-circle"></mt-button>
                        <span>您想看的是否和TA一样？</span>
                    </div>
                </mt-header>
                <recommend-list :data='recommendList'></recommend-list>
            </section>
            <div class='button-wrapper' v-if='0 === search'>
                <mt-button size="large" type="primary" @click='next'>继续添加</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '@/assets/bus'
import selfHeader from '@/components/header/index'
import bookList from '@/components/booklist/bookList'
import recommendList from '@/components/booklist/recommendList'
export default {
    name: 'addedBook',
    components: {
        selfHeader,
        bookList,
        recommendList
    },
    data () {
        return {
            list: [], //架上同名图书数据
            recommendList: [], //相似推荐数据
            search: ''  //0:架上相似 1:推荐相似
        }
    },
    mounted () {
        this.$nextTick(() => {
            //判断想看的图书是否有同名或者相似的
            this.$axios('/api/user/ifCanIntroduction', {
                params: {
                    user_id: '22510',
                    name: this.$route.query.book_name
                }
            })
            .then((res) => {
                this.list = res.data.list;
                this.recommendList = res.data.commend_list;
                this.search = res.data.search;
            })
        })
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        next() {
            this.$router.push({path: '/wannaSee/addBook/addedBook/wannaIntroduction', query: {book_name: this.$route.query.book_name}});
        }
    }
}
</script>
<style lang="scss" scoped>
.book-wrapper {
    position: absolute;
    top: $height-40;
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
    .button-wrapper {
        padding: 10px 0.9259rem;
    }
}
</style>

