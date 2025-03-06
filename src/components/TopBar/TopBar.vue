<template>
  <nav class="topbar">
    <RouterLink to="/">
      <p class="topbar__title">Blogger 📱</p>
    </RouterLink>
  </nav>
</template>
<style lang="css" scoped>
.topbar {
  margin: 1rem 0 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--color-neutral);
  padding: 1rem var(--root-padding);
}

.topbar__title {
  font-size: 1.75rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
