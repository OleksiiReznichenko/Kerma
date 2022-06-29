export function useEventListener(target: HTMLElement | Window | Document, event: string, callback: EventListenerOrEventListenerObject) {
    // ADD WINDOW EVENT LISTENERS
    onMounted(() => target.addEventListener(event, callback));

    // REMOVE WINDOW EVENT LISTENERS
    onUnmounted(() => target.removeEventListener(event, callback));
}