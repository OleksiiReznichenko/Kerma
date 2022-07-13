<script setup lang="ts">

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

        <!-- <div ref="messagesDom" class="messages">
            <ReusableChatMessage 
                v-for="(message, i) in messages"
                :key="message.id"
                :isMe='message.userId === myUser.id'
                :text='message.text'
                :user-id='message.userId'
                :nickname="messagesUsers[i].nickname"
                :avatar="messagesUsers[i].avatar"
            />
        </div> -->

        <!-- <div :class="{'inactive': !myUser.id}" class="input-container">
            <textarea @keypress.enter="sendMessage" @input="autoGrow" v-model="newMessage" :maxlength="maxMessageLength" name="message" id="messageInput" cols="30" rows="1" wrap="soft" placeholder="Message"></textarea>
            <button @click="sendMessage" class="send-button">
                <img src="@/assets/svg/arrow.svg" alt="Arrow" class="arrow">
            </button>
        </div> -->
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
}
</style>