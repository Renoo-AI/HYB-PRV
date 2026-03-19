document.addEventListener('DOMContentLoaded', () => {
    initProgress();
    initByteBot();
    setupHints();
    updateUI();
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
        byteReactToWin();
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
        if (href.startsWith('/level/')) {
            const levelNum = parseInt(href.split('/')[2]);
            if (solved.includes(levelNum)) {
                link.classList.add('solved-link');
                link.innerHTML = `✅ ${link.innerText.replace('✅ ', '')}`;
            }
        }
    });

    // Update index page skills if on home
    if (window.currentLevel === 0) {
        const skillsList = document.getElementById('skills-learned');
        if (skillsList) {
            skillsList.innerHTML = '';
            if (solved.length === 0) {
                skillsList.innerHTML = '<li>No skills learned yet. Start hacking!</li>';
            } else {
                solved.sort((a,b)=>a-b).forEach(lvl => {
                    const li = document.createElement('li');
                    li.innerText = `Level ${lvl}: ${gameData[lvl].skill}`;
                    skillsList.appendChild(li);
                });
            }
        }
    }
}

// --- Flag Submission ---
function submitFlag(level) {
    const input = document.getElementById('flag-input').value.trim();
    const resultDiv = document.getElementById('flag-result');
    const expected = gameData[level].flag;

    if (input === expected) {
        resultDiv.innerHTML = `<div class="success-msg">Correct! Flag secured.</div>
            <div class="explanation-box">
                <h3>Explanation: ${gameData[level].explanation.bug}</h3>
                <p><strong>Why it matters:</strong> ${gameData[level].explanation.why}</p>
                <p><strong>How to prevent:</strong> ${gameData[level].explanation.prevent}</p>
                ${level < 20 ? `<a href="/level/${level + 1}" class="btn btn-primary mt-2">Next Level</a>` : '<p><strong>You finished all levels! Awesome job!</strong></p>'}
            </div>`;
        markLevelSolved(level);
    } else {
        resultDiv.innerHTML = `<div class="error-msg">Incorrect flag. Try again!</div>`;
        byteReactToFail();
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
            addByteMessage("yo hacker 👋 ready to find some flags? pick a level from the menu.");
        } else {
            const level = window.currentLevel;
            const solved = getSolvedLevels();
            if (solved.includes(level)) {
                addByteMessage(`you already crushed this one. moving on or just admiring your work? 😎`);
            } else {
                addByteMessage(`level ${level} let's go! need a hint or you grinding solo?`);
            }
        }
    }, 1000);
}

function addByteMessage(msg) {
    const messagesContainer = document.getElementById('byte-messages');
    if (!messagesContainer) return;

    const div = document.createElement('div');
    div.className = 'byte-msg';
    div.innerText = msg;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function byteReactToHint(hintNumber) {
    const responses = [
        "small nudge for ya. you got this 👀",
        "getting warmer. check those dev tools 🔥",
        "alright basically handing it to you now 😂"
    ];
    addByteMessage(responses[hintNumber - 1]);
}

function byteReactToWin() {
    const responses = [
        "LET’S GOOO 🔥 flag secured!",
        "easy money 💸 another one down.",
        "you're basically a pro now 😎"
    ];
    addByteMessage(responses[Math.floor(Math.random() * responses.length)]);
}

function byteReactToFail() {
    const responses = [
        "nope, not quite. keep digging! 🕵️",
        "close but no cigar. check your format maybe? THM{...}",
        "hmmm... re-read the hints maybe?"
    ];
    addByteMessage(responses[Math.floor(Math.random() * responses.length)]);
}
