let step = 1;
let noClicks = 0;
let noButtonDisabled = false; // NEW: Track disabled state

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
    document.getElementById('buttons').style.display = 'none';
    
    for(let i = 0; i < 100; i++) {
        setTimeout(() => createHeart(Math.random() * window.innerWidth, -50), i * 10);
    }
}

function showNoMessage() {
    // **FIX 1**: Stop if already disabled or too many clicks
    if (noButtonDisabled || noClicks >= 5) {
        return;
    }
    
    noClicks++;
    document.querySelectorAll('.no-message').forEach(msg => msg.classList.add('hidden'));
    
    if (noClicks <= 3) {
        const msg = document.getElementById(`noMessage${noClicks}`);
        setTimeout(() => {
            msg.classList.remove('hidden');
            msg.classList.add('show');
        }, 200);
    }
    
    // **FIX 2**: Move No button + start disable countdown
    const noBtn = document.getElementById('noBtn');
    const maxX = window.innerWidth - 120;
    noBtn.style.position = 'fixed';
    noBtn.style.left = (Math.random() * maxX) + 'px';
    noBtn.style.top = (Math.random() * 400) + 'px';
    noBtn.style.transition = 'all 0.5s ease';
    
    // **FIX 3**: DISABLE after 4th click (3 messages shown)
    if (noClicks === 4) {
        setTimeout(() => {
            noButtonDisabled = true;
            noBtn.innerHTML = '😜 Just say Yes! 💕';
            noBtn.style.background = '#ff4081';
            noBtn.onclick = revealSurprise; // Redirect to Yes!
        }, 1000);
    }
}

window.onload = () => {
    const messages = [
        "Ena Pakkura 👀 ?? Intha last one year something special for me,so intha valentines day normal ah iruka kudathula😜😜",
        "You make every day better just by your presence 💖",
        "Will you be my Valentine? Forever?"
    ];
    
    typeWriter(document.getElementById('title'), 'Hey love... 💋');
    
    let msgIndex = 0;
    const showNext = () => {
        if (msgIndex < 3) {
            const msg = document.getElementById(`message${msgIndex + 1}`);
            typeWriter(msg, messages[msgIndex]);
            msg.classList.remove('hidden');
            msg.classList.add('show');
            msgIndex++;
            
            if (msgIndex === 3) {
                setTimeout(() => {
                    document.getElementById('buttons').classList.remove('hidden');
                }, 1000);
            }
        }
    };
    
    setTimeout(showNext, 2000);
    setTimeout(showNext, 5000);
    setTimeout(showNext, 9000);
};

// Event listeners
document.getElementById('yesBtn').addEventListener('click', revealSurprise);
document.getElementById('noBtn').addEventListener('click', showNoMessage);

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:20px;pointer-events:none;z-index:1000;`;
    document.body.appendChild(heart);
    
    let dy = 0;
    const fall = setInterval(() => {
        dy += 3;
        heart.style.top = (y + dy) + 'px';
        heart.style.opacity = 1 - (dy / 400);
        if (dy > 400) {
            clearInterval(fall);
            heart.remove();
        }
    }, 20);
}
