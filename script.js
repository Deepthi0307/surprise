let step = 1;
let animationRunning = false;

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            animationRunning = false;
        }
    }
    type();
}

function revealSurprise() {
    if (animationRunning) return; // Prevent spam clicks
    
    document.getElementById('surprise').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Confetti hearts
    for(let i = 0; i < 100; i++) {
        setTimeout(() => createHeart(Math.random() * window.innerWidth, -50), i * 10);
    }
}

function nextMessage() {
    if (step > 3 || animationRunning) return;
    
    animationRunning = true;
    const messages = ['message1', 'message2', 'message3'];
    const current = document.getElementById(messages[step-1]);
    const next = document.getElementById(messages[step]);
    
    // Hide current message
    current.classList.remove('show');
    setTimeout(() => {
        current.classList.add('hidden');
        
        // Always show button
        document.querySelector('.reveal-btn').style.display = 'block';
        
        // Show next message
        next.classList.remove('hidden');
        typeWriter(next, next.textContent, 80);
        next.classList.add('show');
        
        step++;
        animationRunning = false;
    }, 1000);
}

// Auto-start sequence
window.onload = () => {
    typeWriter(document.getElementById('title'), 'Hey love... 💕');
    setTimeout(() => {
        document.getElementById('message1').classList.add('show');
        document.querySelector('.reveal-btn').style.display = 'block'; // Show button early
    }, 2000);
    
    // Optional: Auto progress messages (remove if you want manual control)
    setTimeout(nextMessage, 5000);
    setTimeout(nextMessage, 9000);
};

// Floating hearts on button
document.querySelector('.reveal-btn').addEventListener('click', revealSurprise);

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = ['💖','💕','💗','💝'][Math.floor(Math.random()*4)];
    heart.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px; 
        font-size: ${15+Math.random()*15}px; 
        pointer-events: none; z-index: 1000;
        transform: rotate(${Math.random()*360}deg);
    `;
    document.body.appendChild(heart);
    
    let dy = 0;
    const fall = setInterval(() => {
        dy += 2 + Math.random()*2;
        heart.style.top = (y + dy) + 'px';
        heart.style.opacity = 1 - (dy / 400);
        heart.style.transform += ` rotate(${Math.random()*10}deg)`;
        if (dy > 400) {
            clearInterval(fall);
            heart.remove();
        }
    }, 20);
}
