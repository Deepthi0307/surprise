// Floating hearts background
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

// Click heart for surprise message
document.querySelector('.heart').addEventListener('click', () => {
    alert('I love you more than words can say! 💕');
});
