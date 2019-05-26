<template>
  <NbCard>
    <NbCardItem bordered>
      <NbBody>
        <NbText>
          {{ comment.body }}
        </NbText>
        <NbText>
          {{ comment.postUser.username }}
        </NbText>
      </NbBody>
    </NbCardItem>
  </NbCard>
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
