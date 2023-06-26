import { defineStore } from 'pinia'

export const useStore = defineStore('piniaStore', {
    
    state: () => {
        return {
            viewer: null,
            timeMachine : null as NodeJS.Timer | null // 将 timeMachine 定义为 NodeJS.Timer 类型或 null 类型
        }
    },
    actions: {
        async getViewer() {
            if (this.viewer != null) {
              console.log(this.viewer);
              clearInterval(this.timeMachine!);
              this.timeMachine = null;
              return this.viewer;
            } else {
              if (this.timeMachine == null) {
                // 如果timeMachine为null则创建新的Promise对象
                return new Promise((resolve, reject) => {
                  this.timeMachine = setInterval(() => {
                    if (this.viewer != null) {
                      console.log(this.viewer);
                      clearInterval(this.timeMachine!);
                      this.timeMachine = null;
                      resolve(this.viewer);
                    }
                  }, 500);
                });
              }
            }
          }
    }
})