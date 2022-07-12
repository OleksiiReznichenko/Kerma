<template>
    <div class="main-content">
        <div class="flex-container">
            <SingularGamePlaceBet />
            <SingularGameDonate />
        </div>
        <SingularGameMainInfo />
    </div>
</template>

<style lang="scss" scoped>
.main-content {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: auto;
    position: relative;
    z-index: 1000;
        
    @media only screen and (max-width: 1200px) and (min-height: 750px) and (min-width: 850px) {
        margin-top: -10rem;
    }
    
    @media only screen and (max-width: 850px) {
        display: block;
        width: 100%;
        margin: 0 auto;
        margin-top: 10rem;
    }
}

.flex-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 3rem;
    margin-bottom: 3rem;
        
    @media only screen and (max-width: 1200px) {
        grid-template-columns: 61.5% 34.5%;
    }
    
    @media only screen and (max-width: 850px) {
        display: block;
        margin-bottom: 4rem;
    }
}
</style>