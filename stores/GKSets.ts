import { defineStore } from "pinia";
import { skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core';

export const useGKStore = defineStore('GKSets', () => {
    const currentGKSet = useLocalStorage("currentGKSet", 0)

    interface GKParagraph {
        id: string,
        name: string,
        children?: GK[]
    }
    interface GK {
        id: string,
        name: string,
        part_of_speech: string,
        definition: string,
    }

    // 每个Profile有每个不同的GKSets
    const GKSets = ref<GKParagraph[]>([
        {
            id: "1", name: "GK Paragraph 1", children: [
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
            ]
        },
        {
            id: "2", name: "GK Paragraph 2", children: [
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
            ]
        },
        { id: "3", name: "GK Paragraph 3", children: [] },
        {
            id: "4", name: "GK Paragraph 4", children: [{
                id: "1",
                name: "hello", // not null
                definition: "123",
                part_of_speech: "noun.",
            },]
        },
        { id: "5", name: "GK Paragraph 5" }
    ])

    const updateGKSet = (i: number) => {
        currentGKSet.value = i
    }
    const getGKSet = (i: number): string => {
        return GKSets.value[i].name
    }
    const deleteGKSet = (i: number) => {
        GKSets.value.splice(i, 1)
    }
    const getWordCount = (i: number): number => {
        if (!GKSets.value[i].children) return 0
        return GKSets.value[i]!.children!.length;
    }
    const renameGKSet = (i: number, name: string) => {
        GKSets.value[i].name = name
    }
    const moveGKSet = (i: number, profile: string) => {
        // TODO: complete this function
    }
    const addGKSet = (gk: string) => {
        GKSets.value.push({
            id: (parseInt(GKSets.value.at(-1)?.id as string) + 1).toString(),
            name: gk,
            children: []
        })
    }

    return {
        GKSets,
        currentGKSet: skipHydrate(currentGKSet),
        updateGKSet,
        getGKSet,
        moveGKSet,
        deleteGKSet,
        renameGKSet,
        getWordCount,
        addGKSet
    }
})