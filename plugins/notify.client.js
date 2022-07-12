import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

class Notifications {
    success(message) {
        iziToast.success({
            class: "success",
            message: message,
            // iconUrl: '/svgs/24h',
            theme: "dark",
        })
    }

    warning(message) {
        iziToast.warning({
            class: "warning",
            message: message,
            // iconUrl: '/svgs/24h',
            theme: "dark",
        })
    }

    error(message) {
        iziToast.error({
            class: "error",
            message: message,
            // iconUrl: '/svgs/24h',
            theme: "dark",
        })
    }
}

const notifications = new Notifications();

export default defineNuxtPlugin(() => {
    return {
        provide: {
            notifyError: (message) => notifications.error(message),
            notifySuccess: (message) => notifications.success(message),
            notifyWarning: (message) => notifications.warning(message),
        }
    }
})