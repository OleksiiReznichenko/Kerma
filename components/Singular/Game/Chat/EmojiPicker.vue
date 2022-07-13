<script setup>
import { EmojiPicker } from 'vue-emoji-picker';

const onEmoji = (event) => {
    this.message += event;
};
</script>

<template>
<emoji-picker @emoji="onEmoji">
    <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent">
        <button class="emoji-btn" type="button">
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.3721 19C15.3426 19 19.3721 14.9706 19.3721 10C19.3721 5.02944 15.3426 1 10.3721 1C5.40151 1 1.37207 5.02944 1.37207 10C1.37207 14.9706 5.40151 19 10.3721 19Z"
                stroke="#FFEADE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.77209 11.8C6.77209 11.8 8.12209 13.6 10.3721 13.6C12.6221 13.6 13.9721 11.8 13.9721 11.8"
                stroke="#FFEADE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.67212 7.30005H7.68112" stroke="#FFEADE" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
            <path d="M13.072 7.30005H13.081" stroke="#FFEADE" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
        </button>
    </div>
    <div class="emoji-picker-wrapper" slot="emoji-picker" slot-scope="{ emojis, insert }">
        <div class="emoji-picker">
        <div v-for="(emojiGroup, category) in emojis" :key="category">
            <h5>{{ category }}</h5>
            <div>
            <button
                v-for="(emoji, emojiName) in emojiGroup"
                :key="emojiName"
                @click="insert(emoji)"
                :title="emojiName"
            >{{ emoji }}
            </button>
            </div>
        </div>
        </div>
    </div>
</emoji-picker>
</template>