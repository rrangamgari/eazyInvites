<template>
<div class="row">
  <div v-if="cWidth < 1150" class="col-12 q-px-md q-pt-md">
  <q-card>
    <q-form
      id="addContact"
      @submit="onFormSubmit"
      @reset="onFormReset"
      class="q-pt-sm q-pb-xs q-px-xs"
      :class="`${cWidth > $q.screen.sizes.sm ? 'row' : 'q-pa-md'}`"
    >
      <q-input
        style="padding-left: 0.5%; padding-right: 0.5%;"
        :style="`${cWidth > $q.screen.sizes.sm ? 'width: 20%;' : ''}`"

        type="text"
        v-model="firstname"
        label="First Name"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Firstname']"
      />
      <q-input
        style="padding-left: 0.5%; padding-right: 0.5%;"
        :style="`${cWidth > $q.screen.sizes.sm ? 'width: 20%;' : ''}`"

        type="text"
        v-model="lastname"
        label="Last Name"
        lazy-rules
        :rules="[ val => true || 'Please enter Firstname']"
      />
      <q-input
        style="padding-left: 0.5%; padding-right: 0.5%;"
        :style="`${cWidth > $q.screen.sizes.sm ? 'width: 20%;' : ''}`"

        v-model="phone"
        label="Phone Number"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ val=> val !== null && val !== '' || 'Please enter Phone']"
      />
      <!-- <q-input
        style="padding-left: 0.5%; padding-right: 0.5%;"
        :style="`${cWidth > $q.screen.sizes.sm ? 'width: 20%;' : ''}`"

        v-model="phone2"
        label="Secondary Phone Number"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ val=> val !== null && val !== '' || 'Please enter Secondary Phone']"
      /> -->
      <q-input
        style="padding-left: 0.5%; padding-right: 0.5%;"
        :style="`${cWidth > $q.screen.sizes.sm ? 'width: 33%' : ''}
        ${cWidth > 850 ? 'padding-top: 0px; width: 30%;' : ''}`"

        type="email"
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[ val=> isValid]"
      />
      <div style="padding-left: 0.5%; padding-right: 0.53%;"
       :style="`${cWidth > $q.screen.sizes.sm ? 'width: 7%;' : ''}
        ${cWidth > 850 ? 'padding-top: 10px; width: 10%;' : ''}`">
        <q-btn :label="cWidth > $q.screen.sizes.sm ? '' : 'Add Contact'"
         :title="cWidth > $q.screen.sizes.sm ? 'Add Contact' : ''" icon="person_add"
         :dense="cWidth > $q.screen.sizes.sm" type="submit" color="primary" class="q-mr-sm"/>
        <q-btn :label="cWidth > $q.screen.sizes.sm ? '' : 'Reset'" style="margin-top: 5px;"
         :title="cWidth > $q.screen.sizes.sm ? 'Reset' : ''" icon="autorenew"
         :dense="cWidth > $q.screen.sizes.sm" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </q-card>
  </div>
  <div class="q-pa-md" :class="`${cWidth < 1150 ? 'col-12' : 'col'}`">
    <q-table
      title="Contacts"
      :data="data"
      :columns="columns"
      color="primary"
      row-key="eventmemberidUI"
      icon-left="people"
      hide-bottom
      :rows-per-page-options="[0]"
      :pagination="{rowsPerPage: 0}"
      :table-header-style="{ backgroundColor: '#18d26e', color: '#FFFFFF' }"
      :visible-columns="select ? visible : visible.concat('delete')"
      :selection="select ? 'multiple' : 'none'"
      :selected="selected"
      @update:selected="(newSelected) => $emit('update:selected', newSelected)"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="cloud_upload"
          label="Import from whatsapp"
          title="CSV or XLS file accepted"
          no-caps
          @click="uploadContactsLayout = true"
        />
        &nbsp;&nbsp;
        <q-btn
          color="primary"
          icon-right="cloud_upload"
          label="Upload contacts"
          title="CSV or XLS file accepted"
          no-caps
          @click="uploadContactsLayout = true"
        />
        &nbsp;&nbsp;
        <q-btn
          color="secondary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
      <template v-slot:header-cell="props">
        <q-th :props="props">
          <b style="font-size:14px;"> {{ props.col.label }} &nbsp;</b>
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width v-if="select">
            <q-checkbox :val="props.row" v-model="props.selected"/>
          </q-td>
          <q-td key="firstname" :props="props">
            {{ props.row.firstname }}
            <q-popup-edit
              v-model="props.row.firstname"
              title="Edit First Name"
              buttons
              :validate="firstnameValidation"
              @hide="firstnameValidation"
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
          </q-td>
          <q-td key="lastname" :props="props">
            {{ props.row.lastname }}
            <q-popup-edit
              v-model="props.row.lastname"
              title="Edit the Last Name"
              buttons
            >
              <q-input v-model="props.row.lastname" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="primaryPhone" :props="props">
            {{ props.row.primaryPhone }}
            <q-popup-edit
              v-model="props.row.primaryPhone"
              title="Edit the Phone"
              buttons
            >
              <q-input
                v-model="props.row.primaryPhone"
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
              title="Edit the phone"
              buttons
            >
              <q-input
                v-model="props.row.secondaryPhone"
                dense
                autofocus
                counter
              />
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit
              v-model="props.row.email"
              title="Edit the Email"
              buttons
            >
              <q-input v-model="props.row.email" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td v-if="!select" key="delete" :props="props">
            <q-icon name="delete" size="2rem" color='primary' class=""
                    style="cursor:pointer;"
                    @click="deleteMe(props.row.eventmemberidUI)"/>
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
  <div v-if="cWidth >= 1150" class="col-3 q-py-md q-pr-md q-mt-md">
  <q-card>
    <q-form
      id="addContact"
      @submit="onFormSubmit"
      @reset="onFormReset"
      class="q-gutter-md q-pa-md q-pr-lg"
    >
      <q-input

        type="text"
        v-model="firstname"
        label="First Name"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Firstname']"
      />
      <q-input

        type="text"
        v-model="lastname"
        label="Last Name"
        lazy-rules
        :rules="[ val => true || 'Please enter Firstname']"
      />
      <q-input

        v-model="phone"
        label="Phone Number"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ isValidPhone ]"
      />
      <!-- <q-input

        v-model="phone2"
        label="Secondary Phone Number"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ val=> val !== null && val !== '' || 'Please enter Secondary Phone']"
      /> -->
      <q-input

        type="text"
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[ isValidEmail]"
      />
      <div>
        <q-btn label="Add Contact" icon="person_add" type="submit" color="primary" class="q-mr-sm"/>
        <q-btn label="Reset" icon="autorenew" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </q-card>
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
      uploadContactsLayout: false,
      errorMessageProtein: '',
      errorProtein: false,
      uploadContactsModel: '',
      headerFunc: [
        {
          name: 'authorization',
          value:
         `Bearer ${this.$q.localStorage.getItem('login-token')}`,
        }],
      visible: ['firstname', 'lastname', 'primaryPhone', 'email'],
      columns: [
        {
          name: 'firstname',
          required: true,
          label: 'First Name *',
          align: 'left',
          field: (row) => `${row.firstname}`,
          sortable: true,
        },
        {
          name: 'lastname',
          label: 'Last Name',
          align: 'left',
          field: (row) => `${row.lastname}`,
          sortable: true,
        },
        {
          name: 'primaryPhone',
          align: 'center',
          label: 'Primary Phone',
          required: true,
          field: 'primaryPhone',
          sortable: true,
          headerStyle: 'icon-right:archive',
        },
        {
          name: 'secondaryPhone',
          label: 'Secondary Phone',
          field: 'secondaryPhone',
          sortable: true,
          icon: 'contacts',
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          sortable: true,
        },
        {
          name: 'delete',
          label: 'Delete',
          sortable: false,
          field: (row) => `${row.eventmemberidUI}`,
        },
      ],

      data: this.contacts || [],

      firstname: null,
      lastname: null,
      phone: null,
      phone2: null,
      email: null,
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
      /* axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios.defaults.headers.get.Accepts = 'multipart/form-data';
      const formData = new FormData();
      formData.append('file', this.$q.file);
      axios({
        url: '/api/userEvents/upload',
        method: 'POST',
        data: formData,
      }); */
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
          // JSON responses are automatically parsed.
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
    deleteMe(id) {
      // naive encoding to csv format
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
          if (response.data) {
            // this.mounted();
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Successfully Deleted',
              position: 'top',
            });
            this.loadContacts();
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
        .post('/api/userEvents/userguest/123', {
          firstname: this.firstname,
          lastname: this.lastname,
          primaryPhone: this.phone,
          secondaryPhone: this.phone2,
          email: this.email,
          country: this.$q.localStorage.getItem('country-token'),
        })
        .then((response) => {
          // JSON responses are automatically parsed.
          if (response.data) {
            // this.mounted();
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Successfully Added',
              position: 'top',
            });
            // this.loadContacts();
            this.data.push(
              {
                firstname: this.firstname,
                lastname: this.lastname,
                primaryPhone: this.phone,
                secondaryPhone: this.phone2,
                email: this.email,
              },
            );
            this.loadContacts();
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
  },
};
</script>
