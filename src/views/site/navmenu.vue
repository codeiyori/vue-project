<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="v-list-item_content">
      <v-list-item-title class="title black--text text-sm-h7 font-weight-bold">
        CODEMIB
      </v-list-item-title>
      <v-list-item-subtitle class="title text-caption">
        Let's have some fun!
      </v-list-item-subtitle>
    </div>
      <v-divider></v-divider>
    <v-list-item
      prepend-avatar="https://avatars.githubusercontent.com/u/126932805?s=400&u=cc2f1b04a4183054030b56d733dbccddbf444f86&v=4"
      title="IU"
      subtitle="dev"
    >
    </v-list-item>
    <v-divider></v-divider>

    <v-list v-model:opened="open">
      <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

      <v-list-group value="Users" >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            color= 'green-darken-1'
            prepend-icon="mdi-account-circle"
            title="Users"
          ></v-list-item>
        </template>

        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              color= 'green-darken-1'
              prepend-icon="mdi-account-circle"
              title="Admin"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon, color], i) in admins"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :color="color"
            :value="title"
          ></v-list-item>
        </v-list-group>

        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              color= 'green-darken-1'
              title="Actions"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon, color], i) in cruds"
            :key="i"
            :value="title"
            :title="title"
            :color="color"
            :prepend-icon="icon"
          ></v-list-item>

        </v-list-group>

      </v-list-group>

    </v-list>

    <v-list-item v-for="item in items" :key="item.title" :to="item.to">
      <template v-slot:prepend>
        <v-list-item-action>
          <v-icon :color="item.color" :size="item.size">{{ item.prependIcon }}</v-icon>
        </v-list-item-action>
      </template>
          {{ item.title }}
    </v-list-item>
</template>
<style>
.v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
    padding-inline-start: 16px !important;
}
.v-list-item_content {
    padding-top: 5px;
    padding-bottom: 5px;
}
  /* .v-list-item__content {
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: normal;
    line-height: 1rem;
  } */
</style>

<script>
export default {
  data: () => ({
    items: [
      {
        prependIcon: 'mdi-home',
        title: 'Home',
        size: 'small',
        color: 'green-darken-1',
        subItems: [
          {
            title: 'Dashboard',
            to: '/'
          },
          {
            title: 'About',
            to: '/about'
          }
        ]
      },
      {
        prependIcon: 'mdi-information',
        title: 'About',
        active: true,
        to: '/about',
        size: 'small',
        color: 'blue-darken-1',
        subItems: [
          {
            title: 'test123',
            to: '/test123'
          }
        ]
      },
      {
        prependIcon: 'mdi-information',
        title: 'test123',
        to: '/test123',
        size: 'small',
        color: 'orange-darken-1'
      }
    ],
    open: ['Users'],
    admins: [
      ['Management', 'mdi-account-multiple-outline', 'red'],
      ['Settings', 'mdi-cog-outline', 'red']
    ],
    cruds: [
      ['Create', 'mdi-plus-outline', 'red'],
      ['Read', 'mdi-file-outline', 'red'],
      ['Update', 'mdi-update', 'red'],
      ['Delete', 'mdi-delete', 'red']
    ]
  })
}
</script>
