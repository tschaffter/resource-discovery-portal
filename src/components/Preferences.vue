<template>
    <div class="rounded-2xl p-2 mb-3 shadow bg-gray-100 dark:bg-gray-700 select-none hover:bg-gray-200">
        <div @click="open = !open" class="rounded cursor-pointer p-1 text-gray-500 font-light flex justify-start text-sm items-center">
            <button @click="open = !open" type="button" class="icon-btn bg-white dark:bg-gray-500">
                <i class="fas text-secondary dark:text-tertiary-light" :class="[open ? 'fa-chevron-down' : 'fa-chevron-right']"></i>
            </button> <span class="ml-2">Preferences <i class="fas fa-gear text-secondary-light"></i></span>
        </div>
        <div v-if="open" class="rounded-2xl p-2 mb-3 shadow select-none bg-gray-200/50 dark:bg-gray-700 hover:bg-gray-300/50" data-aos="fade-in">
            <div>
                <button @click="toggleExpandedView()" class="rounded-2xl block w-full select-none text-left px-3 py-1 bg-white hover:bg-gray-200 m-1 text-xs text-gray-500" data-aos="fade-in">
                    {{expandedView ? 'Shrink Results' : 'Expand Results'}} <i class="fas" :class="expandedView ? 'fa-window-minimize' : 'fa-window-maximize'"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Preferences',
    data: function(){
        return {
            open: false
        }
    },
    methods:{
        toggleExpandedView() {
            this.$store.commit('toggleExpandedView');
        }
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
    }
}
</script>