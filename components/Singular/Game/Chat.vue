<script setup lang="ts">
import { storeToRefs } from 'pinia';

// IS CHAT OPEN INDICATOR
const baseStore = useBaseStore();
const { isChatOpenIndicator, myUser, isFullscreenChat } = storeToRefs(baseStore);

// CLOSE CHAT FUNCTION
const closeChat = baseStore.isChatOpenIndicatorToFalse;

// USERS ARRAY
const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);

// USERS ARRAY
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

// FIND USERS WHO WROTE MESSAGES
const messagesUsers = computed(() => {
    if (messages.value.length < 1) return;
    return messages.value.map(message => {
        return users.value.find(user => {
            return user.id === message.userId;
        })
    })
});

const messagesDom = ref<HTMLElement | null>(null);

// SCROLL TO THE BOTTOM OF MESSAGES
const scrollToBottom = (): void => {
    if (messagesDom.value) {
        messagesDom.value.scrollTop = messagesDom.value.scrollHeight;
    }
};

// IF CHAT OPEN INDICATOR CHANGE - SCROLL TO THE BOTTOM OF THE MESSAGES CONTAINER
watch(isChatOpenIndicator, (newValue) => {
    if (newValue) {
        scrollToBottom();
    } else {
        setTimeout(() => {
            scrollToBottom();
        }, 300);
    }
});

// PROVIDE SCROLL TO BOTTOM FUNCTION TO INPUTFIELD.VUE
provide<Function>('scrollToBottom', scrollToBottom);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CODE FOR DRAGGABLE CHAT

// DOM
const dragItem = ref<HTMLElement | null>(null);
const chatInfo = ref<HTMLElement | null>(null);
let container = ref<HTMLElement | null>(null);

let active = ref<boolean>(false);
let currentX = ref<number | null>(null);
let currentY = ref<number | null>(null);
let initialX = ref<number | null>(null);
let initialY = ref<number | null>(null);
let xOffset = ref<number>(0);
let yOffset = ref<number>(0);

// CHECK IF DEVICE IS TOUCH SCREEN
const isTouchDevice = (): boolean => {  
    return ('ontouchstart' in window) ||  
    (navigator.maxTouchPoints > 0);
}

// DRAG CHAT START REUSABLE CODE
const dragStartShared = (): void => {
    const target = event.target as HTMLElement;
    if (target === dragItem.value || target.classList.contains('messages') ||
     target.classList.contains('message') || chatInfo.value.contains(target)) {
        active.value = true;
    }
};

// DRAG CHAT START FOR MOUSE
const dragStartMouse = (event: MouseEvent): void => {
    if (window.outerWidth < 500) return;

    initialX.value = event.clientX - xOffset.value;
    initialY.value = event.clientY - yOffset.value;
    
    dragStartShared();
};

// DRAG CHAT START FOR TOUCH
const dragStartTouch = (event: TouchEvent): void => {
    if (!isTouchDevice()) return;
    
    initialX.value = event.touches[0].clientX - xOffset.value;
    initialY.value = event.touches[0].clientY - yOffset.value;
    
    dragStartShared();
};

// DRAG CHAT END
const dragEnd = (): void => {
    if (window.outerWidth < 500) return;

    initialX.value = currentX.value;
    initialY.value = currentY.value;

    active.value = false;
};

// DRAG CHAT REUSABLE CODE
const dragShared = (): void => {
    xOffset.value = currentX.value;
    yOffset.value = currentY.value;

    setTranslate(currentX.value, currentY.value, dragItem.value);
};

// DRAG CHAT FOR MOUSE
const dragMouse = (event: MouseEvent): void => {
    if (!active.value || window.outerWidth < 500) return;
    
    currentX.value = event.clientX - initialX.value;
    currentY.value = event.clientY - initialY.value;

    dragShared();
};

// DRAG CHAT FOR TOUCH
const dragTouch = (event: TouchEvent): void => {
    if (!active.value || !isTouchDevice()) return;
    
    currentX.value = event.touches[0].clientX - initialX.value;
    currentY.value = event.touches[0].clientY - initialY.value;

    dragShared();
};

// SET TRANSLATE VALUE FOR CHAT
const setTranslate = (xPos: number, yPos: number, el: HTMLElement): void => {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
};

onMounted(() => {
    container.value = document.body;
    scrollToBottom();

    // ADD EVENT LISTENERS FOR BODY
    container.value.addEventListener("touchstart", dragStartTouch);
    container.value.addEventListener("touchend", dragEnd);
    container.value.addEventListener("touchmove", dragTouch);

    container.value.addEventListener("mousedown", dragStartMouse);
    container.value.addEventListener("mouseup", dragEnd);
    container.value.addEventListener("mousemove", dragMouse);
});

// REMOVE EVENT LISTENERS ON UNMOUNT
onUnmounted(() => {
    container.value.removeEventListener("touchstart", dragStartTouch);
    container.value.removeEventListener("touchend", dragEnd);
    container.value.removeEventListener("touchmove", dragTouch);

    container.value.removeEventListener("mousedown", dragStartMouse);
    container.value.removeEventListener("mouseup", dragEnd);
    container.value.removeEventListener("mousemove", dragMouse);

    baseStore.isChatOpenIndicatorToFalse();
});

</script>

<template>
    <div ref="dragItem" :class="{'opened': isChatOpenIndicator}" class="chat">
        <button v-if="!isFullscreenChat" @click="closeChat" class="close-button">
            <img src="@/assets/svg/crossPink.svg" alt="Close icon" class="close-icon">
        </button>
        <NuxtLink v-else to="/game" class="close-button">
            <img src="@/assets/svg/crossPink.svg" alt="Close icon" class="close-icon">
        </NuxtLink>
        <div ref="chatInfo" class="chat-info">
            <h2 class="title">Chat</h2>
            <div class="users-online-container">
                <div class="dot"></div>
                <div class="info-container">
                    <strong class="info-line">1024</strong>
                    <span class="subtitle">online</span>
                </div>
            </div>
        </div>

        <div ref="messagesDom" class="messages">
            <ReusableChatMessage 
                v-for="(message, i) in messages"
                :key="message.id"
                :isMe='message.userId === myUser.id'
                :text='message.text'
                :user-id='message.userId'
                :nickname="messagesUsers[i].nickname"
                :avatar="messagesUsers[i].avatar"
            />
        </div>

        <SingularGameChatInputField />
    </div>
</template>

<style lang="scss" scoped>
.opened {
    opacity: 1 !important;
    visibility: visible !important;
}

.chat {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 50000;
    background: linear-gradient(0deg, rgba(244, 175, 255, 0.2), rgba(244, 175, 255, 0.2)), linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), #D1C1F2;
    border-radius: 4rem;
    width: 38rem;
    height: 100vh;
    max-height: 68rem;
    padding: 2.5rem 1rem 3.5rem 2.5rem;
    box-shadow: 0 .25rem 5rem rgba(0, 0, 0, 0.1);
    transition: opacity .4s, visibility .4s;
    cursor: move;
    user-select: none;
    
    opacity: 0;
    visibility: hidden;

    @media only screen and (max-width: 1300px) {
        width: 44rem;
        max-height: 700px;
    }

    @media only screen and (max-width: 850px) {
        width: 48rem;
    }

    @media only screen and (max-width: 500px) {
        width: 100%;
        max-height: none;
        border-radius: 0;
        padding: 2.5rem 2rem 3.5rem 3.5rem;
        right: 0 !important;
        bottom: 0 !important;
        transform: none !important;
        height: 100vh;
    }
    

    .close-button {
        @include flex-center;
        position: absolute;
        top: 2.25rem;
        left: 2.25rem;
        width: 3.25rem;
        height: 3.25rem;

        @media only screen and (max-width: 1000px) {
            top: 1.5rem;
            left: 1.5rem;
            width: 5.5rem;
            height: 5.5rem;
        }

        .close-icon {
            width: 1.5rem;
            height: 1.5rem;

            @media only screen and (max-width: 1000px) {
                width: 2.15rem;
                height: 2.15rem;
            }
        }
    }

    .chat-info {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3rem;

        .title {
            font-weight: 600;
            font-size: 2.1rem;
            color: $color-grey-2;
            text-transform: uppercase;
            margin-right: 1.5rem;
        }

        .users-online-container {
            display: flex;
            align-items: center;

            .dot {
                background-color: $color-blue-2;
                width: 1.25rem;
                height: 1.25rem;
                border-radius: 100%;
                margin-right: .75rem;
            }

            .info-container {
                display: flex;
                align-items: center;
                flex-direction: column;
                color: $color-pink-dark-2;

                .info-line {
                    font-weight: 600;
                    font-size: 1.8rem;
                }

                .subtitle {
                    font-size: 1.2rem;
                }
            }
        }
    }

    .messages {
        display: flex;
        flex-direction: column;
        max-height: 80%;
        overflow-y: scroll;
        padding-bottom: 4rem;
        padding-right: 1.5rem;

        @media only screen and (max-width: 500px) {
            max-height: 85%;
        }

        &::-webkit-scrollbar {
            height: 5px;
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 17px;
            background-color: white;
        }

        &::-webkit-scrollbar-track {
            background-image: linear-gradient(to right, transparent 0%, transparent 30%, rgba(white, .7) 30%, rgba(white, .7) 70%, transparent 70%, transparent 100%);
            margin-bottom: 8rem;
        }
    }
}
</style>