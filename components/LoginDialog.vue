<template>
    <client-only>
        <el-dialog v-model="toggleLoginDialog" title="Login" append-to-body align-center :before-close="onDialogClose">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="Login profile: " prop="profile" required>
                    <el-select v-model="form.profile as string" placeholder="Select Profile">
                        <el-option v-for="profile in userProfile" :key="profile.id" :label="profile.name" :value="profile.name" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Enter</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </client-only>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useGKStore } from "~/stores/GKSets"
import { useUserStore } from "~/stores/UserInfo";
import { ReactiveVariable } from "vue/macros";

const GKSets = useGKStore()
const userStore = useUserStore()
let { toggleLoginDialog, currentProfile } = storeToRefs(userStore)
let userProfile = userStore.userProfile
const onDialogClose = (done: () => void) => {
    toggleLoginDialog.value = false
    done()
}

let form: ReactiveVariable<{ profile: string }> = reactive({
    profile: ''
})
const onSubmit = () => {
  // do some ajax
  if (form.profile && form.profile != currentProfile.value) {
    currentProfile.value = form.profile
  }
  toggleLoginDialog.value = false

  // update GKSets
  GKSets.updateGKSets()
}
</script>

<style scoped>
.reg {
    color: var(--el-text-color-primary);
}
</style>