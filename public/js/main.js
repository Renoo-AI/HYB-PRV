let gameData = {};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/game-data');
        gameData = await response.json();
        initProgress();
        initByteBot();
        setupHints();
        updateUI();
    } catch (error) {
        console.error("Failed to load game data:", error);
    }
});

// --- Progress Tracking ---
function initProgress() {
    if (!localStorage.getItem('solvedLevels')) {
        localStorage.setItem('solvedLevels', JSON.stringify([]));
    }
}

function getSolvedLevels() {
    return JSON.parse(localStorage.getItem('solvedLevels')) || [];
}

function markLevelSolved(level) {
    const solved = getSolvedLevels();
    if (!solved.includes(level)) {
        solved.push(level);
        localStorage.setItem('solvedLevels', JSON.stringify(solved));
        updateUI();
    }
}

function updateUI() {
    const solved = getSolvedLevels();

    // Update global flag count
    const countEl = document.getElementById('flag-count');
    if(countEl) countEl.innerText = solved.length;

    // Update sidebar styles
    document.querySelectorAll('#sidebar li a').forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('/room/')) {
            const levelNum = parseInt(href.split('/')[2]);
            if (solved.includes(levelNum)) {
                link.classList.add('solved-link');
                link.innerHTML = `✅ ${link.innerText.replace('✅ ', '')}`;
            }
        }
    });

    // Update dashboard cards if on home page
    if (window.currentLevel === 0) {
        solved.forEach(lvl => {
            const badge = document.getElementById(`badge-${lvl}`);
            if (badge) {
                badge.innerHTML = `<i class="fas fa-check-circle"></i> Complete`;
                badge.className = 'status-badge status-solved';
            }
        });

        const skillsList = document.getElementById('skills-learned');
        if (skillsList) {
            skillsList.innerHTML = '';
            if (solved.length === 0) {
                skillsList.innerHTML = '<li>No achievements yet. Start hacking!</li>';
            } else {
                solved.sort((a,b)=>a-b).forEach(lvl => {
                    if(gameData[lvl]) {
                        const li = document.createElement('li');
                        li.innerHTML = `<strong>${gameData[lvl].title}</strong>: Mastered ${gameData[lvl].skill}`;
                        skillsList.appendChild(li);
                    }
                });
            }
        }
    }
}

// --- Flag Submission ---
async function submitFlag(level) {
    const input = document.getElementById('flag-input').value.trim();
    const resultDiv = document.getElementById('flag-result');

    try {
        const response = await fetch('/api/submit-flag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level: level, flag: input })
        });
        const data = await response.json();

        if (data.success) {
            resultDiv.innerHTML = `<div class="success-msg">Correct! Flag secured.</div>
                <div class="explanation-box">
                    <h3>Explanation: ${data.explanation.bug}</h3>
                    <p><strong>Why it matters:</strong> ${data.explanation.why}</p>
                    <p><strong>How to prevent:</strong> ${data.explanation.prevent}</p>
                    ${level < 20 ? `<a href="/room/${level + 1}" class="btn btn-primary mt-2">Next Room <i class="fas fa-arrow-right"></i></a>` : '<p><strong>You finished all rooms! Awesome job!</strong></p>'}
                </div>`;
            markLevelSolved(level);
            byteReactToWin(data.explanation);
        } else {
            resultDiv.innerHTML = `<div class="error-msg">${data.message || 'Incorrect flag. Try again!'}</div>`;
            byteReactToFail();
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="error-msg">Error communicating with server.</div>`;
    }
}

// --- Hint System ---
function setupHints() {
    const level = window.currentLevel;
    if (!level || level === 0) return; // Not on a level page

    const hintDisplay = document.getElementById('hint-display');

    for(let i=1; i<=3; i++) {
        const btn = document.getElementById(`btn-hint${i}`);
        if(btn) {
            btn.addEventListener('click', () => {
                hintDisplay.innerHTML = `<div class="hint-text"><strong>Hint ${i}:</strong> ${gameData[level].hints[i-1]}</div>`;
                byteReactToHint(i);
            });
        }
    }
}

// --- Byte AI Companion ---
function initByteBot() {
    const messagesContainer = document.getElementById('byte-messages');
    if (!messagesContainer) return;

    // Initial greeting based on level
    setTimeout(() => {
        if (window.currentLevel === 0) {
            addByteMessage("yo hacker 👋 ready to find some flags? Pick a room from the dashboard.");
        } else {
            const level = window.currentLevel;
            const solved = getSolvedLevels();
            if (solved.includes(level)) {
                addByteMessage(`You already crushed this room, but it's good to practice!`);
            } else {
                if (window.roomBotIntro) {
                    addByteMessage(window.roomBotIntro);
                } else {
                    addByteMessage(`Room ${level} initialized. Need a nudge? Just ask for a hint!`);
                }
            }
        }
    }, 1000);
}

function addByteMessage(msg) {
    const messagesContainer = document.getElementById('byte-messages');
    if (!messagesContainer) return;

    const div = document.createElement('div');
    div.className = 'byte-msg';
    div.innerHTML = msg; // allow basic HTML like bolding
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function byteReactToHint(hintNumber) {
    const responses = [
        "Need a nudge? Here you go. Take a look at that hint. 👀",
        "Getting warmer! You're thinking like an attacker now. 🔥",
        "Alright, basically handing it to you now. You got this! 😂"
    ];
    addByteMessage(responses[hintNumber - 1]);
}

function byteReactToWin(explanation) {
    const responses = [
        "LET’S GOOO 🔥 flag secured!",
        "Nice catch! You absolutely nailed that.",
        "System compromised. You're basically a pro now 😎"
    ];
    addByteMessage(responses[Math.floor(Math.random() * responses.length)]);

    // Provide a simple explanation after a brief delay
    if (explanation && explanation.bug) {
        setTimeout(() => {
            addByteMessage(`<strong>Byte's debrief:</strong> This was a classic <em>${explanation.bug}</em>. ${explanation.why}`);
        }, 1500);
    }
}

function byteReactToFail() {
    const responses = [
        "Nope, not quite. Keep digging! 🕵️",
        "Close but no cigar. Try checking your flag format: THM{...}",
        "Hmmm... that parameter looks interesting, but the flag is wrong."
    ];
    addByteMessage(responses[Math.floor(Math.random() * responses.length)]);
}
