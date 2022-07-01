<template>
    <div class="layout">
    <!-- <SingularAppPreloader /> -->
        <SingularAppNavigationOpener />
        <SingularAppOverflowingNavigation />
        <SingularAppSocials class="desktop" />
        <SingularAppGameInfo />
        <SingularAppNavigationMobile class="mobile" />
        <slot />
    </div>
</template>