<template>
    <div>
        <mt-header title='图书详情' fixed>
            <div slot='left'><mt-button icon="back" @click='back'>返回</mt-button></div>
            <div slot='right'>
                <router-link to='/help'>
                    <mt-button icon="help"></mt-button>
                </router-link>
            </div>
        </mt-header>
        <div class='details-wrapper'>
            <div class='details-info'>
                <div class='details-title'>
                    <h1>{{detailData.title}}</h1>
                </div>
                <div class='details-image' style="--aspect-ratio: 4/5;">
                    <img :src='detailData.image' />
                </div>
                <div class='details-author'>
                    作者：{{detailData.authorArray | f1}}
                </div>
                <div class='details-store'>
                    架上剩余：{{detailData.remain}}
                </div>
                <div class='details-rating'>
                    {{detailData.commentall}}分
                </div>
                <div class='details-like'>
                    <mt-button class='el-icon-third-heart' size="small">{{detailData.likeAll}}</mt-button>
                </div>
            </div>
            <div class='present-comment'>
                <div class='tab-bar-panel'> 
                    <mt-tabbar v-model="selected" id='tab-bar' class='tab-bar'>
                        <mt-tab-item id='summary'>
                            <span class='tab-label'>图书介绍</span>
                        </mt-tab-item>
                        <mt-tab-item id='comment'>
                            <span class='tab-label'>
                                图书评论<mt-badge type="error" class='comment-num'>{{commentList.length}}</mt-badge>
                            </span>
                        </mt-tab-item>
                    </mt-tabbar>
                </div>
                <mt-tab-container class='book-list' v-model='selected'>
                    <mt-tab-container-item id='summary'>
                        <p>{{detailData.summary}}</p>
                    </mt-tab-container-item>
                    <mt-tab-container-item id='comment'>
                        <div v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="moreLoading"
                        infinite-scroll-distance="20"
                        infinite-scroll-immediate-check='false'>
                            <comment-list :data='commentList'></comment-list>
                            
                            <!--底部判断是加载图标还是提示“全部加载”-->
                            <div class="more_loading">
                                <mt-spinner type="snake" color="#00ccff" :size="8" v-show="moreLoading&&!allLoaded&&queryLoading"></mt-spinner>
                                <span v-show="allLoaded">已全部加载</span>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    
                </mt-tab-container>
            </div>           
        </div>
        <div class='borrow-toolbar'>
            <div class='toolbar-button'>
                <mt-button v-if='0 === detailData.ifLike' class='el-icon-third-heart' size="small" @click='like()'>喜欢</mt-button>
                <mt-button v-else class='el-icon-third-heart1 color-red' size="small" @click='cancelLike()'>取消喜欢</mt-button>
            </div>
            <div class='borrow-mark' 
            :class='0 === detailData.remain? "bg-disabled" : "bg-enabled"'
            @click='borrow' 
            >{{detailData.remain | f2}}</div>
        </div>
    </div>
</template>
<script>
import commentList from '@/components/commentlist/index';
import {Indicator, MessageBox} from 'mint-ui';
export default {
    name: 'bookDetails',
    data () {
        return {
            detailData: {}, //图书详情
            selected: 'summary', //页签选择
            commentList: [], //图书评论
            queryLoading: false,
            moreLoading: false,
            allLoaded: false,
            start: 0,
            limit: 5
        }
    },
    components: {
        commentList
    },
    created () {
        Promise.all([this.getDetail(), this.getComment()])
        .then((values) => {
            this.detailData = values[0].data;
            this.commentList = values[1].data.list;
            if (values[1].data.total === values[1].data.list.length) {
                this.moreLoading = true;
            }
        });
    },
    filters: {
        f1 (author) {
            if (Array.isArray(author)) {
                return author.join(',');
            }
        },
        f2 (remain) {
            if (0 === remain) {
                return '架上剩余0本'
            } else {
                return '立即借阅'
            }
        }
    },
    methods: {
        getDetail () {
            return this.$axios.get('/api/book/details', {
                params: {
                    user_id: '22510',
                    ISBN: this.$route.params.id
                }
            })
        },
        getComment () {
            return this.$axios.get('/api/book/comment', {
                params: {
                    ISBN: this.$route.params.id,
                    start: this.start,
                    limit: this.limit
                }
            })
        },
        back () {
            this.$router.go(-1);
        },
        initData() {
            this.detailData = {};
            this.commentList = [];
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
            this.getComment()
            .then((res) => {
                this.commentList = this.commentList.concat(res.data.list);
                this.queryLoading = false;
                this.moreLoading = false;
                this.allLoaded = res.data.total === this.commentList.length;
            })
        },
        borrow() {
            //架上剩余0本直接返回
            if (0 === this.detailData.remain) {
                return;
            }
            Indicator.open({
                text: '邮箱发送中...',
                spinnerType: 'fading-circle'
            });
            this.sendEmail()
            .then((res) => {
                Indicator.close();
                if (0 === res.data.code) {                                                                                              
                    this.$router.push({path: '/borrow/details/confirm/email', query:{book_name: this.detailData.title,book_id: this.detailData.bookId, token: res.data.message/*验证码*/}});
                } else {
                    MessageBox({
                        title: '',
                        message: res.data.message,
                        confirmButtonText: '知道了'
                    })
                }
            })
            .catch((res) => {
                Indicator.close();
                MessageBox({
                    title: '',
                    message: '请求失败',
                    confirmButtonText: '知道了'
                });
            })
        },
        //喜欢操作
        like() {
            this.$axios.post('/api/user/like', {
                user_id: '22510',
                ISBN: this.detailData.ISBN
            })
            .then((res) => {
                if (0 === res.data.code) {
                    this.detailData.ifLike = 1;
                    this.detailData.likeAll += 1;
                }
                MessageBox({
                    title: '',
                    message: res.data.message,
                    confirmButtonText: '知道了'
                })
            })
        },
        //取消喜欢
        cancelLike() {
            this.$axios.delete('/api/user/like', {
                params: {
                    user_id: '22510',
                    ISBN: this.detailData.ISBN
                }
            })
            .then((res) => {
                if (0 === res.data.code) {
                    this.detailData.ifLike = 0;
                    this.detailData.likeAll -= 1;
                }
                MessageBox({
                    title: '',
                    message: res.data.message,
                    confirmButtonText: '知道了'
                })
            })
        },
        //验证码发送到邮箱
        sendEmail() {
            return this.$axios.get('/api/user/getVerification', {
                params: {
                    user_id: '22510'
                }
            })
        }
    },
    activated () {
        this.initData();
        this.selected ='summary';
        Promise.all([this.getDetail(), this.getComment()])
        .then((values) => {
            this.detailData = values[0].data;
            this.commentList = values[1].data.list;
        });
    }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 320px){
    .details-info {
        grid-template-columns: 90px 1fr 1fr;
        grid-template-rows: 45px 40px 40px 40px;
    }
}
@media screen and (min-width: 330px){
    .details-info {
        grid-template-columns: 120px 1fr 1fr;
        grid-template-rows: 45px 50px 50px 50px;
    }
}
// $img-width: 120px;
//     $img-height: 150px;
.details-wrapper {
    position: absolute;
    top:$height-40;
    left: 0;
    right: 0;
    bottom: $height-40;
    background-color: $White;
    display: flex;
    flex-direction: column;
    .details-info {
        display: grid;
        // grid-template-columns: ($img-width) 1fr 1fr;
        // grid-template-rows: 45px ($img-height/3) ($img-height/3) ($img-height/3);
        grid-column-gap: 20px;
        padding-left: 10px;
        align-items: center;
        font-size: 0.3704rem;
        .details-title {
            grid-column: 1 / 4;
            padding: 10px 5px;
            h1 {
                font-size: 0.5556rem;
            }
        }
        .details-image {
            grid-row: 2 / 5;
            position: relative;
            width: 100%; 
            height: 100%;
            img {
                // position: absolute;
                // left: 0;
                // top: 0;
                width: 100%; 
                height: 100%;
            }
        }
        .details-author {
            grid-column: 2 / 4;
        }
        .details-store {
            grid-column: 2 / 4;
        }
        .details-rating {
            color: $Red;
        }
        .details-like {
            button {
                color: $Red;
                font-size: 0.3704rem;
                border: none;
                box-shadow: none;
                background-color: transparent;
            }
        }
        .details-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            font-size: 0.3704rem;
            align-items: center;
            
        }
        
    }
    .present-comment {
        display: flex;
        flex: 1;
        flex-direction: column;
        .tab-bar-panel {
            position: relative;
            height: 54px;
            .tab-bar {
                background-image: none;
                background-color: $White;
                & > .mint-tab-item {
                    position: relative;
                    background-color: $White;
                    &::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 100%;
                        width: 0;
                        border-bottom: 3px solid $Web-Orange;
                        box-sizing: border-box;
                        transition: all .2s linear;
                    }
                }
                & > .is-selected {
                    color: $Web-Orange;
                    &::after {
                        left: 0 !important;
                        width: 100%; 
                    }
                }
                // &:first-child {
                //     &::after {
                //         left: 100%;
                //     }
                // }
            }
            .tab-label {
                height: $height-40;
                line-height: $height-40;
                font-size: 0.3704rem;
                .comment-num {
                    display: inline;
                    margin-left: 5px;
                }
            }
        }
        .book-list {
            flex: 1;
            overflow-y: auto;
            .mint-tab-container-wrap {
                height: 100%;
                .mint-tab-container-item {
                    padding: 0 15px;
                    box-sizing: border-box;
                    & > p {
                        text-indent: 2em;
                        word-break: normal;
                        display: block;
                        -webkit-margin-before: 1em;
                        -webkit-margin-after: 1em;
                        -webkit-margin-start: 0px;
                        -webkit-margin-end: 0px;
                        font: 0.2963rem Helvetica,Arial,sans-serif;
                        line-height: 1.62;
                    }
                }
            }
            
            .more_loading {
                color: $Oslo-Gray;
                display: flex;
                justify-content: center;
            }
        }
    }
}
.is-selected + .mint-tab-item::after {
    left: 0 !important;
}
.borrow-toolbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        .toolbar-button{
            padding: 0 0.2778rem;
            border-top: 1px solid $Mischka;
            border-left: 1px solid $Mischka;
            height: $height-40 ;
            background-color: $White;
            button {
                border: none;
                box-shadow: none;
                background-color: transparent;
                font-size: 0.3704rem;
            }
        }
        .borrow-mark {
            height: $height-40;
            line-height: $height-40;
            flex: 1;
            font-size: 0.463rem;
            text-align: center;
        }
    }
    .color-red {
        color: $Red;
    }
    .bg-enabled {
        background-color: $Dodger-Blue;
        color: $White;
    }
    .bg-disabled {
        background-color: $Wild-Sand;
        color: $Napa;
    }
</style>
