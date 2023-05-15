<template>
    <div class="root">
        <h1>{{ props.error.statusCode + " " + props.error?.statusMessage }}</h1>
        <h2 v-if="props.error.statusCode == 404">{{ msg }}</h2>
    </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
useDark()

const props = defineProps({
    error: Object
})

console.log(props.error.statusCode + " " + props.error?.statusMessage)

let msg = ref("")

if (props.error.statusCode == 404) {
    if (process.client) {
        let second = 5
        const interval = setInterval(() => {
            if (second <= 1) {
                clearInterval(interval)
                navigateTo('/')
            }

            if (second != 1) {
                msg.value = "Redirect in " + second + " seconds."
            } else {
                msg.value = "Redirect in " + second + " second."
            }

            second = second - 1
        }, 1000);
    }
}
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