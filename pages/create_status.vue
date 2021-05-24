<template>
  <div class="">
    <v-container>
      <v-card class="pa-8">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="status.name"
              label="Title"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <label class="ml-3"> Select color </label>
          <select v-model="status.color" :class="`${status.color} mx-3 text-center`" style="text-indent: 27.5%; width:150px; border: 1px black solid; ">
            <option v-for="color in kebabColors" :class="`${color} text-center mx-auto`" :key="color">
              {{ color }}
            </option>
          </select>
        </v-row>
      </v-card>
      <v-btn @click="createStatus" class="ma-2 float-right" :color="status.color" dark>
        Create
        <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
// import vuetifyColors from 'vuetify/lib/util/colors'
import colors from 'vuetify/es5/util/colors'
import { pushStatus } from '~/utils'

export default {
  name: 'create_status',
  data() {
    return {
      status: {},
      colors: [...Object.keys(colors)],
    }
  },
  computed: {
    kebabColors() {
      const kebabize = (str) => {
        return str
          .split('')
          .map((letter, idx) => {
            return letter.toUpperCase() === letter
              ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
              : letter
          })
          .join('')
      }
      return this.colors.map(color => kebabize(color))
    },
  },
  methods:{
    createStatus(){
      pushStatus({...this.status})
      this.$router.push('/')
    }
  }
}
</script>
