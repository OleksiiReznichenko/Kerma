<template>
    <div class="page main-page">
      <div class="relative-container">
        <SingularMainPageInfo />
        <Reusable3DModel page="main" />
      </div>
    </div>
</template>

<style lang="scss" scoped>
.page {
  margin-top: 0;
  padding-bottom: 0;
  overflow: hidden;

  @media only screen and (max-width: 850px) and (min-height: 600px),
  only screen and (max-width: 600px) {
    min-height: 110vh;
    // height: 850px;
  }

  @media only screen and (max-width: 850px) and (max-height: 500px) {
    min-height: 450px;
  }
}
</style>
