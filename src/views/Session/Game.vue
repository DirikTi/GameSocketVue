<template>
    <div>
        <div style="text-align:center">
            <span>{{getTurn == 1? 'Your Turn': 'Enemy Turn' }}</span>
        </div>
        <v-row style="margin:0.8em;">
            <v-col cols="5">
                <span class="title">{{getMyInfo.name}}</span>
                <br>
                <div>
                    <div class="myhpBar" :style="{width:getMyInfo.hp + '%'}"></div>
                    <div style="backgroun-color:gray" 
                    :style="{width:100 - getMyInfo.hp + '%'}"></div>
                    
                </div>
                <div><span class="body-1">{{getMyInfo.hp}}</span></div>
            </v-col>

            <v-col style="text-align:center;"><span class="headline">VS</span></v-col>
            
            <v-col cols="5">
                <span class="title">{{getEnemyInfo.name}}</span>
                <div>
                    <div class="enemyhpBar" :style="{width:getEnemyInfo.hp + '%'}"></div>
                    <div style="backgroun-color:gray" 
                    :style="{width:100 - getEnemyInfo.hp + '%'}"></div>
                </div>
                <div><span class="body-1">{{getEnemyInfo.hp}}</span></div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            "getEnemyInfo",
            "getMyInfo",
            "getTurn"
        ])
    },
    data(){
        return {

        }
    }
}
</script>

<style>
.myhpBar {
    height: 50px;
    background-color: green;
}

.enemyhpBar {
    height: 50px;
    background-color: red;
}
</style>