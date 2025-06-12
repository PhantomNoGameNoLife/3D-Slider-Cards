const slider = document.querySelector('.slider3d');
const cards = document.querySelectorAll('.card');
let isDragging = false;
let startX;
let currentRotateY = 0;
let lastTouchX;
let touchStartTime;
let touchStartX;
const TAP_THRESHOLD = 200;
const MOVE_THRESHOLD = 10;

function handleStart(clientX) {
    isDragging = false;
    startX = clientX;
    touchStartTime = Date.now();
    touchStartX = clientX;
    slider.style.cursor = 'grabbing';
    slider.style.transition = 'none';
}

function handleMove(clientX) {
    const deltaX = clientX - startX;
    if (Math.abs(clientX - touchStartX) > MOVE_THRESHOLD) {
        isDragging = true;
    }
    if (isDragging) {
        const sensitivity = 0.6;
        currentRotateY -= deltaX * sensitivity;
        slider.style.transform = `perspective(3000px) translateX(-50%) rotateX(-15deg) rotateY(${currentRotateY}deg)`;
        startX = clientX;
    }
}

function handleEnd() {
    if (!isDragging && Date.now() - touchStartTime < TAP_THRESHOLD) {
        const touchedCard = document.elementFromPoint(touchStartX, window.innerHeight / 2)?.closest('.card');
        if (touchedCard) {
            cards.forEach(card => card.classList.remove('active'));
            touchedCard.classList.add('active');
            setTimeout(() => touchedCard.classList.remove('active'), 3000);
        }
    }
    isDragging = false;
    slider.style.cursor = 'grab';
    slider.style.transition = 'transform 0.3s linear';
}

slider.addEventListener('mousedown', (e) => {
    e.preventDefault();
    handleStart(e.clientX);
});

slider.addEventListener('mousemove', (e) => {
    handleMove(e.clientX);
});

slider.addEventListener('mouseup', handleEnd);
slider.addEventListener('mouseleave', handleEnd);

slider.addEventListener('touchstart', (e) => {
    e.preventDefault();
    lastTouchX = e.touches[0].clientX;
    handleStart(e.touches[0].clientX);
});

slider.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
    lastTouchX = e.touches[0].clientX;
});

slider.addEventListener('touchend', handleEnd);