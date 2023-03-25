<template >
    <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-2" max-width="344" width="320" elevation="2" >
        <v-card-item>
            <div class="d-flex justify-center">
            <v-btn color="brown" size="small" icon="mdi-account-circle" >
                <span class="text-h7">{{ this.$store.state.profileInitials }}</span>
            </v-btn>
            </div>
            <div class="text-overline mb-1 text-center">
            <v-btn v-if="admin" class="link" :to="{name: 'Admin'}" prepend-icon="mdi-shield-account" variant="tonal" size="x-small" color="error" >
            Admin
            </v-btn>
            </div>
            <v-divider color="transparent" class="my-2"></v-divider>
            <div class="text-h6 mb-2 font-weight-black text-center">
                Account Settings
            </div>
            <v-container class="pt-0 pb-0">
            <v-divider color="transparent" class="my-1"></v-divider>
            <span class="text-caption font-weight-small">Name: {{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</span>
            <v-divider class="my-3"></v-divider>
            <span class="text-caption font-weight-small">Username: {{ this.$store.state.profileUsername }}</span>
            <v-divider class="my-3"></v-divider>
            <span class="text-caption font-weight-small">Email: {{ this.$store.state.profileEmail }}</span>
            <v-divider color="transparent" class="my-1"></v-divider>
            </v-container>
        </v-card-item>
        <v-card-actions class="d-flex justify-end">
        <v-btn @click="openModal" color="error" size="small" variant="outlined">
            Update
        </v-btn>
        </v-card-actions>
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
