<template>
    <div class="container">
      <div class="form-group">
        <label for="initPrice">초기 매입가</label>
        <input type="number" class="form-control" id="initPrice" v-model="initPrice">
      </div>
      <div class="form-group">
        <label for="initQuantity">초기 매입수량</label>
        <input type="number" class="form-control" id="initQuantity" v-model="initQuantity">
      </div>
      <div class="form-group">
        <label for="buyPrice">추가 매입가</label>
        <input type="number" class="form-control" id="buyPrice" v-model="buyPrice">
      </div>
      <div class="form-group">
        <label for="buyQuantity">추가 매입수량</label>
        <input type="number" class="form-control" id="buyQuantity" v-model="buyQuantity">
      </div>
      <div class="form-group">
        <label for="totalPrice">총 매입가</label>
        <input type="number" class="form-control" id="totalPrice" :value="calculateTotalPrice()" disabled>
      </div>
      <div class="form-group">
        <label for="totalQuantity">총 매입수량</label>
        <input type="number" class="form-control" id="totalQuantity" :value="calculateTotalQuantity()" disabled>
      </div>
      <div class="form-group">
        <label for="averagePrice">평균 매입가</label>
        <input type="number" class="form-control" id="averagePrice" :value="calculateAveragePrice()" disabled>
      </div>
      <div class="button-group">
        <button type="button" class="btn btn-secondary" @click="reset">초기화</button>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        initPrice: 0,
        initQuantity: 0,
        buyPrice: 0,
        buyQuantity: 0,
      };
    },
    methods: {
      calculateTotalPrice() {
        const totalPrice = this.initPrice * this.initQuantity + this.buyPrice * this.buyQuantity;
        return totalPrice;
      },
      calculateTotalQuantity() {
        const totalQuantity = this.initQuantity + this.buyQuantity;
        return totalQuantity;
      },
      calculateAveragePrice() {
        const totalQuantity = this.calculateTotalQuantity();
        const totalPrice = this.calculateTotalPrice();
        const averagePrice = totalPrice / totalQuantity;
        return averagePrice;
      },
      reset() {
        this.initPrice = 0;
        this.initQuantity = 0;
        this.buyPrice = 0;
        this.buyQuantity = 0;
        this.dailyQuantity = 0;
      },
    },
  };
  </script>