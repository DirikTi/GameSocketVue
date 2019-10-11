<template>
    <div>
        <v-list>
            <v-list-item v-for="chatText in getChatText" :key="chatText.id">
                <span>{{chatText.sender}}: {{chatText.msg}}</span>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
            "getChatText"
        ])
    },
    data(){
        return {

        }
    }
}
</script>

<style>

</style>