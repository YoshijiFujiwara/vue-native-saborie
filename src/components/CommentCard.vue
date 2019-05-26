<template>
  <nb-card>
    <nb-card-item bordered>
      <nb-body>
        <nb-text>
          {{ comment.body }}
        </nb-text>
        <nb-text>
          {{ comment.postUser.username }}
        </nb-text>
      </nb-body>
    </nb-card-item>
  </nb-card>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
