let step = 1;

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function revealSurprise() {
    document.getElementById('surprise').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Confetti effect
    for(let i = 0; i < 100; i++) {
        setTimeout(() => createHeart(Math.random() * window.innerWidth, -50), i * 10);
    }
}

function nextMessage() {
    const messages = ['message1', 'message2', 'message3'];
    const current = document.getElementById(messages[step-1]);
    const next = document.getElementById(messages[step]);
    
    current.classList.remove('show');
    setTimeout(() => {
        current.classList.add('hidden');
        next.classList.remove('hidden');
        typeWriter(next, next.textContent, 80);
        next.classList.add('show');
        step++;
        
        if (step <= 3) {
            setTimeout(nextMessage, 3000);
        }
    }, 1000);
}

// Auto-start
window.onload = () => {
    typeWriter(document.getElementById('title'), 'Hey love... 💕');
    setTimeout(() => {
        document.getElementById('message1').classList.add('show');
        setTimeout(nextMessage, 3000);
    }, 1500);
};

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '100';
    document.body.appendChild(heart);
    
    let dy = 0;
    const fall = setInterval(() => {
        dy += 3;
        heart.style.top = (y + dy) + 'px';
        heart.style.opacity = 1 - (dy / 300);
        if (dy > 300) {
            clearInterval(fall);
            heart.remove();
        }
    }, 20);
}
