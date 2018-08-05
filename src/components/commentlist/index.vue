<template>
    <div>
        <div class='comment-wrapper' v-for='(item, index) in data' :key='index'>
            <div class='comment-user-item'>
                <img :src='item.photo' class='comment-user-image'/>
            </div>
            <div class='comment-user-name'><span>{{item.name}}</span></div>
            <div class='comment-user-mark'><span>{{item.mark}}</span>分</div>
            <div class='comment-time'>{{item.time | dateFormate}}</div>
            <div class='comment-content'>{{item.content}}</div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'commentList',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    filters: {
        dateFormate(value) {
            moment.locale('zh-cn');
            return moment(value).fromNow();
        }
    }
}
</script>
<style lang="scss" scoped>
.comment-wrapper {
    display: grid;
    grid-template-columns: 60px 1fr 1fr;
    grid-template-rows: 30px 30px 30px;
    align-items: center;
    border-top: 1px solid $Mischka;
    grid-column-gap: 5px;
    .comment-user-name {
        font-size: 18px;
        font-weight: bold;
    }
    .comment-user-mark {
        text-align: right;
        padding-right: 0.1852rem;
        span {
            color: $Red;
            font-size: 18px;
        }
    }
    .comment-user-item {
        grid-row: 1 / 3;
        .comment-user-image {
            width: 60px;
            height: 60px;
        }
    }
    .comment-content {
        grid-column: 2 / 4;
    }
}
</style>


