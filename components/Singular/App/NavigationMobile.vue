<script setup lang="ts">
import { storeToRefs } from 'pinia';

// MY USER OBJECT
const baseStore = useBaseStore();
const { myUser } = storeToRefs(baseStore);
</script>

<template>
    <div class="navigation-mobile mobile">
        <div class="links">
            <NuxtLink to="/game" class="link">
                <img src="@/assets/svg/pause.svg" alt="Icon" class="icon pause">
            </NuxtLink>
            <NuxtLink to="/leaderboard" class="link">
                <img src="@/assets/svg/star.svg" alt="Icon" class="icon star">
            </NuxtLink>
            <NuxtLink :to="'/users/' + myUser.id" class="link">
                <img src="@/assets/svg/user.svg" alt="Icon" class="icon user">
            </NuxtLink>
            <NuxtLink to="/gameHistory" class="link">
                <img src="@/assets/svg/eye.svg" alt="Icon" class="icon eye">
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navigation-mobile {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-radius: 30px 30px 0 0;
    padding: .5rem 1rem;
    background-color: $color-pink-light-2;
    box-shadow: 0 .5rem 1.75rem rgba(0, 0, 0, .15);
    @include flex-center;
    z-index: 1000;

    .links {
        @include flex-center;

        .link {
            padding: 1.25rem 4.25rem;
            width: 12rem;
            height: 6rem;
            border-radius: 20px;
            @include flex-center;
            // background-color: $color-pink-light-3;
            // box-shadow: 10px 11px 18px rgba(0, 0, 0, 0.08);

            &:not(:last-of-type) {
                margin-right: 1rem;
            }

            @media only screen and (max-width: 450px) {
                padding: 1.25rem 3.25rem;
                width: 10.5rem;
            }

            .icon {
                width: 3.75rem;
                height: 3.75rem;
                // filter: brightness(10%);
            }

            .eye {
                width: 4.5rem;
            }

            .pause {
                width: 4rem;
                margin-right: -2px;
            }
        }
    }
}
</style>