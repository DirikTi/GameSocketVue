const state = {
    chatTexts: []
}

const getters = {
    getChatText: state => {
        return state.chatTexts;
    }
}

const actions = {
    setChatText(context, data){
        context.commit("setChatText", data);
    },

    clearChat(context){
        context.commit("clearChat");
    }
}

const mutations = {
    setChatText(state, data){
        data.id = state.chatTexts.length + 1;
        state.chatTexts.push(data);
    },

    clearChat(state){
        state.chatTexts = [];
    }
}



export default {
    state,
    getters,
    actions,
    mutations
}