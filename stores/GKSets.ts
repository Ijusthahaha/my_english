import { defineStore } from "pinia";

export const useGKStore = defineStore('GKSets', () => {
    const GKSets = [
        {id: "1", name: "GK Paragraph 1", children: [
                {
                    id: "1",
                    name: "hello",
                    eng_definition: null,
                    chn_definition: "你好"
                },
                {
                    id: "2",
                    name: "world",
                    eng_definition: "the earth, with all its countries, peoples and natural features",
                    chn_definition: null
                },
            ]},
        {id: "2", name: "GK Paragraph 2"},
        {id: "3", name: "GK Paragraph 3"},
        {id: "4", name: "GK Paragraph 4"},
        {id: "5", name: "GK Paragraph 5"}
    ]
    return {
        GKSets
    }
})