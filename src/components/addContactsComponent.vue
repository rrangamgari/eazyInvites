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
      :table-header-style="{ backgroundColor: '#003755',
      color:'#FFFFFF' }"
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
          <q-icon name="contact_mail" size="2.5em" v-show="props.col.label=='Email'"/>
          <q-icon name="contact_phone" size="2.5em" v-show="props.col.name=='phone'"/>
          <q-icon name="contact_phone" size="2.5em" v-show="props.col.name=='sphone'"/>
          <b style="font-size:14px"> {{ props.col.label }}</b>
        </q-th>
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
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: (row) => `${row.firstname} ${row.lastname}`,
          sortable: true,
        },
        {
          name: 'phone',
          align: 'center',
          label: 'Primary Phone',
          field: 'primaryPhone',
          sortable: true,
          headerStyle: 'icon-right:archive',
        },
        {
          name: 'sphone',
          label: 'Secondary Phone (Optional)',
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
      ],

      data: [{
        firstname: 'Frozen Yogurt', primaryPhone: 159, secondaryPhone: 6.0, email: 24,
      },
      ],
    };
  },
  mounted() {
    axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem('login-token')}`;
    axios.get('/api/userEvents/userguestlist')
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
