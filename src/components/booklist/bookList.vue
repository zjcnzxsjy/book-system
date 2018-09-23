<template>
    <div class='book-list-wrapper'>
        <div class='book-photo'>
            <img :src='data.image' />
        </div>
        <div class='book-name'>
            <h1>{{data.title}}</h1>
        </div>
        <div class='book-author'>
            作者：{{data.author}}
        </div>
        <div class='book-store'>
            总共：<span>{{data.remain}} 本</span>
        </div>
        <div class='book-mark'>
            <span>{{data.scoreall}}</span> 分
        </div>
        <div>
            <mt-button class='el-icon-third-messageregular' size="small">{{data.commentall}}</mt-button>
        </div>
        <div>
            <mt-button class='el-icon-third-heart' size="small">{{data.wannaall}}</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bookList', //图书列表
    props: {
        data: Object
    }
}
</script>
<style lang="scss" scoped>
.book-list-wrapper {
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
        box-sizing: border-box;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
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


