<template>
  <div>
    <div class="q-pa-lg row warp justify-center items-center">
      <div class="col-12 q-px-md q-py-sm q-pb-lg">
        <q-card v-if="event && eventType" class="row justify-center">
          <q-card-section class="q-pa-xs col-xs-10 col-sm-6" style="font-family:
              'Montserrat', cursive;  font-weight:bolder; color:#18d26e">
            <q-card-section class="q-pa-xs">
              <div class="text-center text-decoration-underline" style="font-size: 34px;">
              {{ (event.eventtitle !== null && event.eventtitle.trim() !== '') ?
                  event.eventtitle : 'Untitled Event' }}
              </div>
              <q-btn class="absolute-top-right" flat icon="edit" round
               :to="`/editInvitation/${event.eventdetailsidUI}/${event.eventdetailsalphaid}`"/>
            </q-card-section>
            <q-card-section class="q-pa-xs row items-center">
              <div class="text-left q-px-xs col-12" style="font-size: 34px;" >
                Type: {{ eventType[event.eventtypeid-1].label }}
              </div>
              <div>&nbsp;</div>
              <div class="text-left q-px-xs col-12" style="font-size: 34px;">
                Host: {{ event.hostedby }}
              </div>
              <div>&nbsp;</div>
              <div class="text-left q-px-xs col-12" style="font-size: 20px;">
                Start: {{ (new Date(event.startdate)).toDateString() }}
              </div>
              <div>&nbsp;</div>
              <div class="text-left q-px-xs col-12" style="font-size: 20px;">
                Message: <span v-html="event.eventmessagehtml"
                               style="font-size: 18px;" class="text-grey"></span>
              </div>
            </q-card-section>
          </q-card-section>
          <q-card-section class="q-pa-xs col-xs-10 col-sm-6">
            <q-img :src="file !== null ? file : require('../assets/logo/Easy_Invites.png')"
             alt="Invitation" contain :style="`max-height: ${$q.screen.height * 2 / 3}px;`"/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-10 col-sm-6 col-md-3 q-px-md q-py-sm">
        <q-card>
          <q-card-section class="q-pa-xs">
              <div class="row justify-center items-center">
              <q-avatar icon="oval" :color="colour[1]" size="10px" /> &nbsp;
              <div class="text-subtitle2 text-center">Attending</div></div>
              <!--q-avatar style="position: absolute; top: 5px; right: 5px;"
               icon="oval" :color="colour[1]" size="15px"/-->
          </q-card-section>
          <q-card-section class="q-pa-xs row no-warp justify-center items-center">
            <div class="q-px-auto q-ma-none" style="width:70px">
              <div class="q-pt-sm text-h6 text-center">
                {{ A.adults }}
              </div>
              <!--q-icon name="person" size="25px"/-->
              <div class="text-center text-caption">
                Adults
              </div>
            </div>
            <q-separator vertical inset/>
            <div class="q-px-auto q-ma-none" style="width:70px">
              <div class="q-pt-sm text-h6 text-center">
                {{ A.kids }}
              </div>
              <!--q-icon name="person" size="25px"/-->
              <div class="text-center text-caption">
                Kids
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-10  col-sm-6 col-md-3 q-px-md q-py-sm">
        <q-card>
          <q-card-section class="q-pa-xs">
            <div class="text-subtitle2 text-center">Tentative</div>
            <q-avatar style="position: absolute; top: 5px; right: 5px;"
             icon="oval" :color="colour[2]" size="12px"/>
          </q-card-section>
          <q-card-section class="q-pa-xs row no-warp justify-center items-center">
            <div class="q-px-auto q-ma-none" style="width:70px">
              <div class="q-pt-sm text-h6 text-center">
                {{ T.adults }}
              </div>
              <!--q-icon name="person" size="25px"/-->
              <div class="text-center text-caption">
                Adults
              </div>
            </div>
            <q-separator vertical inset/>
            <div class="q-px-auto q-ma-none" style="width:70px">
              <div class="q-pt-sm text-h6 text-center">
                {{ T.kids }}
              </div>
              <!--q-icon name="person" size="25px"/-->
              <div class="text-center text-caption">
                Kids
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-10  col-sm-6 col-md-3 q-px-md q-py-sm">
        <q-card>
          <q-card-section class="q-pa-xs">
            <div class="text-subtitle2 text-center">Not Attending</div>
          </q-card-section>
          <q-card-section class="q-pa-xs row justify-center items-center">
            <div class="q-px-auto q-ma-none" style="width:70px">
              <div class="q-pt-sm text-h6 text-center">
                {{ N.count }}
              </div>
              <!--q-icon name="person" size="25px"/-->
              <div class="text-center text-caption">
                Invitees
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-10  col-sm-6 col-md-3 q-px-md q-py-sm">
        <q-card>
          <q-card-section class="q-pa-xs">
            <div class="text-subtitle2 text-center">Awaiting Response</div>
          </q-card-section>
          <q-card-section class="q-pa-xs row justify-center items-center">
            <div class="q-px-auto q-ma-none" style="width:100px">
              <div class="q-pt-sm text-h6 text-center">
                {{ R.count }}
              </div>
              <!--q-icon name="person" size="25px"/-->
              <div class="text-center text-caption">
                Yet to Respond
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-px-md q-py-lg full-width">
        <q-input class="q-pl-sm" style="max-width: 300px" borderless dense debounce="300"
         v-model="filter" placeholder="Search">
          <q-icon slot="prepend" name="search" />
        </q-input>
        <q-table
          :visible-columns.sync="['name', 'status'].concat(col)"
          :data="data"
          :columns="columns"
          :filter="filter"
          color="primary"
          rows-key="name"
          no-data-label="Add Contacts to view them here"
          no-results-label="No matching Contacts found"
          hide-pagination
          hide-selected-banner
          :pagination.sync="pagination"
          :table-header-style="{ backgroundColor: '#18d26e', color: '#FFFFFF' }"
        >
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center">
              <span>{{ message }}</span>
            </div>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props" >
              <q-avatar icon="oval" :color="colour[`${props.row.status.eventstatusid}`]"
                size="10px" />
              {{ ($q.screen.width > 350) ? props.row.status.eventstatusdescription : '' }}
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
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
  name: 'statusComponent',
  data() {
    return {
      eventId: '',
      event: null,
      eventType: null,
      file: null,
      colour: ['white', 'green', 'yellow', 'red', 'grey', 'grey', 'grey', 'grey', 'black'],
      A: { adults: 0, kids: 0 },
      T: { adults: 0, kids: 0 },
      N: { count: 0 },
      R: { count: 0 },
      filter: '',
      vCol: [],
      data: [],
      pagination: { rowsPerPage: 0 },
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: (row) => (`${row.eventMembers.firstname} ${(row.eventMembers.lastname !== null) ? row.eventMembers.lastname : ''}`).trim(),
          required: true,
          align: 'left',
          sortable: true,
        },
        {
          name: 'phone',
          label: 'Phone',
          field: (row) => (row.eventMembers.primaryPhone),
          align: 'left',
          sortable: true,
        },
        {
          name: 'email',
          label: 'Email',
          field: (row) => (row.eventMembers.email),
          align: 'left',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Status',
          required: 'true',
          align: 'left',
          field: (row) => (row.status.eventstatusid),
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    this.eventId = this.$route.params.eventId;
    this.eventAlpha = this.$route.params.eventAlpha;

    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });

    axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
      'login-token',
    )}`;

    axios
      .get(`/api/userEvents/event/${this.eventId}/${this.eventAlpha}`)
      .then((response) => {
        this.event = response.data.data;
        console.log(this.event.attachmentlink);
        if (this.event.attachmentlink !== null) {
          axios
            .get(this.event.attachmentlink, { responseType: 'arraybuffer' })
            .then((response1) => {
              const image = btoa(
                new Uint8Array(response1.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), ''),
              );
              this.file = `data:${response1.headers['content-type'].toLowerCase()};base64,${image}`;
              console.log(`file : ${this.file}`);
            })
            .catch((e) => {
              if (e.message === 'Request failed with status code 401') {
                this.$q.localStorage.remove('login-token');
                this.$router.push('/login');
              }
            });
        }

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

    axios
      .get(`/api/userEvents/guestlist/${this.eventId}`)
      .then((response) => {
        const { data } = response.data;
        this.data = data;
        let da = [];
        for (let i = 0; i < 10; i += 1) {
          da = da.concat(data.map((r, j) => (
            { ...r, index: i * data.length + j + 1 })));
        }
        this.computeCounts();
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

    axios
      .get('/api/eventSystem/eventType')
      .then((Response) => {
        this.eventType = Response.data.data;
      });
  },
  // created() {
  //   window.addEventListener('resize', this.windowResizeHandler);
  //   this.windowResizeHandler();
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.windowResizeHandler);
  // },
  methods: {
    computeCounts() {
      this.data.forEach((rec) => {
        if (rec.status.eventstatusid === 1) {
          this.A.adults += rec.headcount;
          this.A.kids += rec.kidscount;
        } else if (rec.status.eventstatusid === 2) {
          this.T.adults += rec.headcount;
          this.T.kids += rec.kidscount;
        } else if (rec.status.eventstatusid === 3) {
          this.N.count += 1;
        } else {
          this.R.count += 1;
        }
      });
    },
    // windowResizeHandler() {
    //   const vCol = ['phone', 'email'];

    //   if (this.$q.screen.width <= 450) {
    //     this.vCol = vCol.slice(0, 0);
    //   } else if (this.$q.screen.width <= 650) {
    //     this.vCol = vCol.slice(0, 1);
    //   } else {
    //     this.vCol = vCol;
    //   }
    // },
  },
  computed: {
    col() {
      const vCol = ['phone', 'email'];

      if (this.$q.screen.width <= 450) return vCol.slice(0, 0);
      if (this.$q.screen.width <= 650) return vCol.slice(0, 1);
      return vCol;
    },
  },
};
</script>
