<template>
  <scroll-view>
    <nb-list>
      <nb-list-item v-for="sabota in sabotas" :key="sabota.id">
        <nb-text>{{sabota.body}}</nb-text>
      </nb-list-item>
    </nb-list>
  </scroll-view>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      title: 'Home Screen'
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    sabotas () {
      return this.$store.state.sabotas
    }
  },
  created () {
    this.$store.dispatch('fetchTodos')
    this.$store.dispatch('fetchSabotas')
  },
  methods: {
    goToScreen1 () {
      this.navigation.navigate('ScreenOne')
    }
  }
}
</script>
