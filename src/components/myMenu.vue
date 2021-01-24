<template>
  <div class="row">
    <div class="q-pa-md" :class="`${cWidth < 1150 ? 'col-12' : 'col'}`">
      <q-table
        title="Menu Items"
        :columns="columns"
        :data="data"
        color="primary"
        row-key="eventmemberidUI"
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
          <q-btn
            color="primary"
            icon-right="publish"
            label="Publish Meni"
            title="CSV or XLS file accepted"
            no-caps
            disabled="disabled"
            @click="addNewItemLayout = true"
          />
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
            <q-td key="itemtype" :props="props">
              {{ props.row.itemtype }}
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
                      @click="editMe(props.row.itemdetailsid)"/>
            </q-td>
            <q-td v-if="!select" key="delete" :props="props">
              <q-icon name="delete" size="2rem" color='negative' class=""
                      style="cursor:pointer;"
                      @click="deleteMe(props.row.itemdetailsid)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-dialog v-model="addNewItemLayout">
        <q-layout container class="bg-white" style="max-height:95%;min-width: 95%">
          <q-header class="bg-primary">
            <q-toolbar>
              <q-toolbar-title>Add Item</q-toolbar-title>

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
                  <div class="col-9">
                    <div class="row  q-gutter-md q-pa-xs q-pr-md">
                      <div class="col-10">
                        <q-input
                          type="text"
                          v-model="itemTitle"
                          label="Item Title"
                          lazy-rules
                          unmasked-value
                          fill-mask="#"
                        />
                      </div>
                      <div class="col-5">
                        <q-input
                          type="number"
                          v-model="price"
                          label="Price"
                          lazy-rules
                          mask="#.#"
                          step="0.01"
                        />
                      </div>
                      <div class="col-5">
                        <q-input
                          type="number"
                          v-model="saleprice"
                          label="Sale Price"
                          lazy-rules
                          mask="#.#"
                          step="0.01"
                        />
                      </div>
                      <!--
                      <q-toggle v-model="accept" label="I accept the license and terms" />
                      -->
                      <div class="col-10">
                        Description
                        <q-editor v-model="editor" min-height="5rem" label="Description"/>
                      </div>
                      <div class="col-10">
                        <q-btn-toggle
                          v-model="orderVisibleModel"
                          push
                          glossy
                          toggle-color="primary"
                          :options="orderVisibleOptions"
                          @click="toggleOption"
                        />&nbsp;&nbsp;<b text-color="primary">{{optionData}}</b>
                      </div>
                      <div class="col-10">
                        <q-select label="How long does it take to prepare orders?"
                                  v-model="prepTime"
                                  :options="orderPrepOptions"></q-select>
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

                  <div class="col-3">
                    <q-uploader
                      label="Item Image"
                      auto-upload
                      url=""
                      style="width: 100%;min-height: 90%"
                      multiple
                    />
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
      orderVisibleModel: '1',
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
      data: [{
        itemname: 'vgdsxcvxz', itemtype: null, price: '33', saleprice: '33', stock: null, status: null, delete: null,
      }],
      edit: false,

      itemTitle: null,
      type: null,
      stock: null,
      available: null,
      price: null,
      saleprice: null,
      prompt: true, // Delete Prompt
    };
  },
  created() {
    this.loadItems();
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
        });
      axios
        .get('/api/userItems/itemsStatus')
        .then((response) => {
          this.orderVisibleOptions = response.data.data;
          if (response.data.data !== null) {
            this.orderVisibleModel = 1;
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
        .delete(`/api/userEvents/userguest/${id}`)
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
    onFormReset() {
      this.name = null;
      this.price = null;
      this.stock = null;
      this.available = null;
      this.type = null;
    },
    onFormSubmit() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .post('/api/userItems/item', {
          itemname: this.itemTitle,
          saleprice: this.saleprice,
          price: this.price,
          stock: this.stock,
          status: this.orderVisibilityModel,
          country: this.$q.localStorage.getItem('country-token'),
          timeforpreperation: this.prepTime,
          itemtype: this.editor,
        })
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
            Loading.hide();
            this.$refs.addContact.reset();
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Could not add Contact, User Phone or available Already exists',
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
            message: e.data.message,
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
