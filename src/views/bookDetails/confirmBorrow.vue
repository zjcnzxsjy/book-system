<template>
    <div>
        <mt-header title='借书信息确认' fixed>
            <div slot='left'><mt-button icon="back" @click='back'>返回</mt-button></div>
        </mt-header>
        <div class='introduction-wrapper'>
            <mt-field label="书名"  v-model="data.title" readonly></mt-field>
            <mt-field label="编号"  v-model="data.book_id" readonly></mt-field>
            <mt-field label="起始日期"  v-model="data.begin_date" readonly></mt-field>
            <mt-field label="还书日期"  v-model="data.end_date" readonly></mt-field>
            <mt-field label="支付押金" value='20经验值（还书并打分后自动退还）' readonly :disableClear='true'></mt-field>
            <div class='button-wrapper'>
                <mt-button size="large" type="primary" @click='confirm'>确认借书</mt-button>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    name: 'confirmBorrow',
    data() {
        return {
            data: {}
        }
    },
    created() {
        this.data = JSON.parse(this.$route.query.info);
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        confirm() {
            this.$axios.post('/api/user/borrow', {
                user_id: '22510',
                book_id: this.data.book_id
            })
            .then((res) => {
                if (0 === res.data.code) {
                    this.$router.push('borrow/details/status/success')
                }
                
            })
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
    .mint-field {
       border-bottom: 1px solid $Mischka;
       
    }
    .button-wrapper {
        padding: 10px 0.9259rem;
    }
}
</style>
