<template>
    <div>
        <div class='book-wrapper' v-for='(book, index) in data' :key='index'>
            <div class='book-photo'>
                <img :src='book.photoUrl' />
            </div>
            <div class='book-name'>
                <h1>{{book.name}}</h1>
            </div>
            <div class='book-author'>
                作者：{{book.author}}
            </div>
            <div class='book-store'>
                架上剩余：<span>{{book.store}} 本</span>
            </div>
            <div class='book-mark'>
                <span>{{book.mark}}</span> 分
            </div>
            <div>
                <mt-button class='el-icon-third-messageregular' size="small">{{book.comment}}</mt-button>
                
            </div>
            <div>
                <mt-button class='el-icon-third-heart' size="small">{{book.like}}</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bookList',
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
    display: grid;
    grid-template-columns: 100px 1fr 90px 90px;
    grid-template-rows: 30px 30px 30px 30px;
    color: $Oslo-Gray;
    align-items: center;
    background-color: $White;
    .book-photo {
        grid-row: 1 / 5;
        background-color: $White;
        padding: 0.1852rem;
        img {
            width: 80px;
            height: 100px;
        }
    }
    .book-name {
        grid-column: 2 / 5;
        h1 {
            color: $Black;
            font-size: 16px;
        }
    }
    .book-author {
        grid-column: 2 / 5;
    }
    .book-store {
        grid-column: 2 / 5;
        text-align: top;
        span {
            color: $Web-Orange;
        }
    }
    .book-mark {
        span {
            color: $Web-Orange;
            font-size: 16px;
        }
    }
    div button {
        border: none;
        box-shadow: none;
        background-color: transparent;
    }
    // .toolbar-button {
    //     text-align: left;
    //     button {
    //         border: none;
    //         box-shadow: none;
    //         background-color: transparent;
    //     }
    // }
}
</style>


