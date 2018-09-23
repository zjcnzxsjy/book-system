<template>
    <div class='borrow-list-wrapper'>
        <div class='borrow-deader'>
            <mt-header title='评价'>
                <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
            </mt-header>
        </div>
        <div class='borrow-main'>
            <div class='book-photo'>
                <img :src='data.image' />
            </div>
            <div class='book-title'>
                <h1>{{data.title}}</h1>
            </div>
            <div class='book-author'>
                作者：{{data.author}}
            </div>
            <div class='start-time'>
                <span>{{data.borrowtime | f1}}</span>
            </div>
        </div>
        <div class='borrow-rating'>
            <vue-stars
                name="demo"
                active-color="#ffdd00"
                inactive-color="#DDDDDD"
                shadow-color="#ffff00"
                hover-color="#dddd00"
                :max="10"
                v-model="score"
                :readonly="false"
                char="★"
                inactive-char="★"
            />
        </div>
        <textarea placeholder='（选填）请发表你的看法..' v-model='content' class='comment-area'></textarea>
        <mt-button type='primary' size='large' style='margin-top: 20px;' @click='comment'>提交评价</mt-button>
    </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
import moment from "moment";
import vueStars from 'vue-stars';
export default {
    name: 'comment',
    data() {
        return {
            data: {},
            score: 1,
            content: ''
        }
    },
    components: {
        vueStars
    },
    filters: {
        f1(val) {
            if ('' === val) {
                return val;
            }
            return moment(+val).format("YYYY-MM-DD");
        }
    },
    created() {
        this.$axios.get('/api/user/borrowDetails', {
            params: {
                borrow_id: this.$route.params.id
            }
        })
        .then((res) => {
            this.data = res.data;
        })
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        //提交评价
        comment() {
            this.$axios.post('/api/user/saveComment', {
                borrow_id: this.data.borrowid,
                ISBN: this.data.ISBN,
                user_id: this.data.userid,
                score: this.score,
                content: this.content
            })
            .then((res) => {
                MessageBox({
                    title: '',
                    message: res.data.message,
                    confirmButtonText: '知道了'
                })
                .then(action => {
                    if ('confirm' === action) {
                        this.$router.push('/borrow');
                    }
                });
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.borrow-list-wrapper {
    overflow: hidden;
    .borrow-deader {
        position: relative;
    }
  .borrow-main {
    display: grid;
    grid-template-columns: 80px 1fr 70px;
    grid-template-rows: 45px 45px;
    color: $Oslo-Gray;
    align-items: center;
    background-color: $White;
    .book-photo {
      grid-row: 1 / 3;
      padding: 5px 0.1852rem;
      img {
        width: 100%;
        height: 80px;
      }
    }
    .book-title {
      grid-column: 2 / 4;
      h1 {
        color: $Black;
        font-size: 16px;
      }
    }
  }
  .borrow-rating {
      background-color: $White;
      padding: 0 0 10px 10px;
   }
   .comment-area {
       width: 100%;
       height: 100px;
       margin-top: 10px;
   }
}
</style>


