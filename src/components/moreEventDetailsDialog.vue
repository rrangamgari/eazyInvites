<template>
<q-dialog ref="dialog" @hide="onDialogHide">
    <q-layout container :style="`height: 80%; background-color: ${body[i]}`">
      <q-header :class="`${head[i]}`">
        <q-toolbar>
          <q-tabs
            v-model="tab"
            dense
            active-color="white"
            indicator-color="white"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" no-caps label="Select More Options"/>
          </q-tabs>
          <q-space/>
          <q-btn flat round dense icon="brightness_6" @click="() => {i = (i + 1) % 2}"/>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <div class="col-xs-12 col-sm-12 col-md-12 col-xl-12
              col-lg-12 q-px-md q-py-sm">
          <q-table
            title=""
            :data="data"
            :columns="columns"
            grid
            color="primary"
            row-key="eventmemberidUI"
            icon-left="people"
            hide-bottom
            hide-header
            :rows-per-page-options="[0]"
            :pagination="{rowsPerPage: 0}"
            selection="multiple"
            :selected.sync="selected"
            :filter="filter"
            @update:selected="(newSelected) => $emit('update:selected', newSelected)"
          >
            <template v-slot:item="props">
              <div class="col-xs-12 col-sm-12 col-md-12 col-xl-12
              col-lg-12 q-px-md q-py-sm grid-style-transition"
                   :style="props.selected ? 'transform: scale(0.95);' : ''">
                <q-card :style="props.selected ? 'background-color:#F5F5F5;' : ''">
                  <q-card-section class="flex text-primary"
                                  :style="{ fontSize: '20px' }">
                    <div>
                      <q-checkbox dense v-model="props.selected" />
                      &nbsp;&nbsp;&nbsp;{{ props.row.featurename }}
                    </div>
                  </q-card-section>
                  <q-separator />
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>

export default {
  components: {
  },
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
      columns: [
        {
          name: 'featurename',
          required: true,
          label: 'Feature',
          align: 'left',
          field: (row) => `${row.featurename}`,
          sortable: true,
        },
      ],

      data: [
        {
          featurename: 'Add GPS Location',
        },
        {
          featurename: 'Remove RSVP',
        },
        {
          featurename: 'Remove Kids Option',
        },
        {
          featurename: 'Add GPS Location',
        },
      ],
      tab: this.$props.login ? 'login' : 'register',
      i: 0,
      head: ['primary', 'primary'],
      body: ['white', 'white'],
    };
  },
  mounted: {

  },
  methods: {
    onCardClick(eventdetailsid) {
      this.eventmessage = `"test"${eventdetailsid}`;
      this.$emit('ok', eventdetailsid);
      this.$emit('hide');
    },
    show() {
      this.$refs.dialog.show();
    },
    onDialogHide() {
      this.$emit('hide');
    },
    onOk() {
      this.$emit('ok');
    },
  },
};
</script>
