/* eslint-disable no-void */ /* eslint-disable no-void */
<template>

  <div class="q-pa-md">
    <q-table
      title="Contacts"
      :data="data"
      :columns="columns"
      color="primary"
      row-key="name"
      icon-left="contacts"
      hide-bottom
      :pagination="{rowsPerPage: 0}"
      :table-header-style="{ backgroundColor: '#003755', color: '#FFFFFF' }"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="cloud_upload"
          label="Upload contacts"
          title="CSV or XLS file accepted"
          no-caps
          @click="uploadContactsLayout = true"
          class="platform-android-hide platform-ios-hide"/>
        <q-btn
          color="primary"
          icon-right="cloud_upload"
          label="Upload contacts"
          title="CSV or XLS file accepted"
          no-caps
          @click="captureImage"
          class="platform-android-only"/>
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
            v-show="props.col.label == 'Email'"
          />
          <q-icon
            name="contact_phone"
            size="2.5em"
            v-show="props.col.name == 'primaryPhone'"
          />
          <q-icon
            name="contact_phone"
            size="2.5em"
            v-show="props.col.name == 'secondaryPhone'"
          />
        </q-th>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="firstname" :props="props">
            {{ props.row.firstname }}
            <q-popup-edit
              v-model="props.row.firstname"
              title="Edit the Name"
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
              title="Edit the Name"
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
          <q-td key="delete" :props="props">
            <img
              src="~assets/icon/delete-file-icon.png"
              style="cursor:pointer;"
              @click="deleteMe(props.row.eventmemberid)"
            />
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
</template>

<script>
import { exportFile, Loading, QSpinnerTail } from 'quasar';
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
  components: {},
  methods: {
    onSuccess(contacts) {
      for (let i = 0; i < contacts.length; i += 1) {
        for (let j = 0; j < contacts[i].addresses.length; j += 1) {
          this.$q.notify(`Pref: ${contacts[i].addresses[j].pref} \n
            Type:            ${contacts[i].addresses[j].type}
            Formatted:       ${contacts[i].addresses[j].formatted}    \n
            Street Address:  ${contacts[i].addresses[j].streetAddress} \n
            Locality:        ${contacts[i].addresses[j].locality}     \n
            Region:          ${contacts[i].addresses[j].region}       \n
            Postal Code:     ${contacts[i].addresses[j].postalCode}   \n
            Country:         ${contacts[i].addresses[j].country}`);
        }
      }
    },
    onError(contactError) {
      this.$q.notify(contactError);
    },

    captureImage() {
      // const filter = ['displayName', 'addresses'];

      navigator.contactsPhoneNumbers.list((contacts) => {
        // this.$q.notify(contacts[1].phoneNumbers[1].HOME);
        for (let i = 0; i < contacts.length; i += 1) {
          // this.$q.notify(contacts[i]);
          // this.$q.notify(contacts[i].lastName);
          // this.$q.notify(i);
          if (contacts[i].phoneNumbers.length > 0) {
            // commentData.firstname = contacts[i].firstName;
            // commentData.lastname = contacts[i].lastName;
            let phoneNumber = '';
            let sphoneNumber = '';
            const emailId = '';
            for (let j = 0; j < contacts[i].phoneNumbers.length; j += 1) {
              const phone = contacts[i].phoneNumbers[j];
              // this.$q.notify(`===> ' + ${phone.type} + '  '
              // + ${phone.number} + ' (' + ${phone.normalizedNumber}+ ')`);
              // commentData.primaryPhone = phone.normalizedNumber;
              if (phone.type === 'MOBILE') {
                phoneNumber = phone.normalizedNumber;
              } else {
                sphoneNumber = phone.normalizedNumber;
              }
            }
            this.data.push({
              firstname: contacts[i].firstName,
              lastname: contacts[i].lastName,
              primaryPhone: phoneNumber,
              secondaryPhone: sphoneNumber,
              email: emailId,
            });
          }
        }
      }, (contactError) => {
        this.$q.notify(contactError);
      }, this.options);
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      // this.imageSrc = image.webPath;
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
      /* axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
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
    deleteMe(id) {
      // naive encoding to csv format

      this.$q.notify({
        message: `Browser denied file download...${id}`,
        color: 'negative',
        icon: 'warning',
        position: 'center',
      });
    },
    firstnameValidation(val) {
      if (val === '') {
        this.errorProtein = true;
        this.errorMessageProtein = 'The firstname cannot be empty';
        return false;
      }
      this.errorProtein = false;
      this.errorMessageProtein = 'dasasds';
      return true;
    },
  },
  data() {
    return {
      uploadContactsLayout: false,
      errorMessageProtein: '',
      errorProtein: '',
      uploadContactsModel: '',
      headerFunc: [
        {
          name: 'authorization',
          value:
         `Bearer ${this.$q.sessionStorage.getItem('login-token')}`,
        }],
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
          field: (row) => `${row.eventmemberid}`,
        },
      ],

      data: [
        {
          firstname: 'Frozen Yogurt',
          primaryPhone: 159,
          secondaryPhone: 6.0,
          email: 24,
        },
      ],
    };
  },
  mounted() {
    this.$q.cordova.on('deviceready', () => {
      // here check for your variable
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'device Ready',
        position: 'top',
      });
    });
    document.addEventListener('deviceready', () => {
      // it's only now that we are sure
      // the event has triggered
      // this.$q.notify('Device ready...');
      const options = new this.cordova.ContactFindOptions();
      options.filter = '';
      options.multiple = true;
    }, false);
    Loading.show({
      spinner: QSpinnerTail,
      spinnerColor: 'primary',
      thickness: '3',
    });
    axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
      'login-token',
    )}`;
    axios
      .get('/api/userEvents/userguestlist')
      .then((response) => {
        // JSON responses are automatically parsed.
        this.data = response.data.data;
        // this.data = this.data.concat(response.data.data);
      })
      .catch((e) => {
        //  this.errors.push(e);
        if (e.message === 'Request failed with status code 401') {
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
};
</script>
