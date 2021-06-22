const DIRECTIONS = {
    NEXT: "next",
    PREV: "prev",
};

class Slider {
    constructor({
        nextSelector,
        prevSelector,
        wrapperSelector,
        labelWrapperSelector,
        slideWrapperSelector,
    }) {
        this.wrapper = document.querySelector(wrapperSelector);
        this.next = this.wrapper.querySelector(nextSelector);
        this.prev = this.wrapper.querySelector(prevSelector);
        this.labelsWrapper = this.wrapper.querySelector(labelWrapperSelector);
        this.slidesWrapper = this.wrapper.querySelector(slideWrapperSelector);

        this.labelsCount = this.labelsWrapper.children.length - 1;
        this.currentLabel = 0;
        this.currentSlide = this.labelsCount;

        this.init();
    }

    changeSlide(direction) {
        const wrapperHeight = this.wrapper.clientHeight;
        let labelHeight, slidesHeight;
        if (direction === DIRECTIONS.NEXT) {
            this.currentLabel =
                this.currentLabel === this.labelsCount
                    ? 0
                    : this.currentLabel + 1;
            this.currentSlide =
                this.currentSlide === this.labelsCount
                    ? 0
                    : this.currentSlide + 1;
        } else if (direction === DIRECTIONS.PREV) {
            this.currentLabel =
                this.currentLabel === 0
                    ? this.labelsCount
                    : this.currentLabel - 1;
            this.currentSlide =
                this.currentSlide === 0
                    ? this.labelsCount
                    : this.currentSlide - 1;
        }

        labelHeight = wrapperHeight * this.currentLabel;
        slidesHeight = this.currentSlide * wrapperHeight;
        this.labelsWrapper.style.transform = `translateY(-${labelHeight}px)`;
        this.slidesWrapper.style.transform = `translateY(-${slidesHeight}px)`;
    }

    addListeners() {
        this.next.addEventListener("click", () =>
            this.changeSlide(DIRECTIONS.NEXT)
        );
        this.prev.addEventListener("click", () =>
            this.changeSlide(DIRECTIONS.PREV)
        );
    }

    init() {
        this.addListeners();
        this.changeSlide();
    }
}

new Slider({
    nextSelector: ".up-button",
    prevSelector: ".down-button",
    wrapperSelector: ".container",
    labelWrapperSelector: ".sidebar",
    slideWrapperSelector: ".main-slide",
});
