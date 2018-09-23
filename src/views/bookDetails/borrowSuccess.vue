<template>
    <div>
        <mt-header title='借书信息确认' fixed>
            <div slot='left'><mt-button icon="back" @click='back'>返回</mt-button></div>
        </mt-header>
        <div class='introduction-wrapper'>
            <div class='success'>
                <i class='el-icon-third-success'></i>
                <span>借阅成功!</span>
            </div>
            <section>
                <p>请于{{date}}日之前（一周内）到新大楼20楼XXX处领取您借的图书！逾期将自动取消借阅。</p>
            </section>
            <div class='button-wrapper'>
                <mt-button size="large" type="primary" @click='look'>去我的借阅看看</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    name: 'borrowSuccess',
    data() {
        return {
            date: moment().add(7, 'd').format('YYYY-MM-DD')
        }
    },
    methods: {
        //跳转到我的借阅页面
        look() {
            this.$router.push('/borrow');
        },
        back() {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
.introduction-wrapper {
    position: absolute;
    top: $height-40;
    left: 0;
    right: 0;
    border-top: 1px solid $Mischka;
    .success {
        display: flex;
        flex-direction: column;
        align-items: center;
        i {
            color: $Green;
            font-size: 1rem;
        }
        span {
            margin: 10px;
            font-size: 0.4815rem;
        }
    }
    section {
        margin: 20px 20px 0;
        text-align: center;
        p{
            line-height: 1.62;
        }
    }
    .button-wrapper {
        padding: 10px 0.9259rem;
    }
}
</style>
