<template >
    <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-2" max-width="344" width="320" elevation="2" >
        <v-card-item>
            <div class="d-flex justify-center">
            <v-btn color="brown" size="small" icon="mdi-account-circle" >
                <span class="text-h7">{{ this.$store.state.profileInitials }}</span>
            </v-btn>
            </div>
            <v-container class="pt-0 pb-0">
            <div class="text-h6 mt-2 mb-2 font-weight-black text-center">
                Account
            <v-row justify-content="center">
            <v-col>
            <v-btn v-if="admin" class="link mr-2 px-5" :to="{name: 'Admin'}" prepend-icon="mdi-shield-account" variant="tonal" size="x-small" color="green">
                Add
            </v-btn>
            <v-btn v-if="admin" class="link" :to="{name: 'RemoveAdmin'}" prepend-icon="mdi-shield-account" variant="tonal" size="x-small" color="error">
                Remove
            </v-btn>
            </v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            </div>
            <div class=" text-h6 ma-0 font-weight-black">
            <span class="text-caption font-weight-small">Name: {{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</span>
            <v-divider class="my-2"></v-divider>
            <span class="text-caption font-weight-small">Username: {{ this.$store.state.profileUsername }}</span>
            <v-divider class="my-2"></v-divider>
            <span class="text-caption font-weight-small">Email: {{ this.$store.state.profileEmail }}</span>
            <v-divider v-if="admin" class="my-3"></v-divider>
            </div>
            <v-card-actions v-if="admin" class="d-flex justify-end">
            <v-btn @click="openModal" color="error" size="small" variant="outlined">
                Update
            </v-btn>
            </v-card-actions>
            <v-divider v-if="!admin" class="mb-4"></v-divider>
            </v-container>
        </v-card-item>
    </v-card>
    </v-container>
    <UpdateModal v-if="showUpdateModal"/>
    <Loading v-if="loading" />
</template>
<script>
import UpdateModal from '../components/UpdateModal.vue'
import Loading from '../components/Loading.vue'
export default { 
    name: "Profile",
    components: {
        UpdateModal,
        Loading
    },
    data() {
        return {
            showUpdateModal: false,
            loading: false
        }
    },
    computed: {
        admin() {
        return this.$store.state.profileAdmin;
        }
    },
    methods: {
        openModal() {
                this.loading = true;
                this.showUpdateModal = true;
        }
    }
}
</script>
