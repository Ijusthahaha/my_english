<template>
    <div class="common-layout">
        <el-container>
            <el-header class="navbar">
                <header-navigator></header-navigator>
            </el-header>
            <el-container>
                <el-aside width="210px">
                    <LeftNavigator></LeftNavigator>
                </el-aside>
                <el-main>
                    <MainView></MainView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>

import MainView from "~/components/MainView.vue";
import HeaderNavigator from "~/components/HeaderNavigator.vue";
</script>

<style scoped>
.common-layout {
    height: 100vh;
    width: 100%;
}
.el-main {
    min-height: 100vh;
}
.navbar {
    position: sticky;
    top: 0;
    left: 0;
    z-index: var(--nav-z-index);
    height: 100%;
}
</style>