<template>
    <div>
        <mt-header title='验证邮箱' fixed>
            <div slot='left'><mt-button icon="back" @click='back'>返回</mt-button></div>
        </mt-header>
        <div class='book-wrapper'>
            <section>
                <mt-header class='book-header'>
                    <div slot='left' class='header-name'>
                        <span>我们已向您的公司邮箱发送验证码，请在下方输入：</span>
                    </div>
                </mt-header>
                <mt-field label="验证码"  v-model="verification" placeholder='请输入验证码'></mt-field>
            </section>
            <div class='button-wrapper'>
                <mt-button size="large" type="primary" @click='confirm'>确认</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    name: 'confirmEmail',
    data() {
        return {
            verification: ''
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        confirm() {
            let token = this.$route.query.token;
            if (this.verification.toUpperCase() === token.toUpperCase()) {
                let obj = {
                    title: this.$route.query.book_name,
                    book_id: this.$route.query.book_id,
                    begin_date: moment().format('YYYY-MM-DD'),
                    end_date: moment().add(7, 'd').format('YYYY-MM-DD')
                }
                let info = JSON.stringify(obj);
                this.$router.push({path: 'borrow/details/confirm/borrow', query: {info: info}})
            } else {
                MessageBox({
                    title: '',
                    message: '验证码输入错误～<br/>要不要重新尝试一下？',
                    showCancelButton: true,
                    confirmButtonText: '重新输入',
                    cancelButtonText: '返回'
                })
                .then(action => {
                    if ('confirm' === action) {
                        this.verification = '';
                    } else {
                        this.$router.go(-1);
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.book-wrapper {
    position: absolute;
    top: $height-40;
    left: 0;
    right: 0;
    .book-header {
        background: transparent;
        border-bottom: 0.0185rem solid $Mischka;
        height: 30px;
        .header-name {
            height: 30px;
            line-height: 30px;
            color: $Web-Orange;
            font-size: 0.2222rem;
            padding-left: 0.0926rem;
        }
    }
    .button-wrapper {
        padding: 10px 0.9259rem;
    }
}
</style>
