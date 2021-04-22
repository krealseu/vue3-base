import { Router } from 'vue-router';
import store from '../store'

const login = '/login'
const home = '/'

function isLogin():Promise<boolean> {
    return new Promise((resolve) => {
        /**
         *  先从vuex中读取登录状态，没登入则从localstorage中获取token，
         *   |有token则连接服务器获取，判断可用否，
         *   |  |可用，则vuex设置登入状态，resolve
         *   |  |否则，清空token，reject
         *   |没有token则reject
         *  有则resolve
         */
        let vuex = store.state.isLogin;
        if (vuex) {
            resolve(true)
        } else {
            let token = localStorage.getItem('token')
            if (token) {
                // 从服务器验证token的方式，待实现。
                new Promise((r, j) => { j() }).then(() => {
                    vuex = store.commit("setLogin",true);
                    resolve(true);
                }).catch(() => {
                    localStorage.removeItem('token')
                    resolve(false);
                })
            } else {
                resolve(false)
            }
        }
    })
}

let NProgress = {
    start() {},
    done() {}
}

export const checkLogin = function(router:Router){
    router.beforeEach(async(to, from, next) => {
        NProgress.start()
        if (await isLogin()) {
            if (to.path === login) {
                if (to.query.next) {
                    next({path: <string>to.query.next})
                } else {
                    next({path: home})
                }
            } else {
                next()
            }
            NProgress.done()
        } else {
            if (to.path === login) {
                // if (to.path === login || !to.meta.requiresAuth) {
                next()
            } else {
                next({
                    path: login,
                    query: {
                        next: to.path
                    }
                })
            }
            NProgress.done()
        }
    })
    
    router.afterEach(() => {
        NProgress.done()
    })
}


