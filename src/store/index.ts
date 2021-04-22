import {createStore, Store} from 'vuex'

const store:Store<any> = createStore({
    state() {
        return {
            isLogin: false
        }
    },
    mutations:{
        setLogin(state,islogin:Boolean){
            state.isLogin = islogin;
        }
    }
})

export default store