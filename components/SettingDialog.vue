<template>
  <client-only>
    <el-dialog v-model="toggleSettingDialog" title="Settings" :show-close="false" append-to-body align-center
      :before-close="onDialogClose">
      <el-form :model="form" @submit.prevent>
        <el-form-item label="Rename profile name: ">
          <el-input v-model="form.name" placeholder="Profile name" />
        </el-form-item>
        <el-form-item label="Profile picture: ">
          <div class="avatar">
            <el-avatar shape="square" :size="30" :src="displayAvatar"></el-avatar>
          </div>

          <el-upload ref="uploadRef" action="" accept=".bmp,.png,.jpg,.jpeg,.webp,.gif,.svg" :on-change="updateFileList"
            :show-file-list="false" :auto-upload="false" :headers="{
              'Content-Type': 'multipart/form-data'
            }">
            <el-button type="primary">Click to upload picture</el-button>
          </el-upload>
        </el-form-item>

        <!-- <el-form-item label="Profile picture: ">
                    
                </el-form-item> -->

        <!-- <el-form-item label="Profile name: ">
                    <el-input v-model="form.name" placeholder="Profile name" />
                </el-form-item>
                <el-form-item label="Profile name: " required>
                    <el-input v-model="form.name" placeholder="Profile name" />
                </el-form-item> -->

      </el-form>

      <el-button type="primary" @click="submitForm(); toggleSettingDialog = false">Enter</el-button>
      <el-button @click="toggleSettingDialog = false">Cancel</el-button>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useGKStore } from "~/stores/GKSets"
import { useUserStore } from "~/stores/UserInfo";
import type { UploadUserFile, UploadFile, UploadFiles } from 'element-plus'

const GKSets = useGKStore()
const userStore = useUserStore()
let { toggleSettingDialog, currentProfile } = storeToRefs(userStore)
let userProfile = userStore.userProfile
let getUsername = userStore.getUsername
let updateUsername = userStore.updateUsername
let updateAvatar = userStore.updateAvatar

let form = reactive({
  name: '',
})

const onDialogClose = (done: () => void) => {
  toggleSettingDialog.value = false
  done()
}
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

let displayAvatar = ref<string>(fetchAvatar())

let fileList: UploadUserFile[] = []
const updateFileList = (file: UploadFile, _fileList: UploadFiles) => {
  const url = URL.createObjectURL(file.raw as File)
  displayAvatar.value = url

  fileList[0] = file
}

const submitForm = () => {
  if (form.name != '') {
    let username: string[] = []
    userProfile.forEach((v) => {
      username.push(v.name)
    })
    if (!username.includes(form.name)) {
      updateUsername(currentProfile.value.toString(), form.name)
    }
  }
  if (fileList.length != 0) {
    let params = new FormData()
    params.append("file", fileList[0].raw as File)
    // axios.post("", params).then()
    
    updateAvatar(currentProfile.value.toString(), fileList[0].raw as File)
  }
}

</script>

<style scoped>
.el-avatar {
  margin-right: 4px;
}

.el-avatar {
  display: flex;
  justify-content: center;
}
</style>