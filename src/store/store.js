import Vue from 'vue'
import Vuex from 'vuex'

// modules
import GameData from './modules/GameData';
import Chat from './modules/Chat';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        GameData,
        Chat
    }
})