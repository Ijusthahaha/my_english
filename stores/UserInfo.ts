import { defineStore } from "pinia";
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('useUserStore', () => {
    let toggleLoginDialog: Ref<boolean> = ref(false)
    let toggleSettingDialog: Ref<boolean> = ref(false)
    let currentProfile = useLocalStorage("currentProfile", "Admin")
    let userProfile = reactive([
        {id: 0, name: "Default", avatar: "https://element-plus.org/images/element-plus-logo-small.svg", isAdmin: false},
        {id: 1, name: "Minecraft", avatar: null, isAdmin: false},
        {id: 2, name: "Admin", avatar: null, isAdmin: true}
    ])

    let userSetting = reactive({
        minecraft: false
    })

    function isAdminProfile (): boolean {
        for (let i=0; i<userProfile.length; i++) {
            if (userProfile[i].name == currentProfile.value) {
                return userProfile[i].isAdmin
            }
        }
        return false
    }

    return {
        toggleLoginDialog,
        toggleSettingDialog,
        userProfile,
        currentProfile,
        userSetting,
        isAdminProfile
    }
})