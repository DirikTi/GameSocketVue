<template>
    <div>
        <div v-if="isStartGame == false" style="margin-left:0.7em;">
            <div>
                <span class="title">Login to Play game</span>
            </div>

            <div class="textName">
                <v-text-field label="Name"
                v-model="username"
                color="orange" :disabled="isLoading"></v-text-field>

                <v-btn color="orange" 
                @click="isLoading == false ? toSearch(): snackbar = true; errorText = 'be patient'"
                 dark>Search</v-btn>
            </div>
            {{isLoading ? 'Searching' : ''}}
        </div>

        <div v-else>
            <heal-bars></heal-bars>
            <div style="text-align:center">

                <v-row justify="center">
                    <v-btn :color="getTurn != 1 ? 'gray' : 'red'" @click="attack()"  dark>Attack</v-btn>
                    <v-btn :color="getTurn != 1 ? 'gray' : 'blue'" @click="heal()" dark>Heal</v-btn>
                </v-row>
            </div>
            <div style="text-align:center;">
                <chat-text></chat-text>
                <div style="width:%25">
                    <v-text-field
                    label="Mesaj"
                    v-model="textChat"></v-text-field>

                    <v-btn color="green" @click="sendMessage()" dark>Send</v-btn>
                    <v-btn color="red" dark>Clear Chat</v-btn>
                
                </div>
            </div>
        </div>
        <v-snackbar
        v-model="snackbar">
        <span>{{errorText}}</span> 
        <v-btn color="red" @click="snackbar = false">Tamam Anladık</v-btn></v-snackbar>
    </div>
    
    
</template>

<script>
import io from 'socket.io-client';
import {mapGetters, mapActions} from 'vuex';
import GameVue from './Game.vue';
import ChatVue from './Chat.vue';

export default {
    computed: {
        ...mapGetters([
            "getTurn",
            "getRoomName",
            "getMyInfo",
            "getEnemyInfo"
        ])
    },
    components: {
        "heal-bars": GameVue,
        "chat-text": ChatVue
    },
    mounted(){
        let Vm = this;
        Vm.socket.on('START_GAME', (data) => {
            if(data.gameStart){
                Vm.isStartGame = data.gameStart;
                Vm.isLoading = false;
                data.users.forEach(element => {
                    if(element != Vm.username){
                        this.setEnemyName(element);
                    }

                });

                if(data.turn == Vm.username){
                    this.setTurn(1);
                }else{
                    this.setTurn(0);
                }

                Vm.setRoomName(data.roomName);
            }
        });

        Vm.socket.on('action', (data) => {
            if(data.type == "attack"){
                this.actionEnemy(data.damage);
            }else{
                this.actionMe(data.damage);
            }
            this.setTurn(1);
        });

        Vm.socket.on('send', (msg) => {
            this.setChatText({msg: msg, sender: Vm.getEnemyInfo.name});
        });
    },
    data(){
        return {
            isLogin: false,
            username: '',
            socket: null,
            isStartGame: false,
            isLoading: false,
            snackbar: false,
            errorText: '',
            textChat: ''
        }
    },

    methods: {
        attack(){
            if(this.getTurn == 1){
                var randomCount = this.randomNumber(12);
                this.socket.emit("action", {damage: -randomCount, type: 'attack', roomName: this.getRoomName});
                this.actionMe(-randomCount);
                this.setTurn(0);
            }else{
                this.snackbar = true;
                this.errorText = "Sıranı Beklesene kardeşim";
            }
            
        },
        heal(){
            if(this.getTurn == 1){
                var randomCount = this.randomNumber(10)
                if(this.getMyInfo.heal == 100 || this.getMyInfo.heal + randomCount > 100){
                    this.snackbar = true;
                    this.errorText = "Canın 100 den yukarı çıkamaz";
                }else{
                    this.healMe(randomCount);
                    this.socket.emit("action", {damage: +randomCount, type: 'heal', roomName:
                    this.getRoomName});
                    this.setTurn(0);
                }
            }else{
                this.snackbar = true;
                this.errorText = "Sıranı Beklesene kardeşim";
            }
            
        },

        randomNumber(count){
            return Math.floor((Math.random() * count) + 1);
        },

        sendMessage(){
            let theSender = {msg: this.textChat, sender: this.getMyInfo.name};
            this.setChatText(theSender);
            this.socket.emit("send", {msg: this.textChat, roomName: this.getRoomName});
            this.textChat = "";
        },
        toSearch(){
            if(this.username != ''){
                console.log("in");
                this.socket.emit("search", this.username);
                this.setMyName(this.username);
                this.isLoading = true;
            }else{
                this.snackbar = true;
                this.errorText = "Yaz lan ismini üçkağıtcı"
            } 
        },
        ...mapActions([
            "setMyName",
            "setEnemyName",
            "actionEnemy",
            "actionMe",
            "healMe",
            "setTurn",
            "setRoomName",
            "setChatText"
        ])
    },
    created(){
        this.socket = io('192.168.1.35:3000');
        console.log(this.socket);
    }
}
</script>

<style>
.textName {
    width: 25%;
}
</style>