import { useUserStore } from "~/stores/UserInfo"
const isAdminProfile = useUserStore().isAdminProfile

export default defineNuxtRouteMiddleware((to, from) => {
    console.log(1)
    // isAuthenticated() is an example method verifying if a user is authenticated
    if (isAdminProfile() === false) {
        return navigateTo('/')
    }
})