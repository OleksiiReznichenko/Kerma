<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ChatMessage from '@/composables/interfaces/message';
// import EmojiPicker from 'vue-emoji-picker';

// IS CHAT OPEN INDICATOR
const baseStore = useBaseStore();
const { isChatOpenIndicator, myUser } = storeToRefs(baseStore);

// CLOSE CHAT
const closeChat = baseStore.isChatOpenIndicatorToFalse;

// USERS ARRAY
const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);

// USERS ARRAY
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

// FIND USERS WHO WROTE MESSAGES
const messagesUsers = computed(() => {
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

watch(messagesDom, () => {
    scrollToBottom();
});

watch(isChatOpenIndicator, () => {
    setTimeout(() => {
        scrollToBottom();
    }, 150);
})

// MESSAGE RELATED
const maxMessageLength = ref<number>(400);
let newMessage = ref<string>('');
let newMessageNoWhiteSpace = ref<string>('');

// GROW TEXTAREA ON TEXT WRAP
const autoGrow = (event: Event): void => {
    const target = event.target as HTMLElement;
    target.style.height = "5px";
    target.style.height = (target.scrollHeight) + "px";
};

// REMOVE EXCESSIVE WHITE SPACES IN VALUE
const removeWhiteSpaces = (): void => {
    newMessageNoWhiteSpace.value = '';
    if (newMessage.value.includes(' ')) {
    const messageInputArr = newMessage.value.split(' ');

    const messageInputArr2 = messageInputArr.filter(el => {
        if (el.replace(/\s/g, '')) {
        return el.replace(/\s/g, '');
        }
    })

    const validatedMessage = messageInputArr2.join(' ');
    newMessageNoWhiteSpace.value = validatedMessage;
    } else {
        newMessageNoWhiteSpace.value = newMessage.value;
    }
};

// SEND MESSAGE
const sendMessage = (event: Event): void => {
    event.preventDefault();

    removeWhiteSpaces();

    if (!newMessageNoWhiteSpace.value || !myUser.value.id) return;

    const newMessageObject: ChatMessage = {
        id: (Math.random() * Date.now()).toString(),
        userId: myUser.value.id,
        text: newMessage.value
    };

    chatStore.addNewMessage(newMessageObject);
    newMessage.value = '';
    setTimeout(() => {
        scrollToBottom();
    }, 15);
};


//////////////////////////////////////////////////////////////////////////
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
    // event.preventDefault();
    
    currentX.value = event.clientX - initialX.value;
    currentY.value = event.clientY - initialY.value;

    dragShared();
};

// DRAG CHAT FOR TOUCH
const dragTouch = (event: TouchEvent): void => {
    if (!active.value || !isTouchDevice()) return;
    // event.preventDefault();
    
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
});

</script>

<template>
    <div ref="dragItem" :class="{'opened': isChatOpenIndicator}" class="chat">
        <button @click="closeChat" class="close-button">
            <img src="@/assets/svg/crossPink.svg" alt="Close icon" class="close-icon">
        </button>
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

        <div :class="{'inactive': !myUser.id}" class="input-container">
            <!-- <EmojiPicker class="emoji-main-container" @emoji="onEmoji">
                <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" 
                    @click.stop="clickEvent">
                    <button class="emoji-btn" type="button">
                        <img src="@/assets/svg/emojiButton.svg" alt="Emoji button" class="emoji-icon">
                    </button>
                </div>
                <div class="emoji-picker-wrapper" slot="emoji-picker" slot-scope="{ emojis, insert }">
                    <div class="emoji-picker">
                        <div v-for="(emojiGroup, category) in emojis" :key="category">
                            <h5>{{ category }}</h5>
                            <div>
                                <span class="emoji"
                                    v-for="(emoji, emojiName) in emojiGroup"
                                    :key="emojiName"
                                    @click="insert(emoji)"
                                    :title="emojiName"
                                >{{ emoji }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </EmojiPicker> -->
            <textarea @keypress.enter="sendMessage" @input="autoGrow" v-model="newMessage" :maxlength="maxMessageLength" name="message" id="messageInput" cols="30" rows="1" wrap="soft" placeholder="Message"></textarea>
            <button @click="sendMessage" class="send-button">
                <img src="@/assets/svg/arrow.svg" alt="Arrow" class="arrow">
            </button>
        </div>
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
    z-index: 3000;
    background: linear-gradient(0deg, rgba(244, 175, 255, 0.2), rgba(244, 175, 255, 0.2)), linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), #D1C1F2;
    border-radius: 4rem;
    width: 38rem;
    height: 100vh;
    max-height: 68rem;
    padding: 2.5rem 1rem 3.5rem 2.5rem;
    box-shadow: 0 .25rem 5rem rgba(0, 0, 0, 0.1);
    transition: opacity .3s;
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

    .inactive {
        pointer-events: none;
        opacity: .5;
    }

    .input-container {
        position: absolute;
        bottom: 3.5rem;
        left: 2.5rem;
        right: 2.5rem;
        background-image: linear-gradient(to right, #EEDFF9, #EBDAF7);
        border-radius: 1.25rem;
        margin-top: 3rem;
        box-shadow: 0 .25rem 2rem rgba(0, 0, 0, 0.1);

        #messageInput {
            color: $color-pink-dark-3;
            font-size: 1.6rem;
            width: 82%;
            margin-top: 2px;
            padding: 2rem;
            padding-left: 5rem;
        }

        .send-button {
            @include flex-center;
            position: absolute;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            width: 3.5rem;
            height: 3.5rem;
            background-color: $color-blue-2;
            padding: .35rem 1rem;
            border-radius: 1.25rem;
            transition: all .3s;

            &:hover {
                background-color: darken($color-blue-2, 5%);
            }

            .arrow {
                width: 1.5rem;
            }
        }

        .emoji-main-container {
            position: absolute;
            left: 2rem;
            top: 53%;
            transform: translateY(-50%);
            
            .emoji-picker-wrapper {
                position: absolute;
                left: 0;
                bottom: 6rem;
                border-radius: 10px;

                @media only screen and (max-width: 450px) {
                    left: -1.25rem;
                    bottom: 6.25rem;
                }

                &::before {
                    border-bottom: 10px solid $color-grey-2;
                    border-left: 9px solid rgba(0, 0, 0, 0);
                    border-right: 9px solid rgba(0, 0, 0, 0);
                    transform: rotate(180deg);
                    content: "";
                    display: inline-block;
                    left: 10px;
                    position: absolute;
                    bottom: -10.3px;
                }
            }

            .emoji-picker {
                width: 295px;
                height: 170px;
                overflow: auto;
                padding: 10px;
                padding-top: 0;
                background: $color-grey-2;
                overflow-x: hidden;
                border-radius: 10px;

                .emoji {
                    display: inline-block;
                    background: transparent;
                    border: none;
                    outline: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    cursor: pointer;
                    text-align: center;
                    padding-top: 7px;

                    @media only screen and (max-width: 850px) {
                        transform: scale(1.4);
                    }

                    &:hover {
                        background: rgba(255, 255, 255, 0.1);
                    }
                }

                h5 {
                    font-family: Montserrat;
                    margin-bottom: 5px;
                    font-size: 15px;
                    margin-top: 10px;
                }

                &::-webkit-scrollbar {
                    z-index: 2;
                    width: 5px;
                }

                &::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                    margin: 5px 0;
                    border-radius: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 5px;
                    background-color: #5d5d5d;
                    outline: none;
                }
            }
        }
    }
}
</style>