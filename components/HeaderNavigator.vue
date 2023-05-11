<template>
    <div class="navbar-wrapper">
        <el-container>
            <div class="user" @click="toggleLoginDialog = true">
                <div class="avatar">
                    <el-avatar :size="30" :src="fetchAvatar()"></el-avatar>
                </div>
                <div class="username">
                    <span>{{ getUsername() }}</span>
                </div>
            </div>
            <div class="content">
                <div class="toggleTheme">
                    <el-switch
                            inline-prompt
                            :active-icon="Moon"
                            :inactive-icon="Sunny"
                            v-model="isSwitched"
                    />
                </div>
            </div>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useDark } from '@vueuse/core'
import { useUserStore } from "~/stores/UserInfo";
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { toggleLoginDialog, currentProfile } = storeToRefs(userStore)
const userProfile = userStore.userProfile
const isSwitched = useDark()
const getUsername = (): string => {
    // do some ajax
    return currentProfile.value
}
const fetchAvatar = (): string => {
    // do some ajax
    let avatar: Ref<string | null> = ref("")
    for (let i=0; i<userProfile.length; i++) {
        if (userProfile[i].name == currentProfile.value) {
            if (userProfile[i].avatar != null) {
                avatar.value = userProfile[i].avatar
            }
        }
    }
    if (avatar.value == "") {
        return "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    } else {
        return avatar.value as string
    }
}
</script>

<style scoped>

.navbar-wrapper {
    position: relative;
    border-bottom: 1px solid var(--el-border-color);
    height: var(--header-height);
    background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    -webkit-backdrop-filter: saturate(50%) blur(4px);
    top: 0;
    padding: 0 12px 0 12px;
}

.el-container {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    height: 100%;
    width: 100%;
}

.user {
    display: flex;
    align-items: center;
    height: var(--header-height);
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
}

.user:hover {
    cursor: pointer;
}

.avatar {
    padding-right: 8px;
}

.content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
}

.toggleTheme {
    display: flex;
    align-items: center;
    position: relative;
}

label,
input {
    position: absolute;
    /*top: 20px;*/
    right: 40px;
}

label {
    width: 80px;
    height: 40px;
    display: block;
    background-color: #222;
    border-radius: 40px;
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.4), inset 0px -1px 3px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: 0.3s;
}

label:after {
    content: "";
    width: 28px;
    height: 28px;
    position: absolute;
    top: 6px;
    left: 6px;
    background: #eee;
    border-radius: 32px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

input {
    visibility: hidden;
}

input:checked + label {
    background-color: #eee;
}

input:checked + label::after {
    left: 78px;
    transform: translateX(-100%);
    background: #222;
}

label:active:after {
    width: 40px;
}

input:checked + label {
    background-color: #eee;
}

</style>