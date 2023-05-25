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
          <el-menu-item v-for="(gk, i) in GKSets" :key="gk.id" :index="`1-${(i + 1).toString()}`"
            @click="updateCurrentGKSet(i)" @contextmenu="onContextMenu($event, i)">
            <span class="gk-name">{{ gk.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>Settings</span>
          </template>
          <el-menu-item index="2-1" @click="toggleAddGKDialog = true">Add Paragraph</el-menu-item>
          <el-menu-item index="2-2" disabled>Set Paragraph readonly</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>

    <el-dialog v-model="toggleAddGKDialog" title="Create new paragraph" align-center>
        <el-form :inline="true" :model="paragraphForm" @submit.prevent>
            <el-form-item label="Paragraph name: " required>
              <el-input v-model="paragraphForm.gk" placeholder="GK Paragraph's name" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addGKSet(paragraphForm.gk) ;toggleAddGKDialog = false">Enter</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog v-model="toggleMoveDialog" title="Move to" align-center>
        <el-form :inline="true" :model="moveForm" @submit.prevent>
            <el-form-item label="Select Profile: " required>
                <el-select v-model="moveForm.profile as string" placeholder="Select Profile">
                    <el-option v-for="profile in userProfile" :key="profile.id" :label="profile.name" :value="profile.name" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="moveGKSet(currentActiveItem as number, moveForm.profile); toggleMoveDialog = false">Enter</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog v-model="toggleRenameDialog" align-center title="Rename GK Paragraph">
      <el-form :inline="true" :model="renameForm" @submit.prevent>
        <el-form-item>
          <el-input v-model="renameForm.name" placeholder="GK Paragraph's name" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="renameGKSet(currentActiveItem as number, renameForm.name); toggleRenameDialog = false;">Rename</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog v-model="toggleDeleteDialog" title="Warning" width="30%" align-center :show-close="false">
      <p>Are you sure you want to delete this GK Paragraph?</p>
      <p>'{{ currentGKSet }}' will be lost forever! (A long time!)</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" plain @click="deleteGKSet(currentActiveItem as number); updateAfterDelete(); toggleDeleteDialog = false">
            Delete
          </el-button>
          <el-button @click="toggleDeleteDialog = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-if="currentActiveItem != -1" v-model="togglePropertiesDialog" :title="getName(currentActiveItem as number) + '\'s info'" align-center>
      <el-descriptions>
        <el-descriptions-item label="Name">{{ getName(currentActiveItem) }}</el-descriptions-item>
        <el-descriptions-item label="Location">{{ currentProfile }}</el-descriptions-item>
        <el-descriptions-item label="Word Count">{{ getWordCount(currentActiveItem as number).toString() + " " + (getWordCount(currentActiveItem as number) == 1 ? "word" : "words") }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { MessageBox, Setting } from '@element-plus/icons-vue'
import { useGKStore } from "~/stores/GKSets";
import { useUserStore } from "~/stores/UserInfo"
import ContextMenu from '@imengyu/vue3-context-menu'

const toggleMoveDialog = ref(false)
const toggleDeleteDialog = ref(false)
const togglePropertiesDialog = ref(false)
const toggleRenameDialog = ref(false)
const toggleAddGKDialog = ref(false)
const paragraphForm = reactive({
  gk: ""
})
const moveForm = reactive({
  profile: ""
})
const renameForm = reactive({
  name: ""
})

let userProfile = useUserStore().userProfile
const GKSets = useGKStore().GKSets
const getName = useGKStore().getGKSet
const addGKSet = useGKStore().addGKSet
const moveGKSet = useGKStore().moveGKSet
const updateCurrentGKSet = useGKStore().updateGKSet
const deleteGKSet = useGKStore().deleteGKSet
const renameGKSet = useGKStore().renameGKSet
const getWordCount = useGKStore().getWordCount

const currentProfile = useUserStore().currentProfile

const currentActiveItem = ref(0)
const currentGKSet = ref('')

const updateAfterDelete = () => {
  currentActiveItem.value--
}
const onContextMenu = (e: MouseEvent, index: number) => {

  e.preventDefault();
  currentActiveItem.value = index
  // console.log("current: " + currentActiveItem.value)

  ContextMenu.showContextMenu({
    theme: usePreferredDark()? "default dark" : "default",
    x: e.x,
    y: e.y,
    items: [
      {
        label: "Move to",
        divided: true,
        disabled: true,
        onClick: () => {
          currentGKSet.value = getName(currentActiveItem.value)
          toggleDeleteDialog.value = true
        }
      },
      {
        label: "Rename",
        onClick: () => {
          currentGKSet.value = getName(currentActiveItem.value)
          toggleRenameDialog.value = true
        }
      },
      {
        label: "Delete",
        divided: true,
        onClick: () => {
          currentGKSet.value = getName(currentActiveItem.value)
          toggleDeleteDialog.value = true
        }
      },
      {
        label: "Properties",
        onClick: () => {
          currentGKSet.value = getName(currentActiveItem.value)
          togglePropertiesDialog.value = true
        }
      }
    ]
  })
}
</script>

<style scoped>
.sidebar {
  width: calc(100% - (100% - 210px));
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  overflow-y: auto;
  /*transform: translate(100%);*/
  transition: background-color var(--el-transition-duration-fast), opacity .25s, transform .5s cubic-bezier(.19, 1, .22, 1);
}

.el-sub-menu .el-menu-item {
  height: var(--el-menu-item-height);
}

.gk-name {
  text-align: center;
}

a {
  text-decoration: none;
}

</style>