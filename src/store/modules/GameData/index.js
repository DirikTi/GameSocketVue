const state = {
    isConnected: false,
    socketMessage: '',
    my_hp: 100,
    enemy_hp: 100,
    hpPot: 1,
    attack: [17, 25],
    myName: '',
    enemyName: '',
    turn: 1,
    roomName: ''
}

const getters = {
    getEnemyInfo: state => {
        return {hp: state.enemy_hp, name: state.enemyName}
    },
    getMyInfo: state => {
        return {hp: state.my_hp, name: state.myName, attack: state.attack, hpPot:state.hpPot};
    },
    getTurn: state => {
        return state.turn;
    },
    getRoomName: state => {
        return state.roomName;
    }
}

const actions = {

    setMyName(context, data){
        context.commit("setMyName", data);
    },


    setEnemyName(context, data){
        context.commit("setEnemyName", data);
    },


    actionEnemy(context, data){
        context.commit("actionEnemy", data);
    },

    actionMe(context, data) {
        context.commit("actionMe", data);
    },

    setTurn(context, data){
        context.commit("setTurn", data);
    },

    setRoomName(context, data){
        context.commit("setRoomName", data);
    },

    healMe(context, data){
        context.commit('healMe', data);
    }
}

const mutations = {
    setMyName(state, data){
        state.myName = data;
    },

    setEnemyName(state, data){
        state.enemyName = data;
    },

    actionEnemy(state, attack){
        state.my_hp = state.my_hp + attack;
    },

    actionMe(state, attack) {
        state.enemy_hp = state.enemy_hp + attack;
    },

    healMe(state, power) {
        state.healMe = 0;
        state.my_hp = state.my_hp + power; 
    },

    setTurn(state, data){
        state.turn = data;
    },

    setRoomName(state, data){
        state.roomName = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}