<script setup lang="ts">
// ERROR TITLE
const title: string = 'This page was not found';

// ERROR PARAGRAPH
const paragraph: string = 'We are already solving this problem, as long as you can go back';

</script>

<template>
    <div class="error-page">
      <ReusableErrorPage 
        :title="title"
        :paragraph="paragraph"
      />
    </div>
</template>