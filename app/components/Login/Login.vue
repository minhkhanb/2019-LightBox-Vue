<template>
  <FlexboxLayout flexDirection="row" justifyContent="space-between" id="header">
    <Label :text="msg"></Label>
  </FlexboxLayout>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Login screen ne !!!'
      };
    }
  };
</script>

<style lang="scss" scoped src="./styles.scss">
</style>