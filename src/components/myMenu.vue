<template>
  <div class="row">
    <div class="q-pa-md" :class="`${cWidth < 1150 ? 'col-12' : 'col'}`">
      <q-table
        title="Menu Items"
        :columns="columns"
        :data="data"
        color="primary"
        row-key="itemdetailsid"
        icon-left="people"
        no-data-label="Add Menu Items to view them here"
        no-results-label="No matching Menu Items found"
        :selected-rows-label="getSelectedString"
        hide-pagination
        :hide-selected-banner="!select"
        :filter="filter"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        :table-header-style="{ backgroundColor: '#05944F', color: '#FFFFFF' }"
        :selection="select ? 'multiple' : 'none'"
        :selected="selected"
        @update:selected="(newSelected) => $emit('update:selected', newSelected)"
        :style="`max-height: ${$q.screen.lt.sm ? 'none' : ($q.screen.height * 2 / 3)+'px'}`"
      >
        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center">
            <span>{{ message }}</span>
          </div>
        </template>
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="cloud_upload"
            label="Add New Item"
            title="CSV or XLS file accepted"
            no-caps
            @click="addNewItemLayout = true"
          />
          &nbsp;&nbsp;
          <router-link :to="menu" target="_blank">
          <q-btn
            color="primary"
            icon-right="publish"
            label="Publish Menu"
            title="CSV or XLS file accepted"
            no-caps
          />
          </router-link>
          &nbsp;&nbsp;
          <div class="q-pa-xs">
            <q-input dense debounce="300" v-model="filter" placeholder="Search"
                     style="max-width: 350px;">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:header-cell="props">
          <q-th :props="props">
            <b style="font-size:14px;">{{ props.col.label }}&nbsp;</b>
            <q-icon
              name="contact_mail"
              size="2.5em"
              v-if="props.col.label == 'available'"
            />
            <q-icon
              name="contact_phone"
              size="2.5em"
              v-if="props.col.name == 'stock'"
            />
            <q-icon
              name="edit"
              size="2.5em"
              v-if="props.col.name == 'edit'"
            />
            <q-icon
              name="delete"
              size="2.5em"
              v-if="props.col.name == 'delete'"
            />
          </q-th>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width v-if="select" style="height:auto;">
              <q-checkbox :val="props.row" v-model="props.selected"/>
            </q-td>
            <q-td key="itemname" :props="props">
              {{ props.row.itemname }}
            </q-td>
            <q-td key="itemtype" auto-width :props="props" v-if="props.row.itemtype !== null">
              <div v-html="props.row.itemtype.substring(0,50).concat('...')" />
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                max-width="20rem"
                :content-style="{ color: '#FFFFFF' ,backgroundColor: '#05944F'}"
              >
                <div v-html="props.row.itemtype" />
              </q-tooltip>
            </q-td>
            <q-td key="itemtype" :props="props" v-else>
              <div></div>
            </q-td>
            <q-td key="price" :props="props">
              $ {{ parseFloat(props.row.price).toFixed(2) }}

            </q-td>
            <q-td key="stock" :props="props"
                  v-if="props.row.stock===null">
              N/A

            </q-td>
            <q-td key="stock" :props="props"
                  v-else>
              {{ props.row.stock }}

            </q-td>

            <q-td key="status" :props="props"
            >
              {{ props.row.status.label }}
            </q-td>
            <q-td v-if="!select" key="edit" :props="props">
              <q-icon name="edit" size="2rem" color='primary' class=""
                      style="cursor:pointer;"
                      @click="editMe(props.rowIndex)"/>
            </q-td>
            <q-td v-if="!select" key="delete" :props="props">
              <q-icon name="delete" size="2rem" color='negative' class=""
                      style="cursor:pointer;"
                      @click="deleteMe(props.row.itemdetailsid)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-dialog v-model="addNewItemLayout" @hide="onFormReset()">
        <q-layout container class="bg-white" style="max-height:95%;min-width: 95%">
          <q-header class="bg-primary">
            <q-toolbar>
              <q-toolbar-title>{{ !edit ? 'Add Item' : 'Edit Item' }}</q-toolbar-title>

              <q-btn flat v-close-popup round dense icon="close"/>
            </q-toolbar>
          </q-header>
          <q-page-container>
            <div class="q-pa-md flex flex-center">
              <q-form
                id="login"
                class="q-gutter-md q-pa-xs q-pr-md"
                style="min-width: 95%"
                @submit="onFormSubmit"
                @reset="onFormReset"
              >
                <div class="row">
                  <div class="col-8 q-pa-xs q-pr-lg">
                    <div class="row q-gutter-sm">
                      <div class="col-12">
                        <q-input
                          type="text"
                          v-model="itemTitle"
                          label="Item Title"
                          unmasked-value
                          lazy-rules
                          :rules="[val => val && val.trim() !== ''
                           || 'Please enter a Valid Item Title']"
                        />
                      </div>
                      <div class="col-12 row">
                        <q-input
                          style="width: calc(50% - 8px); margin-right: 16px;"
                          type="number"
                          v-model.number="price"
                          label="Price"
                          lazy-rules
                          mask="#.#"
                          step="0.01"
                          min="0"
                        />
                        <q-input
                          style="width: calc(50% - 8px);"
                          type="number"
                          v-model.number="saleprice"
                          label="Sale Price"
                          mask="#.#"
                          step="0.01"
                          min="0"
                          :max="price"
                        />
                      </div>
                      <!--
                      <q-toggle v-model="accept" label="I accept the license and terms" />
                      -->
                      <div class="col-12">
                        Description
                        <q-editor v-model="editor" min-height="5rem" label="Description"
                         :toolbar="[['bold', 'italic', 'strike', 'underline'], ['undo', 'redo']]" />
                      </div>
                      <div class="col-12">
                        <q-btn-toggle
                          v-model="orderVisibleModel"
                          push
                          glossy
                          toggle-color="primary"
                          :options="orderVisibleOptions"
                          @click="toggleOption"
                        />
                        <div class="q-pa-xs"><b text-color="primary">{{optionData}}</b></div>
                      </div>
                      <div class="col-12">
                        <q-select label="How long does it take to prepare orders?"
                                  v-model="prepTime"
                                  :options="orderPrepOptions"
                                  lazy-rules
                                  :rules="[val => val || 'Please choose an Option']"></q-select>
                      </div>
                      <!--<div class="col-10">
                        <q-select label="How long does it take to prepare orders?"
                                  v-model="prepTime"
                                  :options="options"></q-select>
                      </div>-->
                      <div class="col-12">
                        <q-btn label="Save" type="submit" color="primary" class="q-mr-sm"/>
                        <q-btn label="Reset" type="reset" color="primary" flat/>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <q-uploader
                      v-show="false"
                      ref="uploader"
                      label="Item Image"
                      :headers="[{
                        name: 'Authorization',
                        value: `Bearer ${$q.localStorage.getItem('login-token')}`
                      }]"
                      field-name="file"
                      :auto-upload="itemdetailsid != null"
                      :url="`/api/userItems/item/${itemdetailsid}/image`"
                      @added="onAdd"
                      @finish="onUploadFinish()"
                      style="width: 100%; min-height: 90%;"
                      multiple
                    />
                    <q-carousel swipeable infinite animated v-model="slide" >
                      <q-carousel-slide :name="slide" >
                        <q-img :src="slide < images.length ? `${url}/${images[slide].itemimagename}`
                                     : (slide < images.length + files.length
                                       ? files[slide-images.length].__img.src
                                       : '')"
                         class="bg-grey-4" contain width="100%" height="100%" />
                      </q-carousel-slide>
                      <!-- <q-carousel-slide :name="slide"
                       v-else-if="slide < images.length + $refs.uploader.files.length"
                       :img-src="images[slide] ? `${url}/${images[slide].itemimagename}`
                                               : 'assets/home/bird.png'" /> -->
                    </q-carousel>
                    <q-tabs
                      style="margin: 2px 4px; height: 58px;"
                      v-model="slide"
                      outside-arrows mobile-arrows
                      align="center" dense :breakpoint="0"
                      indicator-color="primary"
                      narrow-indicator
                      @dragover.prevent="allowDrag"
                    >
                     <template v-for="(img,idx) in images">
                      <!-- <q-tab :key="`${ind}->${idx}`" :name="ind" v-if="idx === ind2"
                       style="padding: 0px 2px; opacity: 0.5;">
                        <q-img width="70px" height="50px" contain
                         :src="`${url}/${images[ind].itemimagename}`" />
                      </q-tab> -->
                      <q-tab :key="img.itemimagesid" :name="idx" :tabindex="idx"
                       style="padding: 0px 2px;"
                       draggable="true" @dragstart="onDrag($event,idx)"
                       @dragover.prevent="onDragOver($event,idx)" @dragend="onDrop($event,idx)">
                        <q-img width="70px" height="50px" contain
                         :src="`${url}/${img.itemimagename}`" />
                      </q-tab>
                     </template>
                      <q-tab v-for="(file,ind) in files" :key="images.length + ind"
                       :name="images.length + ind" style="padding: 0px 2px;">
                        <q-img width="70px" height="50px" contain
                         :src="file.__img.src" />
                      </q-tab>
                      <div style="margin: 0px 3px;">
                        <q-btn icon="add" color="primary" flat round
                         @click="$refs.uploader.pickFiles()">
                          <q-tooltip>Add Image</q-tooltip>
                        </q-btn>
                      </div>
                    </q-tabs>
                  </div>
                </div>
              </q-form>
            </div>
          </q-page-container>
        </q-layout>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { exportFile, Loading, QSpinnerBars } from 'quasar';
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'addMenuComponent',
  components: {},
  model: {
    prop: 'selected',
    event: 'update:selected',
  },
  props: {
    offset: {
      type: Number,
      default: 0,
    },
    select: Boolean,
    selected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addNewItemLayout: false,
      filter: '',
      errorMessageProtein: '',
      errorProtein: false,
      uploadItemsModel: '',
      orderVisibleModel: 1,
      orderVisibilityModel: null,
      editor: '',
      prepTime: '',
      orderPrepOptions: null,
      orderVisibleOptions: [],
      optionData: 'Your item is ready to sell online and will show up in navigation & search results.',
      headerFunc: [
        {
          name: 'authorization',
          value:
              `Bearer ${this.$q.localStorage.getItem('login-token')}`,
        }],
      visible: ['itemname', 'itemtype', 'price', 'stock', 'status'],
      columns: [
        {
          name: 'itemname',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'itemname',
          sortable: true,
        },
        {
          name: 'itemtype',
          label: 'Description',
          align: 'left',
          field: 'itemtype',
          sortable: true,
        },
        {
          name: 'price',
          align: 'right',
          label: 'Price',
          field: 'price',
          sortable: true,
          headerStyle: 'icon-right:archive',
        },
        {
          name: 'stock',
          label: 'Stock',
          field: 'stock',
          align: 'center',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'center',
          sortable: false,
        },
        {
          name: 'edit',
          label: 'Edit',
          field: 'edit',
          align: 'right',
          sortable: false,
        },
        {
          name: 'delete',
          label: 'Delete',
          field: 'delete',
          align: 'right',
          sortable: false,
        },
      ],
      getSelectedString: (n) => `${n} Contact${n > 1 ? 's' : ''} selected`,

      pagination: { rowsPerPage: 0 },
      data: [],
      edit: false,
      index: null,
      itemdetailsid: null,
      itemTitle: null,
      type: null,
      stock: null,
      available: null,
      price: null,
      saleprice: null,
      images: [],
      files: [],
      slide: 0,
      ind: null,
      el: null,
      ind1: null,
      ind2: null,
      node: null,
      prompt: true, // Delete Prompt
      menu: '',
      url: 'https://wecards.s3.amazonaws.com',
    };
  },
  created() {
    this.loadItems();
    this.menu = `/menu/${this.$q.localStorage.getItem('user-token').userid}`;
  },
  computed: {
    cWidth() {
      return this.$q.screen.width - this.offset;
    },
  },
  methods: {
    wrapCsvValue(val, formatFn) {
      let formatted = formatFn !== undefined ? formatFn(val) : val;

      formatted = formatted === undefined || formatted === null ? '' : String(formatted);

      formatted = formatted.split('"').join('""');

      return `"${formatted}"`;
    },
    isValidavailable(val) {
      if ((this.phone === null || this.phone === '') && val !== '') {
        const availablePattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return availablePattern.test(val) || 'Invalid available';
      }
      return null;
    },
    isValidPhone(val) {
      console.log(this.available);
      if ((this.available === null || this.available === '') && (val === null || val === '')) {
        return 'Please enter Phone';
      }
      return null;
    },
    factoryFn(file) {
      this.$q.notify({
        message: `Browser denied file download...${file}`,
        color: 'negative',
        icon: 'warning',
        position: 'center',
      });
      return new Promise((resolve) => {
        // simulating a delay of 2 seconds
        setTimeout(() => {
          resolve({
            url: '/api/userEvents/upload',
          });
        }, 2000);
      });
    },
    onSubmit(evt) {
      // const formData = new FormData(evt.target);
      const submitResult = [evt];

      /* for (const [name, value] of formData.entries()) {
                    submitResult.push({
                      name,
                      value,
                    });
                  } */
      this.submitResult = submitResult;
    },
    onReset() {
      this.uploadItemsModel = null;
    },
    onUploadFinish() {
      if (!this.edit) {
        Loading.hide();
        this.addNewItemLayout = false;
      }
    },
    onAdd() {
      this.files = this.$refs.uploader.files;
    },
    allowDrag(evt) {
      evt.preventDefault();
    },
    onDrag(evt, ind) {
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      this.el = evt.target;
      this.ind = ind; // Array.from(this.el.parentNode.childNodes).indexOf(this.el);
      // this.el.parentNode.removeChild(this.el);
      // this.el.parentNode.replaceChild(this.node, this.el);
      this.node = this.el.cloneNode(true);
      this.node.ondragover = this.allowDrag;
      // this.node.ondrop = this.onDrop;
      // this.el.draggable = false;
      evt.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
      console.log(evt);
    },
    onDragOver(evt, ind) {
      if (this.ind2 === null) {
        this.el.parentNode.insertBefore(this.node, this.el);
        this.el.parentNode.removeChild(this.el);
        this.ind2 = this.ind;
        return;
      }
      if (this.ind < ind && ind <= this.ind2) ind -= 1;
      else if (this.ind2 <= ind && ind < this.ind) ind += 1;
      const el = this.node.parentNode;
      console.log(evt, this.ind2, ind);
      if (ind > this.ind2) el.insertBefore(this.node, el.childNodes[ind + 1]);
      else el.insertBefore(this.node, el.childNodes[ind]);
      this.ind2 = ind;
    },
    onDrop(evt, ind) {
      // if (!(ind >= 0)) return;
      ind = this.ind2; // Array.from(this.el.parentNode.childNodes).indexOf(this.el);
      this.$q.notify(`${this.ind} -> ${ind}`);
      this.node.parentNode.insertBefore(this.el, this.node);
      this.node.parentNode.removeChild(this.node);
      const img = this.images[this.ind];
      this.images.splice(this.ind, 1);
      this.images.splice(this.ind2, 0, img);
      if (this.slide === this.ind) this.slide = ind;
      else if (this.ind < this.slide && this.slide <= this.ind2) this.slide -= 1;
      else if (this.ind2 <= this.slide && this.slide < this.ind) this.slide += 1;
      console.log('DP', evt, this.ind, ind, this.images.map((i) => i.itemimagesid));
      this.ind = null;
      this.ind2 = null;
    },
    exportTable() {
      // naive encoding to csv format
      const cols = this.columns.filter((col) => col.itemTitle !== 'delete');
      const content = [cols.map((col) => this.wrapCsvValue(col.label))]
        .concat(
          this.data.map((row) => cols
            .map((col) => this.wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
              // eslint-disable-next-line no-void
                : row[col.field === void 0 ? col.itemname : col.field],
            ))
            .join(',')),
        )
        .join('\r\n');

      const status = exportFile('table-export.csv', content, 'text/csv');

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
          position: 'center',
        });
      }
    },
    loadItems() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .get('/api/userItems/items')
        .then((response) => {
          this.data = response.data.data;
          Loading.hide();
        })
        .catch((e) => {
          //  this.errors.push(e);
          // Loading.hide();
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
      axios
        .get('/api/userItems/itemsStatus')
        .then((response) => {
          this.orderVisibleOptions = response.data.data;
          if (response.data.data !== null) {
            this.orderVisibilityModel = {
              value: this.orderVisibleModel,
              label: this.orderVisibleOptions[0].label,
            };
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
      axios
        .get('/api/userItems/preperationTypes')
        .then((response) => {
          this.orderPrepOptions = response.data.data;
          console.log(this.orderPrepOptions);
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    toggleOption() {
      if (this.orderVisibleModel === 1) {
        this.optionData = 'Your item is ready to sell online and will show up in navigation & search results.';
        this.orderVisibilityModel = {
          value: this.orderVisibleModel,
          label: this.orderVisibleOptions[0].label,
        };
      }
      if (this.orderVisibleModel === 2) {
        this.optionData = 'Your item is available but will not show up in navigation & search results..';
        this.orderVisibilityModel = {
          value: this.orderVisibleModel,
          label: this.orderVisibleOptions[1].label,
        };
      }
      if (this.orderVisibleModel === 3) {
        this.optionData = 'Your item will show up in navigation & search results but as Out of Stock.';
        this.orderVisibilityModel = {
          value: this.orderVisibleModel,
          label: this.orderVisibleOptions[2].label,
        };
      }
    },
    editMe(index) {
      const itemdetails = this.data[index];
      this.onFormReset(itemdetails);
      this.edit = true;
      this.itemdetailsid = itemdetails.itemdetailsid;
      this.index = index;
      this.addNewItemLayout = true;
    },
    deleteMe(id) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .delete(`/api/userItems/item/${id}`)
        .then((response) => {
          // JSON responses are automatically parsed.
          if (response.data.data) {
            // this.mounted();
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Successfully Deleted',
              position: 'top',
            });
            this.loadItems();
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Could not delete Contact',
              position: 'top',
            });
          }
          // this.data = this.data.concat(response.data.data);
          Loading.hide();
        })
        .catch((e) => {
          //  this.errors.push(e);
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
    onFormReset(itemdetails = {}) {
      this.itemTitle = itemdetails.itemname;
      this.price = itemdetails.price;
      this.saleprice = itemdetails.saleprice;
      this.editor = itemdetails.itemtype || '';
      this.stock = itemdetails.stock;
      this.orderVisibilityModel = itemdetails.status;
      this.orderVisibleModel = itemdetails.status ? itemdetails.status.value : 1;
      this.prepTime = itemdetails.timeforpreperation;
      this.edit = false;
      this.itemdetailsid = null;
      this.index = null;
      this.images = itemdetails.itemimages || [];
      this.files = new Array(0);
      this.slide = 0;
      this.toggleOption();
    },
    onFormSubmit() {
      const itemdetails = {
        itemdetailsid: this.itemdetailsid,
        itemname: this.itemTitle,
        saleprice: this.saleprice || 0,
        price: this.price || 0,
        stock: this.stock,
        status: this.orderVisibilityModel,
        country: this.$q.localStorage.getItem('country-token'),
        timeforpreperation: this.prepTime,
        itemtype: this.editor,
      };
      if (this.edit) {
        this.onFormEdit(itemdetails);
        return;
      }
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .post('/api/userItems/item', itemdetails)
        .then((response) => {
          // JSON responses are automatically parsed.
          if (response.data.data) {
            // this.mounted();
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Successfully Added',
              position: 'top',
            });
            // this.loadItems();
            this.data.push(response.data.data);
            this.itemdetailsid = response.data.data.itemdetailsid;
            if (this.$refs.uploader.files.length > 0) {
              this.$nextTick()
                .then(() => {
                  this.$refs.uploader.upload();
                });
            } else this.onUploadFinish();
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: response.data.message,
              position: 'top',
            });
            Loading.hide();
          }
          // this.data = this.data.concat(response.data.data);
        })
        .catch((e) => {
          //  this.errors.push(e);
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
    onFormEdit(itemdetails) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .put(`/api/userItems/item/${this.itemdetailsid}`, itemdetails)
        .then((response) => {
          // JSON responses are automatically parsed.
          if (response.data.data) {
            // this.mounted();
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Successfully Saved',
              position: 'top',
            });
            // this.loadItems();
            this.data[this.index] = itemdetails;
            Loading.hide();
            this.addNewItemLayout = false;
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: response.data.message,
              position: 'top',
            });
            Loading.hide();
          }
          // this.data = this.data.concat(response.data.data);
        })
        .catch((e) => {
          //  this.errors.push(e);
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
    save(val, initalVal, eventMember, field) {
      eventMember[field] = val;
      console.log(val, initalVal, eventMember, field);
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .put(`/api/userEvents/userguest/${eventMember.eventmemberidUI}`, eventMember)
        .then((response) => {
          if (response.data.data) {
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Successfully Saved',
              position: 'top',
            });
            eventMember = response.data.data;
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Could not save changes',
              position: 'top',
            });
            eventMember[field] = initalVal;
          }
        })
        .catch((e) => {
          //  this.errors.push(e);
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
          eventMember[field] = initalVal;
        });
    },
  },
  destroyed() {
    window.removeEventListener('storage', this.oauth2SuccessCheck);
  },
};
</script>
