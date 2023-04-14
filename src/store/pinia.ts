import { defineStore } from 'pinia'

export const useStore = defineStore('piniaStore', {
    state: () => {
        return {
            viewer: null
        }
    }
})