class Events extends EventTarget {

    on(event, handler) {
        this.addEventListener(event, handler);
        return () => this.removeEventListener(event, handler);
    }

    emit(event, detail) {
        this.dispatchEvent(new CustomEvent(event, {detail}));
    }
}

export {Events};