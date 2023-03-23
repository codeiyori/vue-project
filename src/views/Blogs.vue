<template>
    <v-container class="d-flex pa-0">
        <v-row class="justify-end mt-0">
        <v-col cols="12" xs="3" sm="3" md="2" lg="2">
            <v-switch inset v-model="editPost" value="true" color="orange-darken-1" hide-details="">
                <template v-slot:label>
                    EDIT {{ editPost ? 'ON' : 'OFF' }}
                </template>
            </v-switch>
        </v-col>
        </v-row>
    </v-container>
    <v-container class="d-flex pa-0">
        <v-row no-gutters>
            <v-col v-for="(post, index) in sampleBlogCards.slice(0, 4)" :key="index" cols="12" sm="6" md="4" lg="3" >
                <div class="blog-cards pa-2">
                    <BlogCard :post="post" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import BlogCard from '../components/BlogCard.vue'

export default { 
    name: "blogs",
    components: { BlogCard },
    computed: {
        sampleBlogCards() {
            return this.$store.state.sampleBlogCards;
        },
        editPost: {
            get() {
                return this.$store.state.editPost
            },
            set(payload) {
                this.$store.commit("toggleEditPost", payload);
            }
        }
    },
    beforeDetroy() {
        this.$store.commit("toggledEditPost, false")
    }
}
</script>