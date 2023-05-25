<template>
    <div class="navbar-wrapper">
        <el-container>
            <div class="user" @click="toggleLoginDialog = true">
                <div class="avatar">
                    <el-avatar :size="30" :src="displayAvatar"></el-avatar>
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
                <div class="setting" @click="toggleSettingDialog = true">
                    <el-icon><Setting /></el-icon>
                </div>
            </div>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Moon, Sunny, Setting } from '@element-plus/icons-vue'
import { useDark } from '@vueuse/core'
import { useUserStore } from "~/stores/UserInfo";
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { toggleLoginDialog, toggleSettingDialog, currentProfile } = storeToRefs(userStore)
const userProfile = userStore.userProfile
const getUsername = userStore.getUsername
const isSwitched = useDark()

const fetchAvatar = (): string => {
    // do some ajax
    let avatar: Ref<string | null> = ref("")
    for (let i=0; i<userProfile.length; i++) {
        if (userProfile[i].id == currentProfile.value.toString()) {
            if (userProfile[i].avatar != null) {
                avatar.value = userProfile[i].avatar
                break
            } else {
                avatar.value = "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            }
        }
    }
    return avatar.value as string
}

let displayAvatar = ref<string>("https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png")
onMounted(() =>{
    displayAvatar.value = fetchAvatar()
    watch(() => userProfile[currentProfile.value].avatar, (newValue) => {
        if (newValue) {
            displayAvatar.value = newValue as string
        }
    })
    watch(currentProfile, () => {
        console.log(1)
        displayAvatar.value = fetchAvatar()
    })
})
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

.setting {
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 12px;
    font-size: 20px;
    cursor: pointer;
}

.setting :hover {
    color: var(--el-color-primary-dark-2);
}

</style>