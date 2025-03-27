function toggleTabs() {
    var tabs = document.getElementById("tabs");
    if (tabs.style.display === "none" || tabs.style.display === "") {
        tabs.style.display = "block";
    } else {
        tabs.style.display = "none";
    }
}

//slider

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        1300: {
            slidesPerView: 2,
            spaceBetween: 20,
        }
    }
});

//slider__product

document.querySelectorAll(".custom-slider").forEach((slider) => {
    const sliderWrapper = slider.querySelector(".slider-wrapper");
    const slides = slider.querySelectorAll(".slide");
    const indicators = slider.querySelectorAll(".indicator");

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentIndex * 180}px)`;
        indicators.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    indicators.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Перетаскивание мышью
    sliderWrapper.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    sliderWrapper.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        let moveX = e.clientX - startX;

        if (moveX > 50 && currentIndex > 0) {
            currentIndex--;
            isDragging = false;
        } else if (moveX < -50 && currentIndex < slides.length - 1) {
            currentIndex++;
            isDragging = false;
        }

        updateSlider();
    });

    // Свайп на мобильных устройствах
    sliderWrapper.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    sliderWrapper.addEventListener("touchmove", (e) => {
        let moveX = e.touches[0].clientX - startX;

        if (moveX > 50 && currentIndex > 0) {
            currentIndex--;
        } else if (moveX < -50 && currentIndex < slides.length - 1) {
            currentIndex++;
        }

        updateSlider();
    });

    updateSlider();
});

//при пролистывании элементы

class Scroller{

    constructor(info){
            if(typeof info.element === 'string'){
                this.item = document.querySelector(info.element);
        } else if(info.element instanceof HTMLElement){
                this.item = info.element;
        } 
        this.range=info.top
        this.unit=info.unit
        this.item.style.position='fixed'
        this.item.style.top=this.CheckUnit()+'px'
        window.addEventListener('scroll',()=> this.move())
    }

    CheckUnit() {
        if (this.unit === 'px') {
            return this.range > 0 ? this.range : 0;
        } else if (this.unit === '%') {
            return (window.innerHeight / 100) * this.range;
        }
        return 0; // Добавляем возврат по умолчанию
    }

    move(){

        this.size=this.CheckUnit()

        if(this.size - scrollY > 0){
            this.item.style.top=this.size-scrollY+'px'
        }else{
            this.item.style.top=0
        }
        
    }
}

let myScroller = new Scroller({
    element: '.medianav__down-search',
    top: 50,
    unit: 'px'
    
});