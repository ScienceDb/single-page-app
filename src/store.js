import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token:  '',
    //token: localStorage.getItem('token') || '',
    //user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading';
    },
    auth_success(state, token){
      state.status = 'success';
      state.token = token;
    },
    auth_error(state){
      state.status = 'error';
    },
    auth_logout(state){
      state.status = '';
      state.token = '';
    }
  },
  actions: {
    
    auth_request({commit}, user_data ){
      return new Promise((resolve, reject)=>{
        commit('auth_request')
        axios({url: "http://localhost:3000/login", data: user_data, method: 'POST'})
        .then( response => {
          console.log("FROM ACTION",response.data)
          const token = response.data.token;
          localStorage.setItem('token', token);
          commit('auth_success', token)
          resolve(response)
        }).catch( err =>{
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },

    auth_logout({commit}){
      return new Promise((resolve, reject)=>{
        commit('auth_logout')
        localStorage.removeItem('token');
        resolve();
      })
    }

  },
  getters : {

    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
