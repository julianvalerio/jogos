var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: true,
    autoplayTimeout: 100,
    autoplayHoverPause: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect:{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
    },
    pagination:{
        el:".swiper-pagination",
    },
});