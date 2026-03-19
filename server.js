const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', { isolated: req.query.isolated === 'true' });
});

// Level 1: View Source Hunt
app.get('/level/1', (req, res) => {
    res.render('level1', { isolated: req.query.isolated === 'true' });
});

// Level 2: Hidden Comment Finder
app.get('/level/2', (req, res) => {
    res.render('level2', { isolated: req.query.isolated === 'true' });
});

// Level 3: Broken Image Path
app.get('/level/3', (req, res) => {
    res.render('level3', { isolated: req.query.isolated === 'true' });
});

app.get('/secret', (req, res) => {
    // Only used for level 3
    res.send('THM{follow_the_path}');
});

// Level 4: robots.txt Discovery
// Express will serve robots.txt from public directory if it exists
app.get('/level/4', (req, res) => {
    res.render('level4', { isolated: req.query.isolated === 'true' });
});
app.get('/hidden-robot-page', (req, res) => {
    res.send('THM{robots_know_secrets}');
});

// Level 5: Hidden Page Guessing
app.get('/level/5', (req, res) => {
    res.render('level5', { isolated: req.query.isolated === 'true' });
});
app.get('/admin-login', (req, res) => {
    res.send('THM{hidden_pages_exist}');
});

// Level 6: SQL Injection Login
app.get('/level/6', (req, res) => {
    res.render('level6', { isolated: req.query.isolated === 'true', error: null });
});

app.post('/level/6/login', (req, res) => {
    const username = req.body.username;
    // Simulated vulnerable login logic
    if (username === "' OR '1'='1" || username === '" OR "1"="1') {
        res.send('THM{first_sqli}');
    } else {
        res.render('level6', { isolated: req.query.isolated === 'true', error: 'Invalid credentials' });
    }
});

// Level 7: URL Parameter Tampering
app.get('/level/7', (req, res) => {
    const user = req.query.user || 'guest';
    if (user === 'admin') {
        res.send('THM{change_the_parameter}');
    } else {
        res.render('level7', { isolated: req.query.isolated === 'true', user: user });
    }
});

// Level 8: Price Manipulation
app.get('/level/8', (req, res) => {
    const price = req.query.price || '100';
    if (price === '1') {
        res.send('THM{never_trust_user_input}');
    } else {
        res.render('level8', { isolated: req.query.isolated === 'true', price: price });
    }
});

// Level 9: Cookie Role Escalation
app.get('/level/9', (req, res) => {
    if (!req.cookies.role) {
        res.cookie('role', 'user');
        res.render('level9', { isolated: req.query.isolated === 'true', role: 'user' });
    } else {
        const role = req.cookies.role;
        if (role === 'admin') {
            res.send('THM{cookies_can_lie}');
        } else {
            res.render('level9', { isolated: req.query.isolated === 'true', role: role });
        }
    }
});

// Level 10: Base64 Cookie Decode
app.get('/level/10', (req, res) => {
    if (!req.cookies.auth) {
        // Base64 encode for 'user'
        res.cookie('auth', Buffer.from('role=user').toString('base64'));
        res.render('level10', { isolated: req.query.isolated === 'true', auth: Buffer.from('role=user').toString('base64') });
    } else {
        const authBase64 = req.cookies.auth;
        try {
            const decoded = Buffer.from(authBase64, 'base64').toString('utf-8');
            if (decoded === 'role=admin') {
                res.send('THM{decode_then_edit}');
            } else {
                res.render('level10', { isolated: req.query.isolated === 'true', auth: authBase64 });
            }
        } catch (e) {
            res.render('level10', { isolated: req.query.isolated === 'true', auth: authBase64 });
        }
    }
});

// Level 11: JS Password Leak
app.get('/level/11', (req, res) => {
    res.render('level11', { isolated: req.query.isolated === 'true', error: null });
});
app.post('/level/11/login', (req, res) => {
    if (req.body.password === 'superSecretJS123') {
        res.send('THM{js_leaks_secrets}');
    } else {
        res.render('level11', { isolated: req.query.isolated === 'true', error: 'Invalid password' });
    }
});

// Level 12: Disabled Button Trick
app.get('/level/12', (req, res) => {
    res.render('level12', { isolated: req.query.isolated === 'true' });
});
app.post('/level/12/admin', (req, res) => {
    res.send('THM{frontend_is_not_security}');
});

// Level 13: Client-Side Validation Bypass
app.get('/level/13', (req, res) => {
    res.render('level13', { isolated: req.query.isolated === 'true', error: null });
});
app.post('/level/13/register', (req, res) => {
    // Backend doesn't validate properly, relies entirely on client side which can be bypassed.
    const username = req.body.username;
    if (username && username.length < 5) {
         res.send('THM{validation_bypassed}');
    } else {
         res.render('level13', { isolated: req.query.isolated === 'true', error: 'Username must be less than 5 characters to get the flag, but frontend blocks it!' });
    }
});

// Level 14: Hidden Input Field
app.get('/level/14', (req, res) => {
    res.render('level14', { isolated: req.query.isolated === 'true' });
});
app.post('/level/14/update', (req, res) => {
    if (req.body.isAdmin === 'true') {
        res.send('THM{hidden_is_not_safe}');
    } else {
        res.render('level14', { isolated: req.query.isolated === 'true', error: 'Profile updated. Still not admin.' });
    }
});

// Level 15: IDOR Beginner Lab
app.get('/level/15', (req, res) => {
    const id = req.query.id || '1';
    if (id === '2') {
        res.send('THM{idor_found}');
    } else {
        res.render('level15', { isolated: req.query.isolated === 'true', id: id });
    }
});

// Level 16: File Name Guessing
app.get('/level/16', (req, res) => {
    res.render('level16', { isolated: req.query.isolated === 'true' });
});
// Let's create backup files in public directory to guess, e.g., backup.zip, db.txt

// Level 17: Search Box XSS Intro
app.get('/level/17', (req, res) => {
    const query = req.query.q || '';
    if (query.includes('<script>') || query.includes('alert(')) {
         res.render('level17', { isolated: req.query.isolated === 'true', query: query, flag: 'THM{xss_is_real}' });
    } else {
         res.render('level17', { isolated: req.query.isolated === 'true', query: query, flag: null });
    }
});

// Level 18: Profile Message Stored XSS
app.get('/level/18', (req, res) => {
    let storedMessage = req.cookies.profileMessage || "Welcome to your profile!";
    let flag = null;
    if (storedMessage.includes('<script>') || storedMessage.includes('alert(')) {
        flag = 'THM{stored_xss_master}';
    }
    res.render('level18', { isolated: req.query.isolated === 'true', message: storedMessage, flag: flag });
});
app.post('/level/18/message', (req, res) => {
    res.cookie('profileMessage', req.body.message);
    const isolatedParam = req.query.isolated === 'true' ? '?isolated=true' : '';
    res.redirect('/level/18' + isolatedParam);
});

// Level 19: Path Traversal Lite
app.get('/level/19', (req, res) => {
    const page = req.query.page || 'about.html';
    // Simulate safe traversal
    if (page === '../flag.txt' || page.includes('..')) {
        res.send('THM{dot_dot_slash}');
    } else {
        res.render('level19', { isolated: req.query.isolated === 'true', page: page });
    }
});

// Level 20: Multi-Step Final Challenge
app.get('/level/20', (req, res) => {
    // Steps:
    // 1. Check JS source for path to /secret-admin-gate
    // 2. /secret-admin-gate needs cookie step2=completed
    res.render('level20', { isolated: req.query.isolated === 'true' });
});

app.get('/secret-admin-gate', (req, res) => {
    if (req.cookies.step2 === 'completed') {
        res.send('THM{web_beginner_complete}');
    } else {
        res.send('Access Denied. Ensure step2 cookie is "completed"');
    }
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Web Exploitation Playground listening at http://localhost:${port}`);
    });
}

module.exports = app;
