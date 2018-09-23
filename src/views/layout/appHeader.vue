<template>
    <mt-header title='图书借阅' fixed>
        <div slot='left'><mt-button icon="back"></mt-button></div>
        <div slot='right'>
            <router-link to='/searchBooks' class='searchBooks'>
                <mt-button icon="search"></mt-button>
            </router-link>
            <router-link to='/wannaSee' class='wannaSee'>
                <span>想看</span>
            </router-link>
        </div>
    </mt-header>
</template>
<script>
export default {
    name: 'appHeader'
}
</script>
<style lang="scss" scoped>
.searchBooks {
    color: $White;
    font-size: 18px;
}
.wannaSee {
    color: $White;
    text-decoration: none;
    margin-left: 0.1481rem;
}
</style>




