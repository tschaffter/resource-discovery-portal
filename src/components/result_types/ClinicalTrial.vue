<template>
    <div>
        <!-- Type -->
        <ResultTab :name="result_type" :cls="[theme.icon, theme.text]" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">{{item._source.name || item._source.label}}</router-link>
            </h5>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <!-- description -->
            <Description :text="source.official_title"></Description>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <!-- detail box -->
            <div class="flex justify-start items-center flex-wrap">
                <!-- ID -->
                <template v-if="source?.nct_id" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>ID</template>
                        <template v-slot:value>{{source?.nct_id}}</template>
                    </Pill>
                </template>
                <!-- status -->
                <template v-if="source?.overall_status" class="text-sm">
                    <!-- pill -->
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Status</template> 
                        <template v-slot:value>{{source.overall_status}}</template>
                    </Pill>
                </template>
                <!-- type -->
                <template v-if="source?.study_type" class="text-sm">
                    <!-- pill -->
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{source.study_type}}</template>
                    </Pill>
                </template>
                <!-- phase -->
                <template v-if="source?.phase">
                    <!-- pill -->
                    <Pill :color="theme['bg']" v-for="phase in item._source.phase" :key="phase">
                        <template v-slot:title>Phase</template>
                        <template v-slot:value>{{phase?.phase}}</template>
                    </Pill>
                </template>
            </div>
            <template v-if="expandedView || fullView" data-aos="fade-in">
                <!-- stats box -->
                <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                    <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                        <!-- url -->
                        <p v-if="source.url">
                            <a :href="source.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                        </p>
                        <!-- overall_officials -->
                        <template v-if="overall_officials">
                            <p class="mt-2" :class="theme.text">Officials:</p>
                            <!-- short list -->
                            <template v-if="overall_officials.length < 11">
                                <small class="mb-1" v-for="(official, i) in overall_officials" :key="official">
                                    {{official}} <span v-if="i < overall_officials.length-1">, </span>
                                </small>
                            </template>
                            <!-- long hover -->
                            <template v-else>
                                <Popper :content="JSON.stringify(overall_officials)" class="tip" :hover="true" placement="right" arrow>
                                    <span>(<span :class="theme.text">{{overall_officials.length}}</span>) overall_officials</span>
                                </Popper>
                            </template>
                        </template>
                    </div>
                </div>
                <div v-if="source.keyword">
                    <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in source.keyword" :key="tag + i">
                        <i class="fas fa-tag" :class="theme.text"></i> {{tag?.keyword}}
                    </small>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ResultTab from '../ResultTab.vue'
import Description from '../ExpandableDescription.vue'

export default {
    name: "ClinicalTrialResult",
    props:{
        item: Object,
        fullView: Boolean
    },
    components:{
        Description,
        ResultTab
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        // root level of data, for readability
        source: function () {
            // deeper > shallow
            return this.item?._source?.raw?.attributes ? this.item?._source?.raw?.attributes : 
            this.item?._source?.raw ? this.item?._source?.raw : 
            this.item?._source ? this.item?._source : this.item;
        },
        result_type: function () {
            // deeper > shallow
            return this.source.entity ? this.source.entity : 
            this.source?.['@type'] ? this.source?.['@type'] : 'Tool';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
        },
        overall_officials: function(){
            if (this.item && this.source.overall_official) {
                return this.source.overall_official.map(item => item.overall_official_name);
            }else{
                return false
            }
        },
    }
}
</script>