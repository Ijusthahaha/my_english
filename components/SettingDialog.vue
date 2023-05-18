<template>
    <client-only>
        <el-dialog v-model="toggleSettingDialog" title="Settings" append-to-body align-center :before-close="onDialogClose">
            
        </el-dialog>
    </client-only>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useGKStore } from "~/stores/GKSets"
import { useUserStore } from "~/stores/UserInfo";

const GKSets = useGKStore()
const userStore = useUserStore()
let { toggleSettingDialog, currentProfile } = storeToRefs(userStore)
let userProfile = userStore.userProfile
const onDialogClose = (done: () => void) => {
    toggleSettingDialog.value = false
    done()
}
</script>

<style scoped>

</style>