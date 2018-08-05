<template>
    <div>
        <mt-header title='添加想看图书' fixed>
            <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
        </mt-header>
        <div class='input-wrapper'>
            <self-input
            noBorderRadius
            placeholder='请输入书名'
            prefixIcon='el-icon-third-doubleleft'
            suffixIcon='el-icon-third-doubleright'
            v-model="input"></self-input>
            <div class='button-wrapper'>
                <mt-button size="large" type="primary" @click='next'>下一步</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import selfInput from '@/components/input/index'
export default {
    name: 'addBook',
    components: {
        selfInput
    },
    data () {
        return {
            input: ''
        }
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        next () {
            console.log(this.input)
            if (this.input === '') return;
            
        }
    }
}
</script>
<style lang="scss" scoped>
.input-wrapper{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    .button-wrapper {
        padding: 10px 0.9259rem;
    }
}

</style>



