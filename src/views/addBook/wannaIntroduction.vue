<template>
    <div>
        <mt-header title='想看描述' fixed>
            <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
        </mt-header>
        <div class='introduction-wrapper'>
            <mt-field label="书名" placeholder="请输入书名" v-model="name" readonly></mt-field>
            <mt-field label="理由" 
            type="textarea" 
            rows="4" 
            placeholder="简单说明想看理由" 
            v-model="reason"
            :attr="{ maxlength: 40 }"
            @change='handleChange'>
            </mt-field>
            <div class='limit'><span>{{limit}}</span>/40</div>
            <div class='button-wrapper'>
                <mt-button size="large" type="primary" @click='submit'>提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import {MessageBox} from 'mint-ui';
export default {
    name: 'wannaIntroduction',  //想看描述
    data () {
        return {
            name: this.$route.query.book_name,
            reason: ''
        }
    },
    computed: {
        //评论限制40个字符
        limit () {
            return 40 - this.reason.length;
        }
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        //change事件回调
        handleChange (value) {
            this.reason = value;
        },
        submit () {
            this.$axios.post('/api/user/wannaIntroduction', {
                user_id: '22510',
                name: this.$route.query.book_name,
                reason: this.reason
            })
            .then((res) => {
                if (res.data.code === 0) {
                    MessageBox({
                        title: '',
                        message: '提交成功！<br/>我们会认真考虑您的需求，谢谢啦！',
                        confirmButtonText: '知道了'
                    })
                    .then(action => {
                        //跳转到想看页面
                        if ('confirm' === action) {
                            this.$router.push('/wannaSee');
                        }
                    })
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
    .limit {
        position: absolute;
        right: 0.0926rem;
        bottom: 65px;
    }
    .button-wrapper {
        padding: 10px 0.9259rem;
    }
}
</style>

