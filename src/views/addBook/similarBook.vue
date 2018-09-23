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
            bookList: []
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.$axios('/api/reco/similarBooks', {
                params: {
                    book_name: this.$route.query.book_name
                }
            })
            .then((res) => {
                this.bookList = res.data;
            })
        })
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        next () {
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

