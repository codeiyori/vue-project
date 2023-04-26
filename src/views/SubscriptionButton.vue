<template>
    <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-2" max-width="344" width="320" elevation="2" >
    <v-card-item>
        <form @submit.prevent="handlePaymentMethodSubmission">
        <div v-if="loading">Loading...</div>
        <div id="card-container" />
        <button>Pay $1.00</button>
        </form>
        <div v-if="paymentStatus" id="payment-status-container">
            {{ paymentStatus }}
        </div>
    </v-card-item>
    </v-card>
    </v-container>
  </template>

<script setup>
   import { ref, onMounted } from 'vue'

    const appId = 'sandbox-sq0idb-prOkoUWovy2wKDK-zWs7AQ';
    const locationId = 'LQPPCCJ9HDKRF';

    let card;
    let loading = ref(true);
    let paymentStatus = ref("");
  
    onMounted(async () => {
      loading.value = true;
      await initializePaymentForm();
      loading.value = false;

    });
  
    const initializePaymentForm = async () => {
      if (!Square) {
        throw new Error("Square.js failed to load properly");
      }
      const payments = Square.payments(appId, locationId);
      try {
        card = await payments.card();
        await card.attach("#card-container");
      } catch (e) {
        console.error("Initializing Card failed", e);
        return;
      }
    };
  
    const tokenize = async (paymentMethod) => {
      const tokenResult = await paymentMethod.tokenize();
      if (tokenResult.status === "OK") {
        return tokenResult.token;
      } else {
        let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
        }
        throw new Error(errorMessage);
      }
    };
  
    const handlePaymentMethodSubmission = async () => {
      paymentStatus.value = "";
      const token = await tokenize(card);
      const { data, error } = await useFetch("/api/pay", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: {
          locationId,
          sourceId: token,
        },
      });
      if (!error.value) {
        paymentStatus.value = "Payment completed";
      } else {
        paymentStatus.value = "Payment failed";
      }
    };
  </script>
