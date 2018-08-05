<template>
    <mt-header title='图书借阅' fixed>
        <div slot='left'><mt-button icon="back"></mt-button></div>
        <div slot='right'>
            <router-link to='/searchBooks'>
                <mt-button icon="search"></mt-button>
            </router-link>
            <router-link to='/wantToSee'>
                <span style='margin-left: 0.1481rem;'>想看</span>
            </router-link>
        </div>
    </mt-header>
</template>
<script>
export default {
    name: 'appHeader',
    methods: {
        
    }
}
</script>



