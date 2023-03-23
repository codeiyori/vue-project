<template>
    <form @submit.prevent="login">
    <h2>Log in</h2>
    <input type="email"    placeholder="Email"    required v-model="email">
    <input type="password" placeholder="Password" required v-model="password">
    <button>Log in</button>
    </form>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/init.js'

export default {
    data() {
        return {
            email:    '',
            password: ''
        }
    },
    methods: {
        login() {
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
                this.$emit('loggedIn')
            })
        }
    }
}
</script>