<template>
  <div class="row">
    <div class="q-pa-md" :class="`${cWidth < 1150 ? 'col-12' : 'col'}`">
      <q-table
        title="Orders"
        :data="data.filter((e) => !e.readonly)"
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
        :visible-columns="select ? visible : visible.concat('delete')"
        :selection="select ? 'multiple' : 'none'"
        :selected="selected"
        @update:selected="(newSelected) => $emit('update:selected', newSelected)"
        :style="`max-height: ${$q.screen.lt.sm ? 'none' : ($q.screen.height * 2 / 3)+'px'}`"
        class="my-sticky-virtscroll-table"
      >
        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center">
            <span>{{ message }}</span>
          </div>
        </template>
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
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
              v-if="props.col.label == 'Email'"
            />
            <q-icon
              name="contact_phone"
              size="2.5em"
              v-if="props.col.name == 'primaryPhone'"
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
          <q-tr :props="props">
            <q-td auto-width v-if="select">
              <q-checkbox :val="props.row" v-model="props.selected"/>
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.members.firstname }}
            &nbsp;
              {{ props.row.members.lastname }}
            </q-td>
            <q-td key="primaryPhone" :props="props">
              {{ props.row.members.primaryPhone }}
            </q-td>
            <q-td key="item" :props="props">
              {{ props.row.item }}
            </q-td>
            <q-td key="qty" :props="props">
              {{ props.row.qty }}
              <q-popup-edit
                v-model="props.row.qty"
                title="Edit Quantity"
                buttons
                @save="(v, iv) => save(v, iv, props.row, 'qty')"
              >
                <q-input v-model="props.row.qty" type="number" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status.label }}
              <q-popup-edit
                v-model="props.row.status"
                title="Edit Status"
                buttons
                @save="(v, iv) => save(v, iv, props.row, 'status')"
              >
                <q-select v-model="props.row.status"
                          :options="orderStatusOptions" label="Standard" />
              </q-popup-edit>
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
          <q-tr v-for="row in data.filter((e) => e.readonly)" :key="row.eventmemberidUI"
                class="selected">
            <q-td auto-width v-if="select">
              <q-checkbox :value="true" disable/>
            </q-td>
            <q-td>
              {{ row.firstname }}
              <q-popup-edit
                v-model="row.firstname"
                title="Edit First Name"
                buttons
                :validate="firstnameValidation"
                @hide="firstnameValidation"
                @save="(v, iv) => save(v, iv, row, 'firstname')"
              >
                <q-input
                  v-model="row.firstname"
                  dense
                  autofocus
                  counter
                  :error="errorProtein"
                  :error-message="errorMessageProtein"
                />
              </q-popup-edit>
            </q-td>
            <q-td>
              {{ row.lastname }}
              <q-popup-edit
                v-model="row.lastname"
                title="Edit Last Name"
                buttons
                @save="(v, iv) => save(v, iv, row, 'lastname')"
              >
                <q-input v-model="row.lastname" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td>
              {{ row.primaryPhone }}
              <q-popup-edit
                v-model="row.primaryPhone"
                title="Edit Phone"
                buttons
                @save="(v, iv) => save(v, iv, row, 'primaryPhone')"
              >
                <q-input
                  v-model="row.primaryPhone"
                  dense
                  autofocus
                  counter
                />
              </q-popup-edit>
            </q-td>
            <q-td>
              {{ row.email }}
            </q-td>
            <q-td>
              {{ row.item }}
            </q-td>
            <q-td>
              {{ row.qty }}
            </q-td>
            <q-td v-if="!select">
              <q-icon name="delete" size="2rem" color='primary' class=""
                      style="cursor:pointer;"
                      @click="deleteMe(row.eventmemberidUI)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-dialog v-model="uploadContactsLayout">
        <q-layout container class="bg-white" style="max-height:300px;">
          <q-header class="bg-primary">
            <q-toolbar>
              <q-toolbar-title>Upload Contacts</q-toolbar-title>

              <q-btn flat v-close-popup round dense icon="close"/>
            </q-toolbar>
          </q-header>
          <q-page-container>
            <q-page padding>
              <q-uploader
                field-name="file"
                url= '/api/userEvents/userguestupload'
                method="POST"
                :headers=headerFunc
                label="Files"
                color="teal"
                flat
                bordered
                no-thumbnails
                style="max-width: 300px"
              />
            </q-page>
          </q-page-container>
        </q-layout>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { exportFile, Loading, QSpinnerBars } from 'quasar';
import axios from 'axios';
import newOrderDialog from './newOrderDialog.vue';


axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

function wrapCsvValue(val, formatFn) {
  // eslint-disable-next-line no-void
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  // eslint-disable-next-line no-void
  formatted = formatted === void 0 || formatted === null ? '' : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default {
  name: 'currentOrdersComponent',
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
      uploadContactsLayout: false,
      filter: '',
      errorMessageProtein: '',
      errorProtein: false,
      uploadContactsModel: '',
      headerFunc: [
        {
          name: 'authorization',
          value:
              `Bearer ${this.$q.localStorage.getItem('login-token')}`,
        }],
      visible: ['name', 'primaryPhone', 'item', 'qty', 'status'],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'primaryPhone',
          align: 'left',
          label: 'Phone',
          required: true,
          field: 'primaryPhone',
          sortable: true,
          headerStyle: 'icon-right:archive',
        },
        {
          name: 'item',
          label: 'Item',
          field: 'item',
          align: 'left',
          sortable: true,
        },
        {
          name: 'qty',
          label: 'Quantity',
          field: 'qty',
          align: 'center',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'left',
          sortable: true,
        },
        {
          name: 'delete',
          label: 'Delete',
          align: 'right',
          sortable: false,
        },
      ],
      getSelectedString: (n) => `${n} Contact${n > 1 ? 's' : ''} selected`,

      pagination: { rowsPerPage: 0 },
      data: this.contacts || [],
      edit: false,
      orderStatusOptions: [{ value: 0, label: 'All' }],
      firstname: null,
      lastname: null,
      phone: null,
      phone2: null,
      email: null,

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
    isValidEmail(val) {
      if ((this.phone === null || this.phone === '') && val !== '') {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      }
      return null;
    },
    isValidPhone(val) {
      console.log(this.email);
      if ((this.email === null || this.email === '') && (val === null || val === '')) {
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
      this.submitResult = submitResult;
    },
    onReset() {
      this.uploadContactsModel = null;
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.data.map((row) => this.columns
            .map((col) => wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
              // eslint-disable-next-line no-void
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
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
    loadOrders() {
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .get('/api/orders/newOrder')
        .then((response) => {
          this.data = response.data.data;
          // console.log(response.data);
          if (response.data.data !== null) {
            this.$q.dialog({
              component: newOrderDialog,
              persistent: true,
              orderData: response.data.data,
              message: `${response.data.data.members.firstname} ${response.data.data.members.lastname} (${response.data.data.members.primaryPhone}) has Ordered '${response.data.data.item}' with Quantity ('${response.data.data.qty}').`,
              // parent: this,
            }).onOk((me) => {
              console.log('OK');
              this.eventmessage = me;
              // this.$router.push('/events');
              console.log('OK2');
            });
            axios
              .put('/api/orders/newOrder', response.data.data).then((response1) => {
                console.log(response1.data.data);
              });
          }
          if (this.selected.length > 0) {
            const id = new Set(this.selected.filter((em) => em.readonly)
              .map((em) => em.eventmemberidUI));
            this.data.forEach((c) => {
              if (id.has(c.eventmemberidUI)) c.readonly = true;
            });
            this.edit = id.size > 0;
            this.$emit('update:selected', []);
          }

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
    loadContacts() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      setInterval(() => this.loadOrders(), 10000);
      axios
        .get('/api/orders/orderstatus')
        .then((Response) => {
          this.orderStatusOptions = this.orderStatusOptions.concat(Response.data.data);
        });
      axios
        .get('/api/orders/current')
        .then((response) => {
          this.data = response.data.data;
          if (this.selected.length > 0) {
            const id = new Set(this.selected.filter((em) => em.readonly)
              .map((em) => em.eventmemberidUI));
            this.data.forEach((c) => {
              if (id.has(c.eventmemberidUI)) c.readonly = true;
            });
            this.edit = id.size > 0;
            this.$emit('update:selected', []);
          }

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
      Loading.hide();
    },
    // delete(contact) {
    //   this.$q.dialog({
    //     title: 'Confirm Delete',
    //     message: 'Are you sure, you want to delete this contact?',
    //     cancel: true,
    //     options: {
    //       type: 'checkbox',
    //       model: !this.prompt,
    //       items: [
    //         { label: 'Do not prompt again', value: true },
    //       ],
    //     },
    //   }).onOk(() => {
    //     console.log(contact, this.prompt);
    //     console.log('>>>> OK');
    //   }).onOk(() => {
    //     console.log('>>>> second OK catcher');
    //   }).onCancel(() => {
    //     console.log('>>>> Cancel');
    //   });
    // },
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
    firstnameValidation(val) {
      if (val === '') {
        this.errorProtein = true;
        this.errorMessageProtein = 'Firstname cannot be empty';
        return false;
      }
      this.errorProtein = false;
      this.errorMessageProtein = '';
      return true;
    },
    onFormReset() {
      this.firstname = null;
      this.lastname = null;
      this.phone = null;
      this.phone2 = null;
      this.email = null;
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
        .post('/api/userEvents/userguest', {
          firstname: this.firstname,
          lastname: this.lastname,
          primaryPhone: this.phone,
          secondaryPhone: this.phone2,
          email: this.email,
          country: this.$q.localStorage.getItem('country-token'),
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
              message: 'Could not Add Contact',
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
    uploadOAuth2Contacts(client) {
      window.addEventListener('storage', this.oauth2SuccessCheck);
      axios.get(`/api/oauth2/contacts/${client.toLowerCase()}/`)
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
<style lang="sass">
  .my-sticky-virtscroll-table
    /* height or max-height is important */

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

    thead tr th
      position: sticky
      z-index: 1
    /* this will be the loading indicator */
    thead tr:last-child th
      /* height of all previous header rows */
      top: 48px
    thead tr:first-child th
      top: 0
</style>
