<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      flat
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" flat fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex d-md-none"/>
      <v-app-bar-nav-icon icon @click.stop="miniVariant = !miniVariant" class="d-none d-md-flex"/>
      <v-toolbar-title v-text="title" class="mx-2 mx-md-5" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Todos',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Create Status',
          to: '/create_status',
        },
      ],
      miniVariant: false,
      title: 'Todos',
    }
  },
}
</script>
