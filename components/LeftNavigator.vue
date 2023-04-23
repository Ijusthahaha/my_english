<template>
    <client-only>
        <el-scrollbar max-height="100%" class="sidebar">
            <el-menu :default-openeds="['1']">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><MessageBox /></el-icon>GK Paragraphs
                    </template>
                    <el-menu-item
                        v-for="(gk, i) in GKSets" :key="gk.id"
                        :index="i.toString()">
                        {{gk.name}}
                    </el-menu-item>
                </el-sub-menu>
<!--                <el-sub-menu index="2">-->
<!--                    <template #title>-->
<!--                        <el-icon><icon-menu /></el-icon>Navigator Two-->
<!--                    </template>-->
<!--                    <el-menu-item-group>-->
<!--                        <template #title>Group 1</template>-->
<!--                        <el-menu-item index="2-1">Option 1</el-menu-item>-->
<!--                        <el-menu-item index="2-2">Option 2</el-menu-item>-->
<!--                    </el-menu-item-group>-->
<!--                    <el-menu-item-group title="Group 2">-->
<!--                        <el-menu-item index="2-3">Option 3</el-menu-item>-->
<!--                    </el-menu-item-group>-->
<!--                    <el-sub-menu index="2-4">-->
<!--                        <template #title>Option 4</template>-->
<!--                        <el-menu-item index="2-4-1">Option 4-1</el-menu-item>-->
<!--                    </el-sub-menu>-->
<!--                </el-sub-menu>-->
<!--                <el-sub-menu index="3">-->
<!--                    <template #title>-->
<!--                        <el-icon><setting /></el-icon>Navigator Three-->
<!--                    </template>-->
<!--                    <el-menu-item-group>-->
<!--                        <template #title>Group 1</template>-->
<!--                        <el-menu-item index="3-1">Option 1</el-menu-item>-->
<!--                        <el-menu-item index="3-2">Option 2</el-menu-item>-->
<!--                    </el-menu-item-group>-->
<!--                    <el-menu-item-group title="Group 2">-->
<!--                        <el-menu-item index="3-3">Option 3</el-menu-item>-->
<!--                    </el-menu-item-group>-->
<!--                    <el-sub-menu index="3-4">-->
<!--                        <template #title>Option 4</template>-->
<!--                        <el-menu-item index="3-4-1">Option 4-1</el-menu-item>-->
<!--                    </el-sub-menu>-->
<!--                </el-sub-menu>-->
            </el-menu>
        </el-scrollbar>
    </client-only>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, MessageBox, Setting } from '@element-plus/icons-vue'
import { useGKStore } from "~/stores/GKSets";
const GKSets = useGKStore().GKSets
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: var(--header-height);
    bottom: 0;
    left: 0;
    z-index: var(--sidebar-z-index);
    width: calc(var(--vp-sidebar-width-small));
    overflow-y: auto;
    /*transform: translate(100%);*/
    transition: background-color var(--el-transition-duration-fast),opacity .25s,transform .5s cubic-bezier(.19,1,.22,1);
}
</style>