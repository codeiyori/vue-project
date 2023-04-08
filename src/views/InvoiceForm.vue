<template>
<v-container>
  <v-container class="elevation-2" style="background-color: white; padding: 20px; width: 794px">
      <v-row class="" style="padding-bottom: 12vh;">
      <v-col cols="6" style="font-size: 22px; font-weight: bold;">Invoice</v-col>
      <v-col cols="6" style="font-size: 22px; font-weight: bold;" class="d-flex justify-end">K Merchandise</v-col>
      </v-row>
      <v-row class="pl-4">
        <v-col cols="7">
          <v-row>
            <input v-model="name"
              style="width: 12vw;"
              placeholder="홍 길동"/>
          </v-row>
          <v-row>
            <v-col class="pa-0" cols="12">
              <textarea 
              class="pa-0"
              variant="plain"
              rows="5"
              auto-grow
              placeholder="부촌 아파트 695-58거리 앞 South Korea"
              v-model="address">
              </textarea>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5">
          <v-row>
            <v-col cols="6" class="pa-0">Order Number:</v-col>
            <v-col cols="6" class="pa-0">       
            <input v-model="orderNumber"
              class="orderNumber"
              style="width: 12vw;"
              placeholder="303"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pa-0">Order Date:</v-col>
            <v-col cols="6" class="pa-0">
              <input v-model="orderDate"
              class="orderDate"
              style="width: 12vw;"
              placeholder="March 2, 2023"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pa-0">Payment Method:</v-col>
            <v-col cols="6" class="pa-0">
              <select v-model="selectedItem">
              <option v-for="(item, index) in items" 
              :key="index" :value="item.value">{{ item.text }}
              </option>
              </select>
              <input v-model="paymentMethod"
              class="paymentMethod"
              style="width: 12vw;"
              placeholder="MasterCard ending in 0382"/>
              </v-col>
          </v-row> 
        </v-col>
      </v-row>
      <v-row class="" style="background-color: black; margin-top: 22vh;">
      <v-col cols="8" class="pl-6" style="color: white; font-size: 16px; font-weight: bold;">Product</v-col>
      <v-col cols="2" style="color: white; font-size: 16px; font-weight: bold;">Quantity</v-col>
      <v-col cols="2" style="color: white; font-size: 16px; font-weight: bold;">Price</v-col>
      </v-row>
      <v-divider class="my-3" color="transparent"></v-divider>
      <v-row v-for="(product, index) in products" :key="index">
        <v-col cols="8" class="pl-6" style=" font-size: 16px;">
          <input style="width: 200px;" v-model="product.drink" @input="updateProduct(product)"/>
        </v-col>
        <v-col cols="2" style=" font-size: 16px;">
          <input style="width: 40px;" v-model="product.quantity" @input="updateProduct(product)"/>
        </v-col>
        <v-col cols="2" style=" font-size: 16px;">
          <v-row>
            <v-col cols="6">
          <input style="width: 40px;" v-model="product.price" @input="updateProduct(product)"/>
            </v-col>
            <v-col cols="6" class="mt-1">
              <v-row>
                <v-btn variant="tonal" size="x-small" color="success" @click="addProduct(index)">+</v-btn>
                <v-btn variant="tonal" size="x-small" color="error" @click="removeProduct(index)">-</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-divider class="my-1 mx-3"></v-divider>
      </v-row>

      <v-row style="margin-top: 16vh;">
        <v-col cols="8" class="pl-6" style=" font-size: 16px;"></v-col>
        <v-col>
          <v-row class="pa-0">
          <v-col cols="6" style=" font-size: 16px; font-weight: bold;">
            Subtotal
          </v-col>
          <v-col cols="6" style=" font-size: 16px;">          
            <label for="subtotal">$</label>
                <input v-model="subtotal"
                style="width: 60px;"
                placeholder="합계"/>
          </v-col>
          <v-divider class="mb-0"></v-divider>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="pl-6" style=" font-size: 16px;"></v-col>
        <v-col>
          <v-row class="pa-0">
          <v-col cols="6" style=" font-size: 16px; font-weight: bold;">
            Packaging
          </v-col>
          <v-col cols="6" style=" font-size: 16px;">
                <label for="packaging">$</label>
                <input v-model="packaging"
                style="width: 60px;"
                placeholder="포장비"/>
          </v-col>
          <v-divider class="mb-0"></v-divider>
          </v-row>
        </v-col>
      </v-row>
      <v-row style="">
        <v-col cols="8" class="pl-6" style=" font-size: 16px;"></v-col>
        <v-col>
          <v-row class="pa-0">
          <v-col cols="6" style=" font-size: 16px; font-weight: bold;">
            Tip
          </v-col>
          <v-col cols="6" style=" font-size: 16px;">          
            <label for="tip">$</label>
                <input v-model="tip"
                style="width: 60px;"
                placeholder="팁"/>
          </v-col>
          <v-divider :thickness="2" class="my-0 border-opacity-100" color="black"></v-divider>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="" style="margin-bottom: 20vh;">
        <v-col cols="8" class="pl-6" style=" font-size: 16px;"></v-col>
        <v-col>
          <v-row class="">
          <v-col cols="6" style=" font-size: 16px; font-weight: bold;">
            Total
          </v-col>
          <v-col cols="6" style=" font-size: 16px;">          
            <label for="total">$</label>
                <input v-model="total"
                style="width: 60px;"
                placeholder="총합계"/>
          </v-col>
          <v-divider :thickness="2" class="my-0 border-opacity-100" color="black"></v-divider>
          </v-row>
        </v-col>
      </v-row>
  </v-container>
</v-container>
<v-container>
  <v-row class="mb-1">
    <v-col style="text-align: center;">
      <h5 class="mb-1">인보이스 폼</h5>
      <v-btn
      prepend-icon="mdi-check-circle"
      @click="saveImage"
      >
      <template v-slot:prepend>
        <v-icon color="success"></v-icon>
      </template>
      인보이스 저장하기
    </v-btn>
    </v-col>
  </v-row>
  <v-container id="capture" class="elevation-2" style="background-color: white; padding: 20px;">
    <v-row class="" style="padding-bottom: 12vh;">
    <v-col cols="6" style="font-size: 22px; font-weight: bold;">Invoice</v-col>
    <v-col cols="6" style="font-size: 22px; font-weight: bold;" class="d-flex justify-end">K Merchandise</v-col>
    </v-row>
    <v-row class="pl-4">
      <v-col cols="7">
        <v-row>
          {{ name }}
        </v-row>
        <v-row>
          <v-col class="pa-0" cols="12">{{ address.split('\n')[0] }}</v-col>
          <v-col class="pa-0" cols="12">{{ address.split('\n')[1] }}</v-col>
          <v-col class="pa-0" cols="12">{{ address.split('\n')[2] }}</v-col>
          <v-col class="pa-0" cols="12">{{ address.split('\n')[3] }}</v-col>
          <v-col class="pa-0" cols="12">{{ address.split('\n')[4] }}</v-col>
        </v-row>         
      </v-col>
      <v-col cols="5">
        <v-row>
          <v-col class="pa-0">Order Number:</v-col>
          <v-col class="pa-0">{{ orderNumber }}</v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0">Order Date:</v-col>
          <v-col class="pa-0">{{ orderDate }}</v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0">Payment Method:</v-col>
          <v-col class="pa-0">{{ paymentText }}{{ paymentMethod }}</v-col>
        </v-row> 
      </v-col>
    </v-row>
    <v-row class="" style="background-color: black; margin-top: 22vh;">
    <v-col cols="8" class="pl-6" style="color: white; font-size: 16px; font-weight: bold;">Product</v-col>
    <v-col cols="2" style="color: white; font-size: 16px; font-weight: bold;">Quantity</v-col>
    <v-col cols="2" style="color: white; font-size: 16px; font-weight: bold;">Price</v-col>
    </v-row>
    <v-row v-for="(product, index) in products" :key="index">
      <v-col cols="8" class="pl-6" style=" font-size: 16px;">
        {{ product.drink }}</v-col>
      <v-col cols="2" style=" font-size: 16px;">
        {{ product.quantity }}</v-col>
      <v-col cols="2" style=" font-size: 16px;">
        {{ product.price }}</v-col>
      <v-divider class="my-1 mx-3"></v-divider>
    </v-row>
    <v-row style="margin-top: 16vh;">
      <v-col cols="8" class="pl-6" style=" font-size: 16px;"></v-col>
      <v-col>
        <v-row class="pa-0">
        <v-col cols="6" style=" font-size: 16px; font-weight: bold;">
          Subtotal
        </v-col>
        <v-col cols="6" style=" font-size: 16px;">          
          ${{ subtotal }}
        </v-col>
        <v-divider class="mb-0"></v-divider>
        </v-row>
      </v-col>
    </v-row>
    <v-row style="">
      <v-col cols="8" class="pl-6" style=" font-size: 16px;"></v-col>
      <v-col>
        <v-row class="pa-0">
        <v-col cols="6" style=" font-size: 16px; font-weight: bold;">
          Packaging
        </v-col>
        <v-col cols="6" style=" font-size: 16px;">          
          ${{ packaging }}
        </v-col>
        <v-divider class="mb-0"></v-divider>
        </v-row>
      </v-col>
    </v-row>
    <v-row style="">
      <v-col cols="8" class="pl-6" style=" font-size: 16px;"></v-col>
      <v-col>
        <v-row class="pa-0">
        <v-col cols="6" style=" font-size: 16px; font-weight: bold;">
          Tip
        </v-col>
        <v-col cols="6" style=" font-size: 16px;">          
          ${{ tip }}
        </v-col>
        <v-divider :thickness="2" class="my-0 border-opacity-100" color="black"></v-divider>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="" style="margin-bottom: 20vh;">
      <v-col cols="8" class="pl-6" style=" font-size: 16px;"></v-col>
      <v-col>
        <v-row class="">
        <v-col cols="6" style=" font-size: 16px; font-weight: bold;">
          Total
        </v-col>
        <v-col cols="6" style=" font-size: 16px;">          
          ${{ total }}
        </v-col>
        <v-divider :thickness="2" class="my-0 border-opacity-100" color="black"></v-divider>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</v-container>
</template>
<script>
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export default {
  name: "InvoiceForm",
  data() {
    return {
      name: '최 희정',
      orderNumber: '303',
      orderDate: 'March 3, 2023',
      paymentMethod: '3098',
      address: `부촌 아파트 
695-58거리 앞 
South Korea`,
      subtotal: '30',
      packaging: '10',
      tip: '30',
      total: '400',
      products: [
        {
          drink: "Abuert",
          quantity: "1",
          price: "$30"
        },
      ],
      selectedItem: 1,
      items: [
        { text: 'MasterCard ending in ', value: 1 },
        { text: 'Visa ending in ', value: 2 }
      ]
    }
  },
  computed: {
    paymentText() {
      const selectedItem = this.items.find(item => item.value === this.selectedItem);
      return `${selectedItem.text}`;
    }
  },
  methods: {
    addProduct(index) {
      this.products.splice(index + 1, 0,
        {
          drink: "Abuert",
          quantity: "1",
          price: "$30"
        },
        );
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
    updateProduct(product) {
      if (!product.value) {
        return;
      }
      const index = this.products.indexOf(product);
      if (index === -1) {
        return;
      }
      this.$set(this.products, index, product);
    },
    saveImage() {
    html2canvas(document.querySelector("#capture"), {
      dpi: 96, // 변경된 DPI
      scale: 0.75,
      width: 794, // 변경된 너비
      height: 1123, // 변경된 높이
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.download = "invoice.jpeg";
        link.href = imgData;
        link.click();
      });
    },
  }
};
</script>
<style>
#capture {
  width: 794px; 
  height: 1123px; 
  transform: scale(1); 
  }
</style>

