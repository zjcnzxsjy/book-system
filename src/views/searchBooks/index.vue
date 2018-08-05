<template>
    <div class='search-wrapper'>
        <self-header>
            <span slot='append' @click='cancel'>取消</span>
        </self-header>
        <div class='search-result'>
            搜索结果
        </div>
    </div>
</template>
<script>
import selfHeader from '@/components/header/index'
export default {
    name: 'search',
    components: {
        selfHeader
    },
    methods: {
        cancel() {
            this.$router.go(-1);
        }
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
</style>


