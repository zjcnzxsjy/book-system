<template>
    <div>
        <mt-header title='想看描述' fixed>
        <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
        </mt-header>
        <div class='introduction-wrapper'>
            <mt-field label="书名" placeholder="请输入书名" v-model="name"></mt-field>
            <mt-field label="理由" 
            type="textarea" 
            rows="4" 
            placeholder="简单说明想看理由" 
            v-model="reason"
            :attr="{ maxlength: 40 }">
            </mt-field>
            <div class='limit'><span>{{limit}}</span>/40</div>
            <div class='button-wrapper'>
                <mt-button size="large" type="primary">提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import selfHeader from '@/components/header/index'
export default {
    name: 'existedBook',
    components: {
        selfHeader
    },
    data () {
        return {
            name: '',
            reason: ''
        }
    },
    computed: {
        limit () {
            return 40 - this.reason.length;
        }
    },
    methods: {
        back () {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
.introduction-wrapper {
    position: absolute;
    top: 45px;
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

