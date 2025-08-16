document.addEventListener('DOMContentLoaded', async() => {
    let creators = document.querySelectorAll('.name');
    let creatorsImg = document.querySelectorAll('.pfp');
    let url = 'https://randomuser.me/api/';
    let number = Math.max(creators.length, creatorsImg.length);
    url += `?results=${number}`
    let data = await fetch(url);
    data = await data.json();
    console.log(data);
    let index = 0;
    creators.forEach((creator) => {
        creator.textContent += `${data.results[index].name.first} ${data.results[index].name.last}`;
        index++;
    })
    index = 0;
    creatorsImg.forEach((img) => {
        img.setAttribute('src', data.results[index].picture.large);
        index++;
    })

    const scroller = document.querySelector("#arrivals");
    const scrollerInner = scroller.querySelector("#slider");
    const scrollerContent = Array.from(scrollerInner.children);
    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `#slider`
    scrollerContent.forEach((item) => {
    const duplicatedItem = item.cloneNode(true);
    duplicatedItem.setAttribute("aria-hidden", true);
    scrollerInner.appendChild(duplicatedItem);
    });


    const track = document.querySelector('#reviews');
    const nextBtn = document.querySelector('#next');
    const prevBtn = document.querySelector('#prev');
    const slides = document.querySelectorAll('.review');

    index = 0;

    let slidesPerTurn = 1;

    let slidesPerView;

    function setSlidesPerView() {
        if (window.innerWidth <= 500) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 800) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
    }

    setSlidesPerView();

    function slideStep() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
    return slideWidth + gap; // distance from one card start to the next
    }

    function updateCarousel() {
    track.style.transform = `translateX(-${index * slideStep()}px)`;
    }

    nextBtn.addEventListener('click', () => {
    index += slidesPerTurn;
    if (index >= slides.length-(slidesPerView-1)) index = 0;
    updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
    index -= slidesPerTurn;
    if (index < 0) {
        index = Math.floor((slides.length - slidesPerView) / slidesPerTurn) * slidesPerTurn;
    }
    updateCarousel();
    });

    window.addEventListener('resize', () => {
        setSlidesPerView();
        updateCarousel();
    });
});