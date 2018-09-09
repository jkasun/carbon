let appEvent = function () {

    let subscriptions = {};

    let on = (eventName, sub) => {
        if (!subscriptions[eventName]) {
            subscriptions[eventName] = [];
        }

        subscriptions[eventName].push(sub);
    }

    let emit = (eventName, e) => {
        let subs = subscriptions[eventName];

        if (subs) {
            subs.forEach(sub => {
                sub(e);
            })
        }
    }

    let onWindowResize = (sub) => {
        on('window-resize', sub);
    }

    let onFullScreenOpen = (sub) => {
        on('full-screen-open', sub);
    }

    let onFullScreenExit = (sub) => {
        on('full-screen-exit', sub);
    }

    window.onresize = function (e) {
        emit('window-resize', e);
    }

    document.onwebkitfullscreenchange = function () {
        if (document.webkitIsFullScreen) {
            emit('full-screen-open');
        } else {
            emit('full-screen-exit');
        }
    }

    return {
        onWindowResize,
        onFullScreenOpen,
        onFullScreenExit
    }
}();