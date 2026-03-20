module.exports = {
    "1": {
        "title": "Welcome to CyberCorp",
        "category": "Starter Rooms",
        "mission": "Our intelligence suggests CyberCorp's new public landing page was rushed. They might have left something behind in the source code. Find the hidden flag.",
        "skill": "Inspecting page source",
        "flag": "THM{view_the_source}",
        "theme": "Corporate Landing Page",
        "botIntro": "Hey hacker! I'm Byte. Welcome to your first target. CyberCorp's homepage looks normal, but the real secrets are always under the hood. Take a look!",
        "hints": [
            "Every webpage is built with HTML code that your browser reads. It's like the matrix.",
            "Try right-clicking anywhere on the page and looking for 'View Page Source'.",
            "Press Ctrl+U (Windows) or Cmd+Option+U (Mac). The flag is right there in plain sight!"
        ],
        "explanation": {
            "bug": "Information Disclosure in Source Code",
            "why": "Developers sometimes forget to remove sensitive information or test data from the HTML source.",
            "prevent": "Never store passwords, secret keys, or hidden features in plain text HTML."
        }
    },
    "2": {
        "title": "The Forgotten Note",
        "category": "Starter Rooms",
        "mission": "A developer at 'DataTech' left a sticky note for themselves, but they left it in the digital realm. Can you find their hidden comment?",
        "skill": "Reading HTML comments",
        "flag": "THM{comments_are_useful}",
        "theme": "Developer Blog",
        "botIntro": "Target acquired: DataTech's dev blog. Developers love leaving notes for themselves... sometimes they forget to delete them before going live. Dig in!",
        "hints": [
            "Developers often leave notes for themselves in the code using HTML comments.",
            "HTML comments start with <!-- and end with -->.",
            "View the page source again. Look for green text (in most syntax highlighters) or search for '<!--'."
        ],
        "explanation": {
            "bug": "Information Leak via HTML Comments",
            "why": "Comments are sent to the client's browser. If they contain sensitive info, anyone can read them.",
            "prevent": "Remove debug or sensitive comments before deploying to production."
        }
    },
    "3": {
        "title": "Shattered Images",
        "category": "Starter Rooms",
        "mission": "An art gallery's website has a broken image link. The path it's trying to load might reveal a secret directory. Follow the trail.",
        "skill": "Noticing file paths and guessing URLs",
        "flag": "THM{follow_the_path}",
        "theme": "Art Gallery Portfolio",
        "botIntro": "We're looking at a fancy art gallery. Notice anything broken? Sometimes a broken link is exactly the breadcrumb we need. Where is it trying to go?",
        "hints": [
            "That image isn't loading, but it must be trying to load from somewhere.",
            "Right-click the broken image and select 'Inspect' or 'Copy image address'.",
            "The image src attribute points to a '/secret' folder. Try visiting that path directly in your URL bar!"
        ],
        "explanation": {
            "bug": "Forced Browsing / Directory Discovery",
            "why": "Sensitive directories or files are often left on servers without protection, hoping nobody guesses the name.",
            "prevent": "Use proper authentication and access controls for all directories, even 'hidden' ones."
        }
    },
    "4": {
        "title": "Droid Instructions",
        "category": "Starter Rooms",
        "mission": "Every website has a set of rules telling search engine bots where they are NOT allowed to go. These 'forbidden' areas are exactly where we want to look.",
        "skill": "Checking common files (robots.txt)",
        "flag": "THM{robots_know_secrets}",
        "theme": "Search Engine Optimizer Dashboard",
        "botIntro": "This site is heavily optimized for search engines. But they have a file that literally lists the places they want to hide. Let's ask the robots.",
        "hints": [
            "Search engines look for a specific file at the root of a website to know what not to scan.",
            "Try visiting /robots.txt in your browser address bar.",
            "Read what the robots.txt file says, and visit the hidden page it explicitly mentions!"
        ],
        "explanation": {
            "bug": "Sensitive Data Exposure via robots.txt",
            "why": "robots.txt is a public file. Using it to hide sensitive admin panels or secret pages actually tells attackers exactly where to look.",
            "prevent": "Never use robots.txt for security. Use authentication to protect sensitive pages."
        }
    },
    "5": {
        "title": "The Hidden Door",
        "category": "Starter Rooms",
        "mission": "The target claims to have no admin panel, but human nature says otherwise. Use your intuition to guess the hidden URL.",
        "skill": "Directory/file discovery logic",
        "flag": "THM{hidden_pages_exist}",
        "theme": "Minimalist Web Portal",
        "botIntro": "There's no visible login button here. But administrators have to log in somehow, right? Time to think like a lazy sysadmin.",
        "hints": [
            "Think like a lazy developer. What would they name an admin login page?",
            "It's usually a combination of 'admin' and 'login'.",
            "Try visiting /admin-login directly in your browser."
        ],
        "explanation": {
            "bug": "Security through Obscurity",
            "why": "Hiding a page by not linking to it doesn't make it secure. Attackers use automated tools to guess thousands of common folder names in seconds.",
            "prevent": "Always require strong authentication for administrative interfaces, regardless of the URL."
        }
    },
    "6": {
        "title": "The Magic Quote",
        "category": "Web Basics",
        "mission": "We've found a legacy employee login portal. The database query is directly taking our input. Can you trick the database into letting you in without a password?",
        "skill": "Intro to SQL Injection",
        "flag": "THM{first_sqli}",
        "theme": "Legacy Employee Login Gateway",
        "botIntro": "Ah, an old employee portal. These older systems often trust whatever you type into the username box. Let's try to confuse the database with some special characters.",
        "hints": [
            "The server takes your username and puts it directly into a database query.",
            "Try tricking the database into thinking your input is mathematically true.",
            "Use the classic payload: ' OR '1'='1"
        ],
        "explanation": {
            "bug": "SQL Injection (SQLi)",
            "why": "The application inserts user input directly into a database command without sanitizing it, allowing the attacker to alter the logic of the query.",
            "prevent": "Always use Parameterized Queries (Prepared Statements) or ORMs. Never concatenate strings to build SQL queries."
        }
    },
    "7": {
        "title": "Identity Crisis",
        "category": "Web Basics",
        "mission": "The application determines who you are based on a parameter directly in the URL. Change your identity to an administrator.",
        "skill": "URL Parameter Tampering",
        "flag": "THM{change_the_parameter}",
        "theme": "User Profile System",
        "botIntro": "Look up at the URL bar. It says '?user=guest'. If the server is just trusting that blindly, we can be anyone we want to be. Try changing it!",
        "hints": [
            "Look at the address bar. Do you see anything interesting after the '?'",
            "The URL tells the server who you are: ?user=guest.",
            "Change 'guest' to 'admin' and hit Enter!"
        ],
        "explanation": {
            "bug": "Insecure Direct Object Reference (IDOR) / Parameter Tampering",
            "why": "The server trusts the URL parameter to determine user identity without verification.",
            "prevent": "Use secure sessions (like cookies) to track logged-in users, not URL parameters."
        }
    },
    "8": {
        "title": "The One Cent Store",
        "category": "Input Tampering",
        "mission": "Welcome to an expensive electronics store. But wait, the price is being sent to the server from your browser. Give yourself a massive discount.",
        "skill": "Business Logic / Price Manipulation",
        "flag": "THM{never_trust_user_input}",
        "theme": "High-End E-Commerce Shop",
        "botIntro": "This store is selling items for way too much money. But look at how the price is being passed. Never trust the client... especially when they are setting their own prices.",
        "hints": [
            "The price of the item is being sent in the URL.",
            "Just like the last level, you can change the numbers in the address bar.",
            "Change ?price=100 to ?price=1."
        ],
        "explanation": {
            "bug": "Business Logic Flaw (Client-Side Trust)",
            "why": "The server is trusting the client to dictate the price of an item.",
            "prevent": "Prices and critical data must always be validated and retrieved securely on the server-side from a trusted database."
        }
    },
    "9": {
        "title": "Cookie Monster",
        "category": "Input Tampering",
        "mission": "The server gave you a cookie to remember your role. Check your browser's storage and forge a new permission level.",
        "skill": "Editing cookies in browser dev tools",
        "flag": "THM{cookies_can_lie}",
        "theme": "Corporate Intranet Dashboard",
        "botIntro": "The server handed your browser a 'cookie' to remember you're just a 'user'. But what if we just open our dev tools and change it? Let's escalate our privileges.",
        "hints": [
            "The server remembers who you are using a 'cookie' stored in your browser.",
            "Open Developer Tools (F12) -> Application (or Storage tab) -> Cookies.",
            "Find the 'role' cookie, double click 'user', change it to 'admin', and refresh the page!"
        ],
        "explanation": {
            "bug": "Insecure Cookie Management",
            "why": "The user's authorization role is stored in plaintext in a cookie that the user can freely modify.",
            "prevent": "Store roles server-side in a session, and use cryptographically signed or encrypted cookies."
        }
    },
    "10": {
        "title": "The Base64 Illusion",
        "category": "Input Tampering",
        "mission": "The server thought they were being smart by 'encrypting' your cookie. But it's just Base64 encoding. Decode it, change your role, and re-encode it.",
        "skill": "Base64 recognition and tampering",
        "flag": "THM{decode_then_edit}",
        "theme": "Secure File Vault",
        "botIntro": "They tried to hide the role in the cookie this time using gibberish. But any hacker knows Base64 when they see it. Let's decode their illusion.",
        "hints": [
            "That cookie value 'cm9sZT11c2Vy' looks like gibberish, but it's actually Base64 encoding.",
            "Search online for a 'Base64 Decoder' or use the btoa() and atob() functions in your browser's console.",
            "Decode it (it says 'role=user'), change it to 'role=admin', Base64 encode it again ('cm9sZT1hZG1pbg=='), update your cookie, and refresh!"
        ],
        "explanation": {
            "bug": "Obfuscation is not Encryption",
            "why": "Base64 is simply encoding, not encryption. Anyone can decode and re-encode it in seconds.",
            "prevent": "Never store sensitive data or state in client-side cookies without strong cryptography (signatures/encryption)."
        }
    },
    "11": {
        "title": "Leaky Logic",
        "category": "Client-Side Bypass",
        "mission": "The login page is entirely handled by the front-end JavaScript. Hunt through the scripts loaded by the browser to find the hardcoded password.",
        "skill": "Reading JavaScript source",
        "flag": "THM{js_leaks_secrets}",
        "theme": "Admin Control Panel",
        "botIntro": "This login form doesn't even talk to the server. It checks the password using JavaScript right here in the browser. Which means... we have the password.",
        "hints": [
            "The page checks your password using a JavaScript file.",
            "Open DevTools, go to the Network or Sources tab, and look for a .js file.",
            "Read the code inside /js/level11.js to find the hardcoded password!"
        ],
        "explanation": {
            "bug": "Hardcoded Credentials in Client-Side Code",
            "why": "All JavaScript sent to the browser can be read by the user. There are no secrets on the frontend.",
            "prevent": "Never hardcode passwords or API keys in frontend code. Always authenticate on the server."
        }
    },
    "12": {
        "title": "Grayed Out",
        "category": "Client-Side Bypass",
        "mission": "A critical system action button is disabled, stopping you from clicking it. Remove the restriction using your browser tools.",
        "skill": "Editing HTML attributes in dev tools",
        "flag": "THM{frontend_is_not_security}",
        "theme": "Factory Diagnostics Terminal",
        "botIntro": "They disabled the self-destruct button in the HTML. Cute. But the browser is our territory. We can just re-enable it.",
        "hints": [
            "The button is grayed out because of an HTML attribute.",
            "Right-click the button, select 'Inspect'.",
            "Double-click the word 'disabled' in the HTML and delete it. Then click the button!"
        ],
        "explanation": {
            "bug": "Missing Server-Side Authorization",
            "why": "The server doesn't check if the user is actually allowed to perform the action; it only relies on the UI restricting them.",
            "prevent": "Always enforce access controls on the backend. Frontend restrictions are purely cosmetic."
        }
    },
    "13": {
        "title": "The Form Check",
        "category": "Client-Side Bypass",
        "mission": "The registration form won't let you submit a short username. Bypass the client-side JavaScript validation to send the payload to the server.",
        "skill": "Understanding client-side vs server-side checks",
        "flag": "THM{validation_bypassed}",
        "theme": "Exclusive Membership Registration",
        "botIntro": "The form is complaining that your username is too short before it even sends it to the server. Bypass the frontend validation to force it through.",
        "hints": [
            "The form uses JavaScript to stop you from sending a short username.",
            "You need to bypass the JS. Try using DevTools to edit the HTML form.",
            "Right-click the form, 'Inspect', and delete the 'onsubmit=\"return validateForm()\"' part. Then submit a short name!"
        ],
        "explanation": {
            "bug": "Insufficient Server-Side Validation",
            "why": "The server blindly accepts the data, trusting that the frontend JavaScript validated it.",
            "prevent": "Client-side validation is for UX only. Always duplicate validation logic securely on the server."
        }
    },
    "14": {
        "title": "Invisible Ink",
        "category": "Client-Side Bypass",
        "mission": "The update profile form is sending hidden data about your admin status along with your name. Find the hidden field and change your destiny.",
        "skill": "Editing hidden form values",
        "flag": "THM{hidden_is_not_safe}",
        "theme": "User Settings Dashboard",
        "botIntro": "There's more to this form than meets the eye. Developers sometimes hide inputs on the page to send data silently. Let's make the invisible visible.",
        "hints": [
            "There's a secret input field in the form that you can't see.",
            "Right-click the 'Update Profile' button and select 'Inspect'. Look just above the button in the HTML.",
            "Find the hidden input named 'isAdmin' and change its value from 'false' to 'true'. Then submit!"
        ],
        "explanation": {
            "bug": "Hidden Field Manipulation",
            "why": "Hidden fields are just standard HTML. The user can inspect and modify them easily before submitting the form.",
            "prevent": "Never use hidden fields to store critical state or permission levels."
        }
    },
    "15": {
        "title": "Stepping Sideways",
        "category": "File Discovery",
        "mission": "You are viewing your own receipt with ID 1. What happens if you try to view someone else's receipt by changing the number?",
        "skill": "Insecure Direct Object Reference (IDOR)",
        "flag": "THM{idor_found}",
        "theme": "Bank Portal Transactions",
        "botIntro": "You're logged in looking at transaction ID 1. But does the bank actually check if you OWN transaction 2? Only one way to find out.",
        "hints": [
            "Look at the URL. It's asking for a specific transaction ID.",
            "You are viewing ID 1. What happens if you look at a different number?",
            "Change ?id=1 to ?id=2 in the address bar."
        ],
        "explanation": {
            "bug": "Insecure Direct Object Reference (IDOR)",
            "why": "The application provides direct access to objects based on user-supplied input without checking permissions.",
            "prevent": "Implement robust access control checks. Verify the logged-in user has permission to access the requested resource ID before serving it."
        }
    },
    "16": {
        "title": "Lost and Found",
        "category": "File Discovery",
        "mission": "A careless admin zipped up their old database and left it on the public server. Can you guess the name of the backup file?",
        "skill": "Common file enumeration mindset",
        "flag": "THM{backup_files_matter}",
        "theme": "Corporate Backup Server",
        "botIntro": "Sysadmins get tired. Sometimes they zip up old files and just leave them sitting on the web server. Let's do some educated guessing.",
        "hints": [
            "Developers often leave zip files or text files lying around.",
            "Try common names like 'backup', 'db', or 'old'.",
            "Try visiting /backup.zip directly in the URL!"
        ],
        "explanation": {
            "bug": "Sensitive Data Exposure",
            "why": "Leaving backup files or database dumps in the webroot makes them accessible to anyone who guesses the filename.",
            "prevent": "Store backups securely outside the public web directory or restrict access using server configurations."
        }
    },
    "17": {
        "title": "The Echo Chamber",
        "category": "Final Boss Rooms",
        "mission": "This search bar reflects whatever you type directly onto the page. Inject HTML and JavaScript to execute an alert popup.",
        "skill": "Reflected XSS basics",
        "flag": "THM{xss_is_real}",
        "theme": "Community Search Portal",
        "botIntro": "Whatever you search for gets printed back to you. What if we search for code instead of words? Will the browser execute it? Let's write our first XSS payload.",
        "hints": [
            "Whatever you search for is printed directly onto the page without escaping.",
            "What happens if you search for an HTML tag, like <u>test</u>?",
            "Try searching for exactly this script payload: <script>alert(1)</script>"
        ],
        "explanation": {
            "bug": "Reflected Cross-Site Scripting (XSS)",
            "why": "The server takes user input and reflects it back into the HTML response without escaping it, allowing execution of malicious scripts.",
            "prevent": "Always encode/escape user input before rendering it in the browser (e.g., convert < to &lt;)."
        }
    },
    "18": {
        "title": "Poisoned Profiles",
        "category": "Final Boss Rooms",
        "mission": "Unlike a search bar, this profile page permanently saves your message. Inject a persistent malicious payload that triggers every time the page loads.",
        "skill": "Stored XSS basics",
        "flag": "THM{stored_xss_master}",
        "theme": "Employee Message Board",
        "botIntro": "This isn't just an echo; the server saves your message permanently. If we put a payload here, it will strike anyone who visits this page. Stored XSS is dangerous.",
        "hints": [
            "Instead of just bouncing back like a search page, this saves your input.",
            "You can use the exact same malicious code as the last level.",
            "Submit <script>alert(1)</script> as your message!"
        ],
        "explanation": {
            "bug": "Stored Cross-Site Scripting (XSS)",
            "why": "The payload is saved permanently in the database and executed whenever anyone views the affected page.",
            "prevent": "Sanitize input on arrival and strictly encode output upon rendering."
        }
    },
    "19": {
        "title": "Stepping Up",
        "category": "Final Boss Rooms",
        "mission": "The application loads different pages based on a file path in the URL. Manipulate the path to escape the web directory and read a hidden system file.",
        "skill": "Path Traversal Concept",
        "flag": "THM{dot_dot_slash}",
        "theme": "Server File Viewer",
        "botIntro": "Look at how it loads the 'about.html' page. It's asking the server for a file path. We can use '../' to tell the server to go 'up' a directory and read files we shouldn't see.",
        "hints": [
            "The URL tells the server which file to load: ?page=about.html",
            "You can use '../' to go up a folder directory. The flag is located at 'flag.txt' one folder above.",
            "Change the parameter to ?page=../flag.txt"
        ],
        "explanation": {
            "bug": "Local File Inclusion (LFI) / Path Traversal",
            "why": "The server uses unsanitized user input to construct a file path, allowing access to files outside the intended web directory.",
            "prevent": "Use safe APIs for accessing files, avoid passing filenames directly, or use strict allowlists."
        }
    },
    "20": {
        "title": "The Heist",
        "category": "Final Boss Rooms",
        "mission": "The final test. Combine multiple techniques to infiltrate the deepest level of the application. Find the hidden endpoint, satisfy its conditions, and claim victory.",
        "skill": "Chaining Vulnerabilities",
        "flag": "THM{web_beginner_complete}",
        "theme": "The Mainframe Gate",
        "botIntro": "This is it, hacker. The final boss. You'll need to use multiple things you've learned here. Inspect the source to find the target, then forge your credentials to get in.",
        "hints": [
            "First, check the page source or the network tab to find a hidden Javascript file that might tell you where the secret endpoint is.",
            "Once you find the secret endpoint (/secret-admin-gate), it will complain about a missing cookie.",
            "Use DevTools to add a cookie named 'step2' with the value 'completed' and refresh the secret page!"
        ],
        "explanation": {
            "bug": "Chained Vulnerabilities",
            "why": "Real-world attacks often require combining multiple small leaks (information disclosure) with misconfigurations (client-side trust) to achieve full compromise.",
            "prevent": "Defense in depth: secure your code, secure your cookies, and secure your endpoints."
        }
    }
};
