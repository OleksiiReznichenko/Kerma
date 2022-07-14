<script setup lang="ts">
import { storeToRefs } from 'pinia';
// definePageMeta({
//     layout: false,
// });

const baseStore = useBaseStore();
const { isFullscreenChat } = storeToRefs(baseStore);

// REDIRECTION
const router = useRouter();

const redirect = (): void => {
    if (!isFullscreenChat.value) {
        router.push('/game');
    }
};
redirect();

onMounted(() => {
  // ADD WINDOW EVENT LISTENER
  window.addEventListener('resize', redirect);
})

onUnmounted(() => {
  // REMOVE WINDOW EVENT LISTENER
  window.removeEventListener('resize', redirect);
})
</script>

<template>
    <div class="page chat">
        <SingularGameChat v-if="isFullscreenChat" class="opened" />
    </div>
</template>

<style lang="scss" scoped>

</style>