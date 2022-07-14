<template>
    <div class="page game-history">
        <SingularGameHistoryPageDetailsWindow />
        <main>
            <SingularGameHistoryPageInfo />            
        </main>
    </div>
</template>

<style lang="scss" scoped>
.page {

    @media only screen and (max-width: 1200px) and (min-height: 1000px) and (min-width: 850px) {
        @include flex-center;
        flex-direction: column;
    }

    main {
        
        @media only screen and (max-width: 1200px) and (min-height: 1000px) and (min-width: 850px) {
            // margin-top: -10vh;
        }
    }
}
</style>