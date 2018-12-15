<template>
    <div :is="navMenus.children?'el-submenu':'el-menu-item'" :key="navMenus.id" :data="navMenus" :index="navMenus.id">
        <template slot="title">
            <!--<i v-if="navMenus.children || navMenus.icon" :class="navMenus.icon?navMenus.icon:'el-icon-tickets'"></i>-->
            <Icon v-if="navMenus.children || navMenus.icon" :name="navMenus.icon?navMenus.icon:'el-icon-tickets'" :w="16" :h="16"/>
            <span> {{navMenus.title}}</span>
        </template>
        <LpMenu v-if="navMenus.children" v-for="item in navMenus.children" :navMenus="item"></LpMenu>
    </div>
</template>

<script>
    export default {
        name: 'LpMenu',
        props: ['navMenus'],
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>

</style>
