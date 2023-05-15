<template>
    <div class="root">
        <div class="container" v-if="GKSetsChildren.length != 0">
            <h1>{{ GKSetsChildren[currentWord].name }}</h1>
            <h2>{{ GKSetsChildren[currentWord].definition }}</h2>
        </div>
        <el-empty v-else description="No Data" />
    </div>
</template>
  
<script lang="ts" setup>
import { useGKStore } from "~/stores/GKSets"
import { watch, onMounted } from "vue"
import { storeToRefs } from 'pinia'

const route = useRoute()
const GKStore = useGKStore()
const GKSets = GKStore.GKSets
const { currentGKSet } = storeToRefs(GKStore)
const currentWord = ref(0)

interface GK {
    id: string | number,
    name: string,
    children: GK[]
}

let GKSetsChildren = reactive<GK[]>([])
watch(currentGKSet, (newValue) => {
    GKSetsChildren.length = 0
    for (let i = 0; i < GKSets.length; i++) {
        if (parseInt(GKSets[i].id as string) == newValue + 1) {
            if (GKSets[i].children) {
                GKSetsChildren.push(...GKSets[i].children)
            }
        }
    }
    //! may need $forceupdate
    currentWord.value = 0
}, { immediate: true })

watch(currentWord, (newValue) => {
    if (newValue >= GKSetsChildren.length) {
        currentWord.value = 0
    }
    if (currentWord.value < 0) {
        currentWord.value = GKSetsChildren.length - 1
    }
})

const keyEventHandler = (event) => {
    if (event.key == "ArrowRight" || event.key == "ArrowDown") {
        currentWord.value ++
    } else if (event.key == "ArrowLeft" || event.key == "ArrowUp") {
        currentWord.value --
    }
}

onMounted(() => {
    document.addEventListener('keydown', keyEventHandler)
})
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

.container {
    width: 80%;
}

h1 {
    color: var(--el-text-color-primary);
    font-size: xxx-large;
    text-align: center;
}
h2 {
    color: var(--el-text-color-primary);
    font-size: x-large;
    text-align: center;
}
</style>