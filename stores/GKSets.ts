import { defineStore } from "pinia";
import { useLocalStorage } from '@vueuse/core';

export const useGKStore = defineStore('GKSets', () => {
    const currentGKSet = useLocalStorage("currentGKSet", 0)
    const updateCurrentGKSet = (i: number) => {
        currentGKSet.value = i
    }

    interface GKParagraph {
        id: string | number,
        name: string,
        children?: GK[]
    }
    interface GK {
        id: string | number,
        name: string,
        part_of_speech: string,
        definition: string,
    }

    // 每个Profile有每个不同的GKSets
    const GKSets: GKParagraph[] = [
        {id: "1", name: "GK Paragraph 1", children: [
            {
                id: "1",
                name: "hello", // not null
                definition: "used as a greeting when you meet sb, when you answer the telephone or when you want to attract sb's attention",
                part_of_speech: "noun.",
            },
            {
                id: "2",
                name: "world",
                definition: "456",
                part_of_speech: "noun.",
            },
        ]},
        {id: "2", name: "GK Paragraph 2", children: [
            {
                id: "1",
                name: "hello", // not null
                definition: "123",
                part_of_speech: "noun.",
            },
            {
                id: "2",
                name: "world",
                definition: "456",
                part_of_speech: "noun.",
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