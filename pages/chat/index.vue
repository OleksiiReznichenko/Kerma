<script setup lang="ts">
import { storeToRefs } from 'pinia';

const baseStore = useBaseStore();
const { isFullscreenChat } = storeToRefs(baseStore);

// REDIRECTION
const router = useRouter();

// REDIRECT FROM THIS PAGE IF CHAT IS NOT ON FULL SCREEN
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