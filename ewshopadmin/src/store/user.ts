import {defineStore} from 'pinia'
import {login, user} from "@/api/user";
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。

export interface IUserState {
    token: string,
    username: string,
    avatar: string,
    permissions: string[],
    info: object
}

export const useUserStore = defineStore('app-user', {
    state: (): IUserState => {
        return {
            token: localStorage.getItem('token') || '',
            username: '',
            avatar: '',
            permissions: [],
            info: {}
        }
    },
    getters: {
        getToken(state): string {
            window.localStorage.setItem('token', state.token)
            console.log(state.token)
            return state.token;
        },
        getAvatar (state): string {
            return state.avatar;
        },
        getUsername (state): string {
            return state.username;
        },
        getPermissions (state): string[] {
            return state.permissions;
        },
        async getInfo(state): object {
            //判断 this.info 是否为空
            if (!state.info?.id){
                this.getUser()
            }
            return state.info;
        }
    },
    actions: {
        setToken:function (token: string) {
            this.token = token;
        },
        setAvatar:function (avatar: string) {
            this.avatar = avatar;
        },
        setUsername:function (username: string) {
            this.username = username;
        },
        setPermissions:function (permissions: string[]) {
            this.permissions = permissions;
        },
        setInfo:function (info: object) {
            this.info = info;
        },
        async login(userinfo: object) {
            try {
                const res = await login(userinfo)
                if (res.access_token) {
                    this.setToken(res.access_token)
                    console.log(this.token)
                    await this.getUser()
                }
            } catch (err) {
                console.log(err)
                return Promise.reject(err)
            }
        },

        async getUser(){
            try {
                const res = await user()
                this.setInfo(res)
                this.setAvatar(res.avatar)
                this.setUsername(res.name)
                return res
            }catch (err){
                console.log(err)
            }
        }

    }

})