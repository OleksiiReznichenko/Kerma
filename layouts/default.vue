<template>
    <div>
    <!-- <SingularAppPreloader /> -->
        <SingularAppNavigationOpener />
        <SingularAppOverflowingNavigation />
        <SingularAppSocials class="desktop" />
        <SingularAppGameInfo />
        <SingularAppNavigationMobile class="mobile" />
        <slot />
    </div>
</template>