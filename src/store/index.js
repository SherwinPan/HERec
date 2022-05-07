import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    
  },
  state:{
    mediaBaseUrl:'http://localhost:8000/media/',
  },
  getters:{
    getMediaUrl(state){
      return state.mediaBaseUrl
    }

  }
});
