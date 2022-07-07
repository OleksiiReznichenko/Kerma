import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

class Notifications {
    info(message) {
        iziToast.info({
            class: "info",
            message: message,
            iconUrl: require("src/assets/icon/info.svg"),
            theme: "dark",
        })
    }

    success(message) {
        iziToast.success({
            class: "success",
            message: message,
            iconUrl: require("src/assets/icon/success.svg"),
            theme: "dark",
        })
    }

    warning(message) {
        iziToast.warning({
            class: "warning",
            message: message,
            iconUrl: require("src/assets/icon/warning.svg"),
            theme: "dark",
        })
    }

    win(amount) {
        iziToast.warning({
            class: "warning",
            message: `You won ${amount} XMR`,
            iconUrl: require("src/assets/icon/win.svg"),
            theme: "dark",
        })
    }

    error(message) {
        iziToast.error({
            class: "error",
            message: message,
            iconUrl: require("src/assets/icon/error.svg"),
            theme: "dark",
        })
    }
}

const notifications = new Notifications();

export const showNotification = notifications;

export default {
    install(Vue) {
        Vue.prototype.$notify = notifications;
        Vue.$notify = notifications;
    }
}