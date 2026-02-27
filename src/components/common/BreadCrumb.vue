<template>
  <nav class="breadcrumb mb-3 ml-2">
    <span
      v-for="(item, index) in list"
      :key="index"
      class="breadcrumb-item"
    >
      <template v-if="index !== lastIndex">
        <router-link :to="routing(item)" class="breadcrumb-link primary--text">
          {{ name(item) }}
        </router-link>
        <span class="separator"> > </span>
      </template>

      <template v-else>
        <span class="secondary--text">
          {{ name(item) }}
        </span>
      </template>
    </span>
  </nav>
</template>

<script>
  import _ from 'lodash'
  import ROUTE from '@resources/route.js'
  export default {
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      lastIndex() {
        return this.list.length - 1
      },
    },
    methods: {
      routing(target) {
        return _.get(_.find(ROUTE, { name: target }), 'path', '/~')
      },
      name(item) {
        return _.get(_.find(ROUTE, { name: item }, []), 'meta.title', 'xxx')
      },
    },
  }
</script>

<style scoped>
.breadcrumb-link {
  text-decoration: none;
  cursor: pointer;
}

.separator {
  margin: 0 6px;
}

.breadcrumb-link:hover {
  text-decoration: none;
}
</style>