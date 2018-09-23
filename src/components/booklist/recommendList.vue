<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="20" infinite-scroll-immediate-check='false' v-if='selected === id'>
        <div class='book-wrapper' v-for='(book, index) in recommendData' :key='index'>
            <h5 class='book-title'>
                {{book.title}}
            </h5>
            <div class='book-reason'>
                理由：
                <span>{{book.reason}}</span>
            </div>
            <div class='book-toolbar'>
                <span v-if='showRecommend' class='recommend'>推荐人:
                    <span class='recmmend-name'>{{book.user_name}}</span>
                </span>
                <div class='toolbar-button'>
                    <mt-button class='el-icon-third-like' size="small" @click='like(index, $event)'>{{book.like}}</mt-button>
                    <em class='like'>+1</em>
                </div>
            </div>
        </div>
        <div class="more_loading">
            <mt-spinner type="snake" color="#00ccff" :size="8" v-show="moreLoading&&!allLoaded&&queryLoading"></mt-spinner>
            <span v-show="allLoaded">已全部加载</span>
        </div>
    </div>
</template>
<script>
import {MessageBox} from 'mint-ui';
export default {
    name: 'recommendList', //推荐列表
    props:{
        //是否显示推荐人
        showRecommend: {
            type: Boolean,
            default: true
        },
        //请求的url
        requestUrl: String,
        data: {
            type: Array,
            defalut: []
        },
        //借阅人ID
        user_id: String,
        selected: String,
        id: String
    },
    data() {
        return {
            queryLoading: false, //上拉是否查询中
            allLoaded: false,  //是否全部加载
            moreLoading: false, //上拉查询是否可用
            start: 0, //查询开始位置
            limit: 10, //查询数量,
            recommendData: []
        }
    },
    methods: {
        //获取数据
        getDatas() {
            this.$axios.get(this.requestUrl, {
                params: {
                    user_id: this.user_id,
                    start: 0,
                    limit: 10
                }
            })
            .then((res) => {
                this.recommendData = res.data.list;
                if (res.data.total === res.data.list.length) {
                    this.moreLoading = true;
                }
            })
        },
        //点赞
        like (index, $event) {
            this.$nextTick(() => {
                if(!$event.target.classList.contains('is-like')) {
                    this.$axios.post('/api/user/likeCommend', {
                        user_id: this.data[index].userid,
                        book_id: this.data[index].bookid
                    })
                    .then((res) => {
                        if (0 === res.data.code) {
                            this.data[index].like += 1;
                            $event.target.classList.add('is-like');
                            $event.target.parentNode.querySelector('.like').classList.add('add-animation');
                        } else {
                            MessageBox({
                                title: '',
                                message: res.data.message,
                                confirmButtonText: '知道了'
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
            })
        },
        //上拉查询回调
        loadMore() {
            //全部加载时上拉查询不可用
            if(this.allLoaded){
                this.moreLoading = true;
                return;
            }
            //正在查询中直接返回
            if(this.queryLoading){
                return;
            }
            this.moreLoading = true;
            //调整查询位置
            this.start += this.limit;
            this.$axios.get(this.requestUrl, {
                params: {
                    user_id: this.user_id,
                    start: this.start,
                    limit: this.limit
                }
            })
            .then((res) => {
                //拼接每次查询的结果
                this.data = this.data.concat(res.data.list);
                this.queryLoading = false;
                this.moreLoading = false;
                this.allLoaded = res.data.total === this.data.length;
            })
        },
        setData(data) {
            if (data === null || typeof(data) === 'undefined') return;
            if (Array.isArray(data)) {
                this.recommendData = data;
                return;
            }
        }
    },
    created() {
        this.setData(this.data);
    }
}
</script>
<style lang="scss" scoped>
.book-wrapper {
  display: flex;
  flex-direction: column;
  background-color: $White;
  .book-title {
    font-size: 0.2963rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0.2778rem;
  }
  .book-reason {
    padding: 0 0.2778rem;
    color: $Shuttle-Gray;
    height: 37px;
    line-height: 14px;
  }
  .book-toolbar {
    height: 35px;
    line-height: 32px;
    //border-top: 1px solid $Mischka;
    .recommend {
      padding-left: 0.2778rem;
      .recmmend-name {
        color: $Dodger-Blue;
      }
    }
    .toolbar-button {
      float: right;
      position: relative;
      button {
        border: none;
        box-shadow: none;
        background-color: transparent;
      }
      .like {
        color: $Web-Orange;
        position: absolute;
        top: -999px;
        left: 10px;
        font-size: 0.2778rem;
        opacity: 0;
        filter: Alpha(opacity=0);
        -moz-opacity: 0;
      }
      .is-like {
        color: $Web-Orange;
      }
    }
  }
}
.more_loading {
  color: $Oslo-Gray;
  display: flex;
  justify-content: center;
}
.add-animation {
  animation: mypraise 0.5s 1;
  -moz-animation: mypraise 0.5s 1; /* Firefox */
  -webkit-animation: mypraise 0.5s 1; /* Safari 和 Chrome */
  -o-animation: mypraise 0.5s 1; /* Opera */
}
@keyframes mypraise {
  0% {
    top: 0px;
    opacity: 0;
    filter: Alpha(opacity=0);
    -moz-opacity: 0;
  }
  25% {
    top: -10px;
    opacity: 0.5;
    filter: Alpha(opacity=50);
    -moz-opacity: 0.5;
  }
  50% {
    top: -15px;
    opacity: 1;
    filter: Alpha(opacity=100);
    -moz-opacity: 1;
  }
  75% {
    top: -20px;
    opacity: 0.5;
    filter: Alpha(opacity=50);
    -moz-opacity: 0.5;
  }
  100% {
    top: -25px;
    opacity: 0;
    filter: Alpha(opacity=0);
    -moz-opacity: 0;
  }
}
</style>


