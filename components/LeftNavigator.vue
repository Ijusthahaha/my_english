<template>
    <client-only>
        <el-scrollbar max-height="100%" class="sidebar">
            <el-menu :default-openeds="['1']" :default-active="`1-1`">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <MessageBox />
                        </el-icon>GK Paragraphs
                    </template>
                    <el-menu-item v-for="(gk, i) in GKSets" :key="gk.id" :index="`1-${(i+1).toString()}`" @click="updateCurrentGKSet(i)">
                        {{ gk.name }}
                    </el-menu-item>
                </el-sub-menu>

                <!-- <el-sub-menu index="2" v-if="isAdminProfile()">
                    <template #title>
                        <el-icon><Setting /></el-icon>Setting
                    </template>
                    <NuxtLink to="/settings/profile"><el-menu-item index="2-1">Option 1</el-menu-item></NuxtLink>
                </el-sub-menu> -->
            </el-menu>
        </el-scrollbar>
    </client-only>
</template>

<script lang="ts" setup>
import { MessageBox, Setting } from '@element-plus/icons-vue'
import { useGKStore } from "~/stores/GKSets";
import { useUserStore } from "~/stores/UserInfo"
const GKSets = useGKStore().GKSets
const currentGKSet = useGKStore().currentGKSet
const updateCurrentGKSet = useGKStore().updateCurrentGKSet
const userProfile = useUserStore().userProfile
const currentProfile = useUserStore().currentProfile
const isAdminProfile = useUserStore().isAdminProfile
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
    transition: background-color var(--el-transition-duration-fast), opacity .25s, transform .5s cubic-bezier(.19, 1, .22, 1);
}
a {
    text-decoration: none;
}
</style>