<template>
    <ClientOnly>
        <div
            class="root" 
            @mouseenter="mouseEnterEventHandler" 
            @mouseleave="mouseLeaveEventHandler" 
            @dblclick="dblClickEventHandler"
        >
            <div class="container" v-if="GKSetsChildren.length != 0">
                <h1>{{ GKSetsChildren[currentWord].name }}</h1>
                <h2>
                    {{ GKSetsChildren[currentWord].part_of_speech + " " }}
                    {{ GKSetsChildren[currentWord].definition }}
                </h2>
            </div>
            <el-empty v-else description="No Data" />

            <el-drawer
                v-model="isDrawerOpen"
                title="Add new words"
                :before-close="handleDrawerClose"
                size="50%"
            >
                <span>Hi, there!</span>
            </el-drawer>

            <el-alert
                title="Double click to add words." 
                type="info"
                center
                show-icon 
                :closable="false" 
                v-show="isInfoAppear"
            />
        </div>
    </ClientOnly>
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
const isInfoAppear = ref(false)
const isDrawerOpen = ref(false)

interface GK {
    id: string | number,
    name: string,
    part_of_speech: string,
    definition: string,
}

let GKSetsChildren = reactive<GK[]>([])
watch(currentGKSet, (newValue) => {
    GKSetsChildren.length = 0
    for (let i = 0; i < GKSets.length; i++) {
        if (parseInt(GKSets[i].id as string) == newValue + 1) {
            if (GKSets[i].children) {
                GKSetsChildren.push(...GKSets[i].children!)
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

const keyEventHandler = (event: Event) => {
    let key = (event as KeyboardEvent).key
    if (key == "ArrowRight" || key == "ArrowDown") {
        currentWord.value ++
    } else if (key == "ArrowLeft" || key == "ArrowUp") {
        currentWord.value --
    }
}

const mouseEnterEventHandler = (event: Event) => {
    isInfoAppear.value = true
}
const mouseLeaveEventHandler = (event: Event) => {
    isInfoAppear.value = false
}
const dblClickEventHandler = (event: Event) => {
    isDrawerOpen.value = true
}
const handleDrawerClose = () => isDrawerOpen.value = false

onMounted(() => {
    document.addEventListener('keydown', keyEventHandler)

    $fetch('/api/word/hello').then(res => console.log(res))
    .catch(err => console.log("err" + err))
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

.el-alert {
    position: absolute;
    bottom: 0px;
}
</style>