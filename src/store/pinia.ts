import { defineStore } from 'pinia'

export const useStore = defineStore('piniaStore', {
    
    state: () => {
        return {
            viewer: null,
            timeMachine : null as NodeJS.Timer | null // 将 timeMachine 定义为 NodeJS.Timer 类型或 null 类型
        }
    },
    actions: {
         getViewer() {
            if (this.viewer != null) {
              console.log(this.viewer);
              clearInterval(this.timeMachine!);
              this.timeMachine = null;
              return new Promise((resolve=>resolve(this.viewer)));
            } else {
              if (this.timeMachine == null) {
                // 如果timeMachine为null则创建新的Promise对象
                return new Promise((resolve, reject) => {
                  this.timeMachine = setInterval(() => {
                    if (this.viewer != null) {
                      console.log(this.viewer,"我是定时器中的viewer");
                      clearInterval(this.timeMachine!);
                      this.timeMachine = null;
                      resolve(this.viewer);
                    }
                    console.log('waiting...');
                  }, 50);
                });
              }
            }
          }

    }
})