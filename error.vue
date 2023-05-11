<template>
    <div class="root">
        <h1>{{ props.error.statusCode + " " + props.error?.statusMessage }}</h1>
    </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
useDark()

const props = defineProps({
    error: Object
})

if (props.error.statusCode == 404) {
    // rediret
}
console.log(props.error)
</script>

<style scoped>
.root {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>