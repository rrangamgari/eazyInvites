<template>
  <div class="row">
    <div class="q-pa-md" :class="`${cWidth < 1150 ? 'col-12' : 'col'}`">
      <q-table
        title="Contacts"
        :columns="columns"
        color="primary"
        row-key="eventmemberidUI"
        icon-left="people"
        no-data-label="Add Contacts to view them here"
        no-results-label="No matching Contacts found"
        :selected-rows-label="getSelectedString"
        hide-pagination
        :hide-selected-banner="!select"
        :filter="filter"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        :table-header-style="{ backgroundColor: '#05944F', color: '#FFFFFF' }"
        :visible-columns="select ? visible : visible.concat('consent','delete')"
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
        <template v-if="$q.screen.lt.sm" v-slot:header="props">
          <!-- Mobile View Table Header -->
          <q-tr :props="props" class="bg-primary">
            <q-th auto-width v-if="select" style="padding:7px;">
              <q-checkbox dense :val="props.data" v-model="props.selected"/>
            </q-th>
            <q-th class="row" style="padding:0px;">
              <q-th
                key="name"
                :props="props"
                class="text-white"
                style="font-size:14px; font-weight:bold;
                border-bottom-width:0px; padding-right:3px;"
              >Name
              </q-th>
              <q-th
                key="type"
                :props="props"
                class="text-white"
                style="font-size:14px; font-weight:bold; border-bottom-width:0px;
               padding-left:3px; padding-right:10px;"
              >Type
              </q-th>
              <q-th
                key="price"
                :props="props"
                class="text-white col-12"
                style="font-size:14px; font-weight:bold; border-bottom-width:0px;"
              >Price
                <q-icon
                  name="contact_phone"
                  size="2.5em"
                />
              </q-th>
              <q-th
                key="stock"
                :props="props"
                class="text-white col-12"
                style="font-size:14px; font-weight:bold; border-bottom-width:0px;"
              >Stock
              </q-th>
            </q-th>
            <q-th
              key="delete"
              :props="props"
              class="text-white"
              style="font-size:14px; font-weight:bold; border-bottom-width:0px;"
            >Delete
              <!-- <q-icon
                name="delete"
                size="2.5em"
              /> -->
            </q-th>
          </q-tr>
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
            <!-- <q-icon
              name="contact_phone"
              size="2.5em"
              v-show="props.col.name == 'secondaryPhone'"
            /> -->
            <q-icon
              name="delete"
              size="2.5em"
              v-if="props.col.name == 'delete'"
            />
          </q-th>
        </template>
        <template v-if="$q.screen.gt.xs" v-slot:body="props">
          <q-tr :props="props" v-if="!props.row.consent||!select">
            <q-td auto-width v-if="select">
              <q-checkbox :val="props.row" v-model="props.selected"/>
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit
                v-model="props.row.name"
                title="Edit Name"
                buttons
                :validate="nameValidation"
                @hide="nameValidation"
                @save="(v, iv) => save(v, iv, props.row, 'name')"
              >
                <q-input
                  v-model="props.row.name"
                  dense
                  autofocus
                  counter
                  :error="errorProtein"
                  :error-message="errorMessageProtein"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="type" :props="props">
              {{ props.row.type }}
              <q-popup-edit
                v-model="props.row.type"
                title="Edit Type"
                buttons
                @save="(v, iv) => save(v, iv, props.row, 'type')"
              >
                <q-input v-model="props.row.type" dense autofocus counter/>
              </q-popup-edit>
            </q-td>
            <q-td key="stock" :props="props">
              {{ props.row.stock }}
              <q-popup-edit
                v-model="props.row.stock"
                title="Edit Phone"
                buttons
                @save="(v, iv) => save(v, iv, props.row, 'stock')"
              >
                <q-input
                  v-model="props.row.stock"
                  dense
                  autofocus
                  counter
                />
              </q-popup-edit>
            </q-td>
            <q-td key="secondaryPhone" :props="props">
              {{ props.row.secondaryPhone }}
              <q-popup-edit
                v-model="props.row.secondaryPhone"
                title="Edit phone"
                buttons
                @save="(v, iv) => save(v, iv, props.row, props.key)"
              >
                <q-input
                  v-model="props.row.secondaryPhone"
                  dense
                  autofocus
                  counter
                />
              </q-popup-edit>
            </q-td>
            <q-td key="available" :props="props">
              {{ props.row.available }}
              <q-popup-edit
                v-model="props.row.available"
                title="Edit available"
                buttons
                @save="(v, iv) => save(v, iv, props.row, 'available')"
              >
                <q-input v-model="props.row.available" dense autofocus counter/>
              </q-popup-edit>
            </q-td>
            <q-td v-if="!select" key="consent" :props="props">
              <q-toggle
                v-model="props.row.consent"
                checked-icon="check"
                color="red"
                label=""
                unchecked-icon="clear"
                disable
              />
            </q-td>
            <q-td v-if="!select" key="delete" :props="props">
              <q-icon name="delete" size="2rem" color='primary' class=""
                      style="cursor:pointer;"
                      @click="deleteMe(props.row.eventmemberidUI)"/>
            </q-td>
          </q-tr>
        </template>
        <template v-else v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width v-if="select" style="height:auto;">
              <q-checkbox :val="props.row" v-model="props.selected"/>
            </q-td>
            <q-td class="row" style="padding:0px; height:auto;">
              <div key="firstname" :props="props" style="border-bottom-width:0px; height:auto;
           padding:7px 16px; padding-right:3px;">
                {{ props.row.firstname }}
                <q-popup-edit
                  v-model="props.row.firstname"
                  title="Edit First Name"
                  buttons
                  :validate="firstnameValidation"
                  @hide="firstnameValidation"
                  @save="(v, iv) => save(v, iv, props.row, 'firstname')"
                >
                  <q-input
                    v-model="props.row.firstname"
                    dense
                    autofocus
                    counter
                    :error="errorProtein"
                    :error-message="errorMessageProtein"
                  />
                </q-popup-edit>
              </div>
              <div key="type" :props="props" style="border-bottom-width:0px; height:auto;
           padding:7px 16px; padding-left:3px; padding-right:10px;">
                {{ props.row.type }}
                <q-popup-edit
                  v-model="props.row.type"
                  title="Edit Last Name"
                  buttons
                  @save="(v, iv) => save(v, iv, props.row, 'type')"
                >
                  <q-input v-model="props.row.type" dense autofocus counter/>
                </q-popup-edit>
              </div>
              <div key="stock" :props="props" class="col-12"
                   style="border-bottom-width:0px; height:auto; padding:7px 16px;">
                {{ props.row.stock }}
                <q-popup-edit
                  v-model="props.row.stock"
                  title="Edit Phone"
                  buttons
                  @save="(v, iv) => save(v, iv, props.row, 'stock')"
                >
                  <q-input
                    v-model="props.row.stock"
                    dense
                    autofocus
                    counter
                  />
                </q-popup-edit>
              </div>
              <div key="available" :props="props" class="col-12"
                   style="border-bottom-width:0px; height:auto; padding:7px 16px;">
                {{ props.row.available }}
                <q-popup-edit
                  v-model="props.row.available"
                  title="Edit available"
                  buttons
                  @save="(v, iv) => save(v, iv, props.row, 'available')"
                >
                  <q-input v-model="props.row.available" dense autofocus counter/>
                </q-popup-edit>
              </div>
            </q-td>
            <q-td v-if="!select" key="delete" :props="props">
              <q-icon name="delete" size="2rem" color='primary' class=""
                      style="cursor:pointer;"
                      @click="deleteMe(props.row.eventmemberidUI)"/>
            </q-td>
            <q-td v-if="!select" key="delete" :props="props">
              <q-icon name="delete" size="2rem" color='primary' class=""
                      style="cursor:pointer;"
                      @click="deleteMe(props.row.eventmemberidUI)"/>
            </q-td>
          </q-tr>
        </template>
        <template v-if="$q.screen.gt.xs" v-slot:bottom-row>
          <q-tr v-if="select && edit">
            <q-td colspan="100%">Contacts already Invited</q-td>
          </q-tr>
        </template>
        <template v-else v-slot:bottom-row>
          <q-tr v-if="select && edit">
            <q-td colspan="100%">Contacts already Invited</q-td>
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
                        />
                      </div>
                      <div class="col-5">
                        <q-input
                          type="number"
                          v-model="saleprice"
                          label="Sale Price"
                          lazy-rules
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
                          v-model="model"
                          push
                          glossy
                          toggle-color="primary"
                          :options="[
          {label: 'Visible', value: 'one'},
          {label: 'Hidden', value: 'two'},
          {label: 'Unavailable', value: 'three'}
        ]"
                          @click="toggleOption"
                        />&nbsp;&nbsp;&nbsp;&nbsp; <b text-color="primary">{{optionData}}</b>
                      </div>
                      <div class="col-10">
                        <q-select label="How long does it take to prepare orders?"
                                  v-model="prepTime"
                                  :options="options"></q-select>
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
  name: 'addContactsComponent',
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
      addNewItemLayout: true,
      filter: '',
      errorMessageProtein: '',
      errorProtein: false,
      uploadContactsModel: '',
      model: 'one',
      editor: '',
      prepTime: '',
      options: [
        { value: 1, label: 'Available Immediately (No Prep Time)' },
        { value: 2, label: '5 Minutes' },
        { value: 3, label: '10 Minutes' },
        { value: 4, label: '15 Minutes' },
        { value: 5, label: '30 Minutes' },
      ],
      optionData: 'Your item is ready to sell online and will show up in navigation & search results.',
      headerFunc: [
        {
          name: 'authorization',
          value:
              `Bearer ${this.$q.localStorage.getItem('login-token')}`,
        }],
      visible: ['itemTitle', 'type', 'stock', 'available'],
      columns: [
        {
          name: 'itemTitle',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'itemTitle',
          sortable: true,
        },
        {
          name: 'type',
          label: 'Type',
          align: 'left',
          field: 'type',
          sortable: true,
        },
        {
          name: 'price',
          align: 'left',
          label: 'Price',
          required: true,
          field: 'price',
          sortable: true,
          format: '### ### ####',
          headerStyle: 'icon-right:archive',
        },
        {
          name: 'stock',
          label: 'Stock',
          field: 'stock',
          align: 'left',
          sortable: true,
          icon: 'contacts',
        },
        {
          name: 'available',
          label: 'In Stock',
          field: 'available',
          align: 'center',
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
      data: this.contacts || [],
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
    this.loadContacts();
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
      this.uploadContactsModel = null;
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
                : row[col.field === void 0 ? col.itemTitle : col.field],
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
    loadContacts() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .get('/api/userEvents/userguestlist')
        .then((response) => {
          this.data = response.data.data;

          Loading.hide();
          // this.data = this.data.concat(response.data.data);
        })
        .catch((e) => {
          //  this.errors.push(e);
          Loading.hide();
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
    },
    toggleOption() {
      if (this.model === 'one') {
        this.optionData = 'Your item is ready to sell online and will show up in navigation & search results.';
      }
      if (this.model === 'two') {
        this.optionData = 'Your item is available for purchase but only to those who have the link. Useful for exclusive items.';
      }
      if (this.model === 'three') {
        this.optionData = 'Not ready to sell? Hide your item until it\'s ready to be published to your site.';
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
            this.loadContacts();
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
        .post('/api/userItem/item', {
          itemtitle: this.itemTitle,
          saleprice: this.saleprice,
          price: this.price,
          stock: this.stock,
          available: this.available,
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
            // this.loadContacts();
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
    uploadOAuth2Contacts(client) {
      window.addEventListener('storage', this.oauth2SuccessCheck);
      axios.get(`/api/oauth2/contacts/${client.toLowerCase()}?host=https://www.wepromotes.com`)
        .then((response) => {
          Loading.hide();
          window.open(response.data.data, `${client} Contacts`, `left=${Math.max(0, (window.screen.width / 2) - 250)},top=50,width=500,height=600,location=no`);
        })
        .catch((e) => {
          Loading.hide();
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
        });
    },
    oauth2SuccessCheck(evt) {
      if (evt && evt.key === 'oauth2-contacts' && this.$q.localStorage.getItem('oauth2-contacts')) {
        this.$q.localStorage.remove('oauth2-contacts');
        this.loadContacts();
      }
    },
  },
  destroyed() {
    window.removeEventListener('storage', this.oauth2SuccessCheck);
  },
};
</script>
