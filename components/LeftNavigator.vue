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
            {{ gk.name }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>

    <el-dialog v-model="toggleRenameDialog" align-center title="Rename GK Paragraph">
      <el-form :inline="true" :model="renameForm">
        <el-form-item>
          <el-input v-model="renameForm.name" placeholder="GK Paragraph's name" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitRename">Rename</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog v-model="toggleDeleteDialog" title="Warning" width="30%" align-center :show-close="false">
      <p>Are you sure you want to delete this GK Paragraph?</p>
      <p>'{{ currentGKSet }}' will be lost forever! (A long time!)</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" plain @click="deleteGKSet(currentActiveItem); toggleDeleteDialog = false">
            Delete
          </el-button>
          <el-button @click="toggleDeleteDialog = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="togglePropertiesDialog" :title="getName(currentActiveItem) + '\'s info'" align-center>
      <el-descriptions>
        <el-descriptions-item label="Name">{{ getName(currentActiveItem) }}</el-descriptions-item>
        <el-descriptions-item label="Location">{{ currentProfile }}</el-descriptions-item>
        <el-descriptions-item label="Word Count">{{ getWordCount(currentActiveItem).toString() + " " + (getWordCount(currentActiveItem) == 1 ? "word" : "words") }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { MessageBox } from '@element-plus/icons-vue'
import { useGKStore } from "~/stores/GKSets";
import { useUserStore } from "~/stores/UserInfo"
import ContextMenu from '@imengyu/vue3-context-menu'

const toggleDeleteDialog = ref(false)
const togglePropertiesDialog = ref(false)
const toggleRenameDialog = ref(false)
const renameForm = reactive({
  name: ""
})

const GKSets = useGKStore().GKSets
const getName = useGKStore().getGKSet
const updateCurrentGKSet = useGKStore().updateGKSet
const deleteGKSet = useGKStore().deleteGKSet
const getWordCount = useGKStore().getWordCount

const currentProfile = useUserStore().currentProfile

const currentActiveItem = ref(0)
const currentGKSet = ref('')

const onSubmitRename = () => {

}
const onContextMenu = (e: MouseEvent, index: number) => {
  //prevent the browser's default menu
  e.preventDefault();
  currentActiveItem.value = index
  console.log("current: " + currentActiveItem.value)
  //show your menu
  ContextMenu.showContextMenu({
    theme: localStorage.getItem("vueuse-color-scheme") == "dark" ? "default dark" : "default",
    x: e.x,
    y: e.y,
    items: [
      {
        label: "Move to",
        divided: true,
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
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  overflow-y: auto;
  /*transform: translate(100%);*/
  transition: background-color var(--el-transition-duration-fast), opacity .25s, transform .5s cubic-bezier(.19, 1, .22, 1);
}

a {
  text-decoration: none;
}

p {
  font-family: 'Monocraft';
}
</style>