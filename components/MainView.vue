<template>
  <div class="root">
      <h2 v-if="GKSetsChildren.length == 0">{{ 1 }}</h2>
      <el-empty v-else description="No Data" />
  </div>
</template>

<script lang="ts" setup>
import { useGKStore } from "~/stores/GKSets"
import { watch } from "vue"
import { storeToRefs } from 'pinia'

const GKStore = useGKStore()
const GKSets = GKStore.GKSets
const { currentGKSet } = storeToRefs(GKStore)

let GKSetsChildren = []
watch(currentGKSet, (newValue) => {
  GKSetsChildren.length = 0
  for (let i=0; i<GKSets.length; i++) {
    if (parseInt(GKSets[i].id) == newValue + 1) {
      if (GKSets[i].children) {
        GKSetsChildren.push(...GKSets[i].children)
      }
    }
  }
  console.log(GKSetsChildren)
}, { immediate: true })

// let GKSetsChildren = []
// for (let i=0; i<GKSets.length; i++) {
//   if (parseInt(GKSets[i].id) == currentGKSet + 1) {
//     GKSetsChildren.push(...GKSets[i]?.children)
//   }
// }

</script>

<style scoped>
  .root {
      position: relative;
      top: calc(var(--header-height) / 2);
      height: calc(100% - var(--header-height) * 2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: 3px solid var(--el-color-primary-dark-2);
  }
  h2 {
      color: var(--el-text-color-primary);
  }
</style>