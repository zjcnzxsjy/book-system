<template>
    <div>
        <mt-header title='图书详情' fixed>
            <div slot='left'><mt-button icon="back">返回</mt-button></div>
            <div slot='right'>
                <router-link to='/help'>
                    <mt-button icon="help"></mt-button>
                </router-link>
            </div>
        </mt-header>
        <div class='details-wrapper'>
            <div class='book-cover'>
                <img :src='data.coverUrl' />
            </div>
            <div class='book-info'>
                <div class='book-introduction'>
                    <div class='book-name'>{{data.name}}</div>
                    <div class='book-author'>作者：{{data.author}}</div>
                    <div>架上剩余：<span class='book-store'>{{data.store}}本</span></div>
                </div>
                <div class='book-toolbar'>
                    <span class='book-mark'>{{data.mark}}分</span>
                    <div class='toolbar-button'>
                        <mt-button class='el-icon-third-heart' size="small">{{data.heart}}</mt-button>
                    </div>
                </div>
            </div>
            <div class='present-comment'>
                <div class='tab-bar'> 
                    <mt-tabbar v-model="selected">
                        <mt-tab-item id='present'>
                            <span class='tab-label'>图示介绍</span>
                        </mt-tab-item>
                        <mt-tab-item id='comment'>
                            <span class='tab-label'>
                                图书评论<mt-badge type="error" class='comment-num'>10</mt-badge>
                            </span>
                        </mt-tab-item>
                    </mt-tabbar>
                </div>
                <mt-tab-container class='book-list' v-model='selected'>
                    <mt-tab-container-item id='present'>
                        111
                    </mt-tab-container-item>
                    <mt-tab-container-item id='comment'>
                        <comment-list :data='commentList'></comment-list>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
            <div class='borrow-toolbar'>
                <div class='toolbar-button'>
                    <mt-button class='el-icon-third-heart' size="small">喜欢</mt-button>
                </div>
                <div class='borrow-mark'>立即借阅</div>
            </div>
        </div>
    </div>
</template>
<script>
import commentList from '@/components/commentlist/index'
export default {
    name: 'bookDetails',
    components: {
        commentList
    },
    data () {
        return {
            data: {
                coverUrl: '/static/imgs/2669_wh1200.jpg',
                name: 'JavaScript高级程序设计',
                author: '王小丫',
                store: '2',
                mark: '9.3',
                heart: '143'
            },
            selected: 'present',
            present: [],
            commentList: [{
                photo: '/static/imgs/kz1namspnkp.jpg',
                name: '笑风',
                mark: 9.7,
                time: 1533187680663,
                content: '这本书内容很丰富，推荐!'
            },{
                photo: '/static/imgs/brjqtyojhx4.jpg',
                name: '迷糊的小孩',
                mark: 9.0,
                time: 1526282452000,
                content: '这本书非常棒！'
            }]
        }
    }
}
</script>
<style lang="scss" scoped>
.details-wrapper {
    position: absolute;
    top:40px;
    left: 0;
    right: 0;
    bottom: 40px;
    // display: flex;
    // flex-direction: column;
    overflow: auto;
    .book-cover {
        width: 100%;
        height: 0;
        padding-bottom: 61.8%;
        position: relative;
        img {
            position: absolute;
            left: 0; 
            top: 0; 
            width: 100%; 
            height: 100%;
        }
    }
    .book-info {
        display: flex;
        flex-direction: column;
        .book-introduction {
            color: $Shuttle-Gray;
            padding: 0.2778rem 5px;
            font-size: 0.2593rem;
            .book-name {
                font-weight: bold;
                font-size: 0.3333rem;
                color: $Black;
            }
            .book-store {
                color: $Web-Orange;
            }
            div {
                margin-top: 0.0926rem;
            }
        }
        .book-toolbar {
            height: 40px;
            line-height: 40px;
            margin-top: 5px;
            border-top: 1px solid $Mischka;
            border-bottom: 1px solid $Mischka;
            padding-left: 5px;
            .book-mark {
                color: $Web-Orange;
                font-size: 0.3704rem;
            }
            .toolbar-button{
                float: right;
                padding: 0 0.2778rem;
                border-left: 1px solid $Mischka;
                button {
                    border: none;
                    box-shadow: none;
                    background-color: transparent;
                }
            }
        }
    }
    .present-comment {
        padding-top: 10px;
        .tab-bar {
            position: relative;
            height: 54px;
            .tab-label {
                height: 40px;
                line-height: 40px;
                font-size: 0.3704rem;
                .comment-num {
                    display: inline;
                    margin-left: 5px;
                }
            }
        }

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
            height: 40px;
            button {
                border: none;
                box-shadow: none;
                background-color: transparent;
                font-size: 0.3704rem;
                color: $Red;
            }
        }
        .borrow-mark {
            height: 40px;
            line-height: 40px;
            flex: 1;
            background-color: $Red;
            font-size: 0.463rem;
            text-align: center;
            color: $White;
        }
    }
}

</style>

