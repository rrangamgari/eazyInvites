<template>
  <div class="q-pt-lg">
    <div class="q-px-lg q-pb-md">
      <div class="q-px-sm text-h5 text-white" v-text="'Menu'" />
    </div>
    <div style="z-index: 11; position: fixed; bottom: 40px; right: 24px;">
      <q-btn icon="shopping_cart" color="primary" size="lg" round @click="cartLayout = true">
        <q-badge color="red" text-color="white" floating>{{ cart.length }}</q-badge>
      </q-btn>
    </div>
    <div class="q-pb-lg q-px-md items-center"
     v-for="(category,cat) in menu.categories" :key="cat">
      <div class="full-width q-px-md q-pb-md text-left text-white"
       style="font-size: 28px; font-weight: 700;">
        {{ category }}
      </div>
      <div class="row warp">
        <div class=" col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 q-px-md q-py-sm"
         v-for="item in menu.items[cat]" :key="item.itemdetailsid">
          <q-card>
            <q-img :src="item.images[0]" placeholder-src="~assets/logo/bird.png"
             :alt="item.itemname" :ratio="4/3" />
            <q-card-section class="q-pb-xs">
              <div class="text-subtitle1 text-primary cursor-pointer"
               @click="itemLayout = true; itemdetails = item;">{{ item.itemname }}</div>
              <div>
                <span class="text-h6 text-primary">${{ item.saleprice }}</span>
                &nbsp;
                <span class="text-h7 text-black text-strike">${{ item.price }}</span>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <div v-if="item.status.value === 3"
               class="full-width q-pa-sm text-red-14 text-center cursor-not-allowed"
               >Out of Stock</div>
              <div v-else-if="item.qty > 0" class="full-width row items-center">
                <q-btn style="width: 10%;" color="primary" icon="remove"
                 flat @click="decQty(item)" />
                <div style="width: 80%;" class="text-primary text-center text-h6"
                >{{ item.qty }}</div>
                <q-btn style="width: 10%;" color="primary" icon="add"
                 flat @click="incQty(item)" />
              </div>
              <q-btn v-else class="full-width" color="primary" label="Add Item"
               flat no-caps @click="addToCart(item)"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <q-dialog v-if="itemLayout" v-model="itemLayout" @input="image = 0">
      <q-card style="width: 60%; max-width: 80%;">
        <q-img v-if="!itemdetails.images || itemdetails.images.length === 0"
         src="~assets/logo/bird.png" />
        <q-carousel v-else arrows navigation animated swipeable v-model="image">
          <q-carousel-slide v-for="(img, ind) in itemdetails.images" :key="ind"
           :name="ind" :img-src="img" />
        </q-carousel>
        <q-card-section class="q-pb-xs">
          <div class="text-h6 text-primary">{{ itemdetails.itemname }}</div>
          <div class="text-subtitle1" style="word-break: break-all" v-html="itemdetails.itemtype" />
          <div class="q-pt-sm">
            <span class="text-h6 text-primary">${{ itemdetails.saleprice }}</span>
            &nbsp;
            <span class="text-h7 text-black text-strike">${{ itemdetails.price }}</span>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <div v-if="itemdetails.status.value === 3"
           class="full-width q-pa-sm text-red-14 text-center cursor-not-allowed"
           >Out of Stock</div>
          <div v-else-if="itemdetails.qty > 0" class="row items-center full-width">
            <q-btn style="width: 10%;" color="primary" icon="remove"
             flat @click="decQty(itemdetails)" />
            <div style="width: calc(80% - 1px);" class="text-primary text-center text-h6"
             >{{ itemdetails.qty }}</div>
            <q-btn style="width: 10%;" color="primary" icon="add"
             flat @click="incQty(itemdetails)" />
          </div>
          <q-btn v-else class="full-width" color="primary" label="Add Item"
           flat no-caps @click="addToCart(itemdetails)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-if="cartLayout" v-model="cartLayout">
      <q-card style="width: 60%; max-width: 80%">
        <div class="q-pa-sm text-primary text-h6">
          <q-icon name="shopping_cart" color="primary" size="md" />
          Cart
        </div>
        <div v-if="cart.length === 0" class="q-pa-sm q-pb-lg text-center">
          <div class="text-h5">Your Cart is Empty!</div>
          <div class="q-pt-sm q-pb-md text-subtitle2">Add Items to Cart now.</div>
          <q-btn label="Shop Now" no-caps color="primary" @click="cartLayout = false" />
        </div>
        <div v-else class="q-pa-sm row">
        <div class="col-8">
        <q-list bordered separator class="rounded-borders">
          <q-item v-for="item in cart" :key="item.itemdetailsid">
            <q-item-section avatar top>
              <q-avatar class="q-pt-sm" rounded size="70px">
                <img :src="item.images[0]">
              </q-avatar>
            </q-item-section>
            <q-item-section top>
              <q-card-section class="q-pa-xs">
                <div class="text-subtitle1 text-primary cursor-pointer"
                 @click="itemLayout = true; itemdetails = item;">{{ item.itemname }}</div>
                <div>
                  <span class="text-h6 text-primary">${{ item.saleprice }}</span>
                  &nbsp;
                  <span class="text-h7 text-black text-strike">${{ item.price }}</span>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions class="q-py-xs q-px-none">
                <div v-if="item.status.value === 3"
                 class="full-width q-pa-sm text-red-14 text-center cursor-not-allowed"
                 >Out of Stock</div>
                <div v-else-if="item.qty > 0" class="full-width row items-center">
                  <q-btn style="width: 15%;" color="primary" icon="delete"
                   flat @click="removeFromCart(item)" />
                  <q-btn style="width: 10%;" color="primary" icon="remove"
                   flat @click="decQty(item)" />
                  <div style="width: calc(65% - 1px);" class="text-primary text-center text-h6"
                   >{{ item.qty }}</div>
                  <q-btn style="width: 10%;" color="primary" icon="add"
                   flat @click="incQty(item)" />
                </div>
                <q-btn v-else class="full-width" color="primary" label="Add Item"
                 flat no-caps @click="addToCart(item)"/>
              </q-card-actions>
            </q-item-section>
          </q-item>
        </q-list>
        </div>
        <div class="col-4">
          <q-card class="q-ml-sm">
            <q-card-section class="q-py-sm text-primary text-h6">Price Details</q-card-section>
            <q-separator />
            <q-card-section class="q-py-sm text-subtitle1">
              <div class="full-width row q-py-xs">
                <div class="col-7">Price</div>
                <div class="col-5 text-right">${{ price.toFixed(2) }}</div>
              </div>
              <div class="full-width row q-py-xs">
                <div class="col-7">Discount (-)</div>
                <div class="col-5 text-right">${{ disc.toFixed(2) }}</div>
              </div>
              <!-- <div class="full-width row q-py-xs">
                <div class="col-7">Delivery (+)</div>
                <div class="col-5 text-right">${{ delivery.toFixed(2) }}</div>
              </div> -->
              <q-separator class="q-my-xs" />
              <div class="full-width row q-py-xs">
                <div class="col-7">Total</div>
                <div class="col-5 text-right">${{ total.toFixed(2) }}</div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn class="full-width" label="Checkout" color="primary" />
            </q-card-actions>
          </q-card>
        </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Loading, QSpinnerBars } from 'quasar';
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'menuComponent',
  data() {
    return {
      id: this.$route.params.id,
      menu: {},
      cart: [],
      cartLayout: false,
      itemdetails: {},
      itemLayout: false,
      image: 0,
      price: 0.00,
      disc: 0.00,
      delivery: 0.00,
      total: 0.00,
    };
  },
  created() {
    this.loadMenu();
  },
  methods: {
    loadMenu() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
      axios
        .get(`/api/userItems/menu/${this.id}`)
        .then((response) => {
          response.data.data.forEach((item) => {
            if (!item.images) item.images = ['https://cdn.quasar.dev/img/mountains.jpg', 'https://cdn.quasar.dev/img/parallax1.jpg', 'https://cdn.quasar.dev/img/parallax2.jpg', 'https://cdn.quasar.dev/img/quasar.jpg'];
          });
          this.menu = {
            categories: [''], // Categories (Example: All, Best Sellers)
            items: [response.data.data], // Items arranged with respect to each category
          };
          Loading.hide();
        })
        .catch((e) => {
          if (e.message === 'Request failed with status code 401') {
            this.$q.localStorage.remove('login-token');
            this.$router.push('/login');
          }
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
          Loading.hide();
        });
    },
    addToCart(item) {
      if (item.qty > 0) return;
      this.cart.push(item);
      item.qty = 1;
      this.calcPrice(item.price, item.saleprice, +1);
    },
    removeFromCart(item) {
      const ind = this.cart.indexOf(item);
      this.cart.splice(ind, 1);
      this.calcPrice(item.price, item.saleprice, -item.qty);
      item.qty = 0;
    },
    decQty(item) {
      if (item.qty === 1) this.removeFromCart(item);
      else {
        item.qty -= 1;
        this.cart.splice(0, 0);
        this.calcPrice(item.price, item.saleprice, -1);
      }
    },
    incQty(item) {
      if (item.stock > 0 && item.qty >= item.stock) return;
      item.qty += 1;
      this.cart.splice(0, 0);
      this.calcPrice(item.price, item.saleprice, +1);
    },
    calcPrice(price, saleprice, m) {
      this.price += m * price;
      this.disc += m * (price - saleprice);
      this.total += m * saleprice;
    },
  },
};
</script>
