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
      :table-header-style="{ backgroundColor: '#003755', color: '#FFFFFF' }"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Import to csv"
          no-caps
          @click="exportTable"
        />
        <q-btn
          color="secondary"
          icon-right="cloud_upload"
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
        <q-tr :props="props" >
          <q-td  key="firstname" :props="props">
             {{ props.row.firstname }}
            <q-popup-edit v-model="props.row.firstname" title="Edit the Name" buttons
            :validate="firstnameValidation"
              @hide="firstnameValidation">
              <q-input v-model="props.row.firstname" dense autofocus counter  :error="errorProtein"
                :error-message="errorMessageProtein"/>
            </q-popup-edit>
          </q-td>
          <q-td  key="lastname" :props="props">
             {{ props.row.lastname }}
            <q-popup-edit v-model="props.row.lastname" title="Edit the Name" buttons>
              <q-input v-model="props.row.lastname" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td  key="primaryPhone" :props="props">
             {{ props.row.primaryPhone }}
            <q-popup-edit v-model="props.row.primaryPhone" title="Edit the Phone" buttons>
              <q-input v-model="props.row.primaryPhone" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td  key="secondaryPhone" :props="props">
             {{ props.row.secondaryPhone }}
            <q-popup-edit v-model="props.row.secondaryPhone" title="Edit the phone" buttons>
              <q-input v-model="props.row.secondaryPhone" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td  key="email" :props="props">
             {{ props.row.email }}
            <q-popup-edit v-model="props.row.email" title="Edit the Email" buttons>
              <q-input v-model="props.row.email" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="delete" :props="props">
            <img src="~assets/icon/delete-file-icon.png"
            style="cursor:pointer;" @click="deleteMe(props.row.eventmemberid)">
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile } from 'quasar';
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
  methods: {
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
        });
      }
    },
    deleteMe(id) {
      // naive encoding to csv format


      this.$q.notify({
        message: `Browser denied file download...${id}`,
        color: 'negative',
        icon: 'warning',
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
          required: true,
          label: 'Last Name',
          align: 'left',
          field: (row) => `${row.lastname}`,
          sortable: true,
        },
        {
          name: 'primaryPhone',
          align: 'center',
          label: 'Primary Phone *',
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
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: e.message,
          position: 'top',
        });
      });
  },
};
</script>
