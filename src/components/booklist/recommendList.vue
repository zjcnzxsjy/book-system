<template>
    <keep-alive>
        <div>
            <div class='book-wrapper' v-for='(book, index) in data' :key='index'>
                <h5 class='book-title'>
                    {{book.name}}
                </h5>
                <div class='book-reason'>
                    理由：<span>{{book.reason}}</span>
                </div>
                <div class='book-toolbar'>
                    <span v-if='showRecommend' class='recommend'>推荐人 <span class='recmmend-name'>{{book.recommend}}</span></span>
                    <div class='toolbar-button'>
                        <mt-button class='el-icon-third-like' size="small" @click='like(index, $event)'>{{book.like}}</mt-button>
                        <em class='like'>+1</em>
                    </div>
                </div>
            </div>
        </div>
    </keep-alive>    
</template>
<script>
export default {
    name: 'recommendList',
    props:{
        data: {
            type: Array,
            default: []
        },
        showRecommend: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        like (index, $event) {
            this.$nextTick(() => {
                if(!this.data[index].isPraise) {
                    this.data[index].isPraise = true;
                    this.data[index].like += 1;
                    $event.target.classList.add('is-like');
                    $event.target.parentNode.querySelector('.like').classList.add('add-animation');
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.book-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
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
        margin-top: 10px;
        .recommend {
            padding-left: 0.2778rem;
            .recmmend-name {
                color: $Dodger-Blue;
            }
        }
        .toolbar-button{
            float: right;
            position: relative;
            button {
                border: none;
                box-shadow: none;
                background-color: transparent;
            }
            .like {
                color: $Web-Orange;
                position:absolute;
                top:-999px;
                left: 10px;
                font-size: 0.2778rem;
                opacity: 0;
                filter: Alpha(opacity=0);
                -moz-opacity:0;

            }
            .is-like {
                color: $Web-Orange;
            }
        }
    }
}
.add-animation {
    animation: mypraise 0.5s 1;
    -moz-animation: mypraise 0.5s 1;	/* Firefox */
    -webkit-animation: mypraise 0.5s 1;	/* Safari 和 Chrome */
    -o-animation: mypraise 0.5s 1;	/* Opera */
}
@keyframes mypraise
{
    0%{
        top:0px;
        opacity: 0;
        filter: Alpha(opacity=0);
        -moz-opacity:0;
    }
    25%{
        top:-10px;
        opacity: 0.5;
        filter: Alpha(opacity=50);
        -moz-opacity:0.5;
    }
    50%{
        top:-15px;
        opacity: 1;
        filter: Alpha(opacity=100);
        -moz-opacity:1;
    }
    75%{
        top:-20px;
        opacity: 0.5;
        filter: Alpha(opacity=50);
        -moz-opacity:0.5;
    }
    100% {
        top:-25px;
        opacity: 0;
        filter: Alpha(opacity=0);
        -moz-opacity:0;
    }
}
</style>


