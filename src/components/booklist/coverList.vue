<template>
    <div>
        <div class='book-wrapper' v-for='(book, index) in data' :key='index'>
            <div class='book-cover'>
                <img :src='book.coverUrl' />
            </div>
            <div class='book-info'>
                <div class='book-introduction'>
                    <div class='book-name'>{{book.name}}</div>
                    <div class='book-author'>作者：{{book.author}}</div>
                    <div>架上剩余：<span class='book-store'>{{book.store}}本</span></div>
                </div>
                <div class='book-toolbar'>
                    <span class='book-mark'>{{book.mark}}</span>
                    <div class='toolbar-button'>
                        <mt-button class='el-icon-third-messageregular' size="small">{{book.comment}}</mt-button>
                        <mt-button class='el-icon-third-heart' size="small">{{book.like}}</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class='book-wrapper no-data' v-if='data.length === 0'>暂无数据</div> -->
    </div>
</template>
<script>
export default {
    name: 'coverList',
    props: {
        data: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="scss" scoped>
.book-wrapper {
    display: flex;
    border-bottom: 0.0185rem solid $Mischka;
    background-color: $White;
    .book-cover {
        padding: 0.1852rem;
        display: flex;
        align-items: center;
       img{
           height: 109px;
           width: 79px;
           background-color: $White;
       }
    }
    .book-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0.2778rem 5px;
        .book-introduction {
            flex: 1;
            color: $Shuttle-Gray;
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
            height: 35px;
            line-height: 32px;
            .book-mark {
                color: $Web-Orange;
                font-size: 0.3704rem;
            }
            .toolbar-button{
                float: right;
                button {
                    border: none;
                    box-shadow: none;
                    background-color: transparent;
                }
            }
        }
    }
}
// .no-data {
//     justify-content: center;
//     align-items: center;
//     color: #656b79;
//     padding: 0.5556rem;
// }
</style>


