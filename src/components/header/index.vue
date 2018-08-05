<template>
    <div class='header-wrapper'>
        <!-- 前置元素 -->
        <div class="header-button is-prepend">
            <slot name="prepend"></slot>
        </div>
        <self-input 
        class='search-input' 
        placeholder='请输入内容' 
        prefixIcon='el-icon-third-search'
        clearable></self-input>
        <!-- 后置元素 -->
        <div class="header-button is-append">
            <slot name="append"></slot>
        </div>
    </div>
</template>
<script>
import selfInput from '@/components/input/index'
export default {
    name: 'selfHeader',
    components: {
        selfInput
    }
}
</script>
<style lang="scss" scoped>
.search-wrapper {
    display: flex;
    flex-direction: column;
    .search-panel {
        display: flex;
        background-color: $Dodger-Blue;
        padding: 0.2778rem 10px;
        align-items: center;
        .search-input {
            flex: 1;
        }
        .cancel {
            display: inline-block;
            width: 0.7407rem;
            margin-left: 0.2778rem;
        }
    }
    .search-result {
        flex: 1;
    }
}
.header-wrapper {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: $Dodger-Blue;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: $White;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 14px;
    height: 40px;
    line-height: 1;
    padding: 0 10px;
    position: relative;
    text-align: center;
    white-space: nowrap;
    .search-input {
        flex: 1
    }
    .header-button {
        width: 30px;
        text-align: center;
    }
    .is-prepend {
        margin-right: 0.2778rem;
    }
    .is-append {
        margin-left: 0.2778rem;
    }
}
</style>


