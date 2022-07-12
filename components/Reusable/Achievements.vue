<script setup lang="ts">
import UserAchievement from '@/composables/interfaces/userAchievement';
import UserAchievements from '@/composables/interfaces/userAchievements';

interface Props {
    achievements: UserAchievements;
}

const props = defineProps<Props>();

// ACHIEVEMENTS ARRAY
const achievements = ref<UserAchievement[]>([]);

// ADD ACHIEVEMENTS TO ACHIEVEMENTS ARRAY
if (props.achievements.medal) {
    achievements.value.push({
        icon: 'circleMedal.svg',
        title: 'Super star',
        description: 'Received more than 100 positive reviews'
    });
}

if (props.achievements.starMedal) {
    achievements.value.push({
        icon: 'starMedal.svg',
        title: 'VIP',
        description: 'Good player'
    });
}

if (props.achievements.cup) {
    achievements.value.push({
        icon: 'cup.svg',
        title: 'Premium',
        description: 'Really experienced played'
    });
}

// CLICKED ACHIEVEMENT BUTTON
let prevButton = ref<HTMLElement | null>(null);

// TOGGLE ACHIEVEMENT DROPDOWN
const toggleAchievementDropdown = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (!target.classList.contains('achievement-button') &&
    !target.classList.contains('achievement-icon')) return;
    let achievementButton: HTMLElement;

    if (target.classList.contains('achievement-button')) {
        achievementButton = target;
    } else {
        achievementButton = target.parentElement;
    }

    achievementButton.classList.toggle('opened');

    if (prevButton.value !== achievementButton) {
        prevButton.value?.classList.remove('opened');
        prevButton.value = achievementButton;
    }
}

// CLOSE ACHIEVEMENT DROPDOWN ON WINDOW RESIZE
const onWindowClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('achievement-button') ||
    target.classList.contains('achievement-icon') || !prevButton.value?.classList.contains('opened')) return;
    prevButton.value?.classList.remove('opened');
}

onMounted(() => {
    // ADD WINDOW EVENT LISTENER
    window.addEventListener('click', onWindowClick);
});

onUnmounted(() => {
    // REMOVE WINDOW EVENT LISTENER
    window.removeEventListener('click', onWindowClick);
});
</script>

<template>
    <div @click="toggleAchievementDropdown" class="achievements">
        <ReusableUserPageAchievement 
            v-for="(achievement, i) in achievements"
            :key="i"
            :icon="achievement.icon"
            :title="achievement.title"
            :description="achievement.description"
        />
    </div>
</template>

<style lang="scss" scoped>
.achievements {
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 850px) {
        justify-content: flex-start;
    }

    .opened {
        :deep(.achievement-dropdown) {
            opacity: 1 !important;
            visibility: visible !important;
        }
    }
}
</style>