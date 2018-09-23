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
    name: 'addBook', //添加想看图书
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
            if (this.input === '') return;
            this.addWannaBook()
            .then((res) => {
                if (1 === res.data.code) {
                    //无人推荐过,跳转到添加页面
                    this.$router.push({path: '/wannaSee/addBook/addedBook/wannaIntroduction', query: {book_name: this.input}});
                    //0:架上相似 1:推荐相似
                } else if(0 === res.data.search || 1 === res.data.search) {
                    //架上已有相似书名书籍列表或者推荐列表已有类似书名列表
                    this.$router.push({path: '/wannaSee/addBook/addedBook', query: {book_name: this.input}});
                }
            })
        },
        addWannaBook () {
            return this.$axios.get('/api/user/ifCanIntroduction', {
                params: {
                    user_id: '22510',
                    name: this.input
                }
            });
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



