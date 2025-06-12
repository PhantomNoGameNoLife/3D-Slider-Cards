const slider = document.querySelector('.slider3d');
let isDragging = false;
let startX;
let currentRotateY = 0;
let lastTouchX;

function handleStart(clientX) {
    isDragging = true;
    startX = clientX;
    slider.style.cursor = 'grabbing';
    slider.style.transition = 'none';
}

function handleMove(clientX) {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const sensitivity = .6;
    currentRotateY -= deltaX * sensitivity;
    slider.style.transform = `perspective(3000px) translateX(-50%) rotateX(-15deg) rotateY(${currentRotateY}deg)`;
    startX = clientX;
}

function handleEnd() {
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