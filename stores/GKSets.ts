import { defineStore } from "pinia";
import { useLocalStorage } from '@vueuse/core';

export const useGKStore = defineStore('GKSets', () => {
    const currentGKSet = useLocalStorage("currentGKSet", 0)
    const updateCurrentGKSet = (i: number) => {
        currentGKSet.value = i
    }

    // 每个Profile有每个不同的GKSets
    const GKSets = [
        {id: "1", name: "GK Paragraph 1", children: [
            {
                id: "1",
                name: "hello", // not null
                definition: "123"
            },
            {
                id: "2",
                name: "world",
                definition: "456"
            },
        ]},
        {id: "2", name: "GK Paragraph 2", children: [
            {
                id: "1",
                name: "hello", // not null
                definition: "123"
            },
            {
                id: "2",
                name: "world",
                definition: "456"
            },
        ]},
        {id: "3", name: "GK Paragraph 3"},
        {id: "4", name: "GK Paragraph 4"},
        {id: "5", name: "GK Paragraph 5"}
    ]

    function updateGKSets() {
        console.log("updating...")
    }

    return {
        GKSets,
        currentGKSet,
        updateCurrentGKSet,
        updateGKSets
    }
})