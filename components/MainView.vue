<template>
  <div class="root">
      <h2>Hello, world!</h2>

  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
  .root {
      position: relative;
      top: calc(var(--header-height) / 2);
      height: calc(100% - var(--header-height) * 2);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: 3px solid var(--el-color-primary-dark-2);
  }
  h2 {
      color: var(--el-text-color-primary);
  }
</style>