import { defineStore } from "pinia";
import { skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { Ref } from "vue";

export const useUserStore = defineStore('useUserStore', () => {
    let toggleLoginDialog: Ref<boolean> = ref(false)
    let toggleSettingDialog: Ref<boolean> = ref(false)
    let currentProfile: Ref<number> = useLocalStorage("currentProfile", 0)

    interface Profile {
        id: string,
        name: string,
        avatar: string | null,
        isAdmin: boolean
    }
    let userProfile = reactive<Profile[]>([
        {id: '0', name: "Default", avatar: "https://element-plus.org/images/element-plus-logo-small.svg", isAdmin: false},
        {id: '1', name: "Minecraft", avatar: null, isAdmin: false},
        {id: '2', name: "Admin", avatar: null, isAdmin: true}
    ])

    const getUsername = (): string => {
        let name = ''
        for (let j=0; j<userProfile.length; j++) {
            if (parseInt(userProfile[j].id) == currentProfile.value) {
                name = userProfile[j].name
                break
            }
        }
        if (name == '') {
            currentProfile.value = 0
            name = userProfile[0].name
        }
        return name
    }
    const getUsernameById = (n: number): string => {
        let name = ''
        for (let j=0; j<userProfile.length; j++) {
            if (parseInt(userProfile[j].id) == n) {
                name = userProfile[j].name
                break
            }
        }
        if (name == '') {
            currentProfile.value = 0
            name = userProfile[0].name
        }
        return name
    }
    const updateCurrentProfile = (name: string) => {
        for (let i=0; i<userProfile.length; i++) {
            if (userProfile[i].name == name) {
                currentProfile.value = parseInt(userProfile[i].id)
            }
        }
    }

    const isAdminProfile = (): boolean => {
        for (let i=0; i<userProfile.length; i++) {
            if (userProfile[i].name == getUsername()) {
                return userProfile[i].isAdmin
            }
        }
        return false
    }
    const updateUsername = (profile: string, name: string) => {
        for (let i=0; i<userProfile.length; i++) {
            if (userProfile[i].id == profile) {
                userProfile[i].name = name
                break
            }
        }
    }
    const updateAvatar = (profile: string, blob: File) => {
        const url = URL.createObjectURL(blob)
        for (let i=0; i<userProfile.length; i++) {
            if (userProfile[i].id == profile) {
                userProfile[i].avatar = url
                break
            }
        }
    }

    const newProfile = (name: string) => {
        userProfile.push({
            id: (parseInt(userProfile.at(-1)?.id as string) + 1).toString(),
            name: name,
            avatar: null,
            isAdmin: false
        })
    }

    return {
        toggleLoginDialog,
        toggleSettingDialog,
        userProfile,
        currentProfile: skipHydrate(currentProfile),
        isAdminProfile,
        updateUsername,
        getUsername,
        getUsernameById,
        updateCurrentProfile,
        updateAvatar
    }
})