const gameData = {
    1: {
        title: "View Source Hunt",
        skill: "inspecting page source",
        flag: "THM{view_the_source}",
        hints: [
            "Every webpage is built with HTML code that your browser reads.",
            "Try right-clicking anywhere on the page and looking for 'View Page Source'.",
            "Press Ctrl+U (Windows) or Cmd+Option+U (Mac) and look closely!"
        ],
        explanation: {
            bug: "Information Disclosure in Source Code",
            why: "Developers sometimes forget to remove sensitive information or test data from the HTML source.",
            prevent: "Never store passwords, secret keys, or hidden features in plain text HTML."
        }
    },
    2: {
        title: "Hidden Comment Finder",
        skill: "reading comments in source",
        flag: "THM{comments_are_useful}",
        hints: [
            "Developers often leave notes for themselves in the code.",
            "HTML comments start with <!-- and end with -->.",
            "View the page source again and look for green text (in most syntax highlighters)."
        ],
        explanation: {
            bug: "Information Leak via HTML Comments",
            why: "Comments are sent to the client's browser. If they contain sensitive info, anyone can read them.",
            prevent: "Remove debug or sensitive comments before deploying to production."
        }
    },
    3: {
        title: "Broken Image Clue",
        skill: "noticing file paths and guessing URLs",
        flag: "THM{follow_the_path}",
        hints: [
            "That image isn't loading, but it must be trying to load from somewhere.",
            "Right-click the broken image and select 'Inspect' or 'Copy image address'.",
            "The image src attribute points to '/secret'. Try visiting that path directly!"
        ],
        explanation: {
            bug: "Insecure Directory/File References",
            why: "Sometimes broken paths hint at hidden or poorly protected directories.",
            prevent: "Don't rely on obscurity. Protect sensitive endpoints with proper authentication."
        }
    },
    4: {
        title: "Robots.txt Discovery",
        skill: "checking common files",
        flag: "THM{robots_know_secrets}",
        hints: [
            "Search engines look for a specific file at the root of a website to know what not to scan.",
            "Try visiting /robots.txt in your browser.",
            "Read what the robots.txt file says, and visit the hidden page it mentions!"
        ],
        explanation: {
            bug: "Information Disclosure via robots.txt",
            why: "Robots.txt is public. Hiding secret admin panels here just tells attackers exactly where to look.",
            prevent: "Don't put sensitive paths in robots.txt. Use authentication to protect them instead."
        }
    },
    5: {
        title: "Hidden Page Guessing",
        skill: "directory/file discovery logic",
        flag: "THM{hidden_pages_exist}",
        hints: [
            "Think like a lazy developer. What would they name an admin login page?",
            "It's usually a combination of 'admin' and 'login'.",
            "Try visiting /admin-login."
        ],
        explanation: {
            bug: "Security by Obscurity",
            why: "Guessable URLs are easily found by automated tools (dirbusting) or manual guessing.",
            prevent: "Never rely solely on a hidden URL for security. Always require login credentials."
        }
    },
    6: {
        title: "Simple Login Bypass",
        skill: "intro to SQL injection",
        flag: "THM{first_sqli}",
        hints: [
            "The server takes your username and puts it directly into a database query.",
            "Try tricking the database into thinking your input is always true.",
            "Use the classic payload: ' OR '1'='1"
        ],
        explanation: {
            bug: "SQL Injection (SQLi)",
            why: "Untrusted user input is directly concatenated into a database query, altering its logic.",
            prevent: "Always use parameterized queries or prepared statements. Never trust user input."
        }
    },
    7: {
        title: "URL Parameter Tampering",
        skill: "parameter tampering",
        flag: "THM{change_the_parameter}",
        hints: [
            "Look at the address bar. Do you see anything interesting after the '?'",
            "The URL tells the server who you are: ?user=guest.",
            "Change 'guest' to 'admin' and hit Enter!"
        ],
        explanation: {
            bug: "Insecure Direct Object Reference (IDOR) / Parameter Tampering",
            why: "The server trusts the URL parameter to determine user identity without verification.",
            prevent: "Use secure sessions (like cookies) to track logged-in users, not URL parameters."
        }
    },
    8: {
        title: "Price Manipulation",
        skill: "trusting client-side input is bad",
        flag: "THM{never_trust_user_input}",
        hints: [
            "The price of the item is being sent in the URL.",
            "Just like the last level, you can change the numbers in the address bar.",
            "Change ?price=100 to ?price=1."
        ],
        explanation: {
            bug: "Business Logic Flaw (Client-Side Trust)",
            why: "The server is trusting the client to dictate the price of an item.",
            prevent: "Prices and critical data must always be validated and retrieved securely on the server-side."
        }
    },
    9: {
        title: "Cookie Role Escalation",
        skill: "editing cookies in browser dev tools",
        flag: "THM{cookies_can_lie}",
        hints: [
            "The server remembers who you are using a 'cookie' stored in your browser.",
            "Open Developer Tools (F12) -> Application (or Storage) tab -> Cookies.",
            "Find the 'role' cookie, double click 'user', change it to 'admin', and refresh the page!"
        ],
        explanation: {
            bug: "Insecure Cookie Management",
            why: "The user's authorization role is stored in plaintext in a cookie that the user can modify.",
            prevent: "Store roles server-side in a session, and use cryptographically signed or encrypted cookies."
        }
    },
    10: {
        title: "Base64 Cookie Decode",
        skill: "Base64 recognition and tampering",
        flag: "THM{decode_then_edit}",
        hints: [
            "That cookie value 'cm9sZT11c2Vy' looks like gibberish, but it's actually Base64 encoding.",
            "Search online for a 'Base64 Decoder' or use the btoa() and atob() functions in your browser's console.",
            "Decode it (it says 'role=user'), change it to 'role=admin', Base64 encode it again ('cm9sZT1hZG1pbg=='), update your cookie, and refresh!"
        ],
        explanation: {
            bug: "Obfuscation is not Encryption",
            why: "Base64 is simply encoding, not encryption. Anyone can decode and re-encode it.",
            prevent: "Never store sensitive data or state in client-side cookies without strong cryptography (signatures/encryption)."
        }
    },
    11: {
        title: "JavaScript Password Leak",
        skill: "reading JavaScript source",
        flag: "THM{js_leaks_secrets}",
        hints: [
            "The page checks your password using a JavaScript file.",
            "Open DevTools, go to the Network or Sources tab, and look for a .js file.",
            "Read the code inside /js/level11.js to find the hardcoded password!"
        ],
        explanation: {
            bug: "Hardcoded Credentials in Client-Side Code",
            why: "All JavaScript sent to the browser can be read by the user.",
            prevent: "Never hardcode passwords or API keys in frontend code. Always authenticate on the server."
        }
    },
    12: {
        title: "Disabled Button Trick",
        skill: "editing HTML in dev tools",
        flag: "THM{frontend_is_not_security}",
        hints: [
            "The button is grayed out because of an HTML attribute.",
            "Right-click the button, select 'Inspect'.",
            "Double-click the word 'disabled' in the HTML and delete it. Then click the button!"
        ],
        explanation: {
            bug: "Missing Server-Side Authorization",
            why: "The server doesn't check if the user is actually allowed to perform the action; it only relies on the UI restricting them.",
            prevent: "Always enforce access controls on the backend. Frontend restrictions are purely cosmetic."
        }
    },
    13: {
        title: "Client-Side Validation Bypass",
        skill: "understanding client-side vs server-side checks",
        flag: "THM{validation_bypassed}",
        hints: [
            "The form uses JavaScript to stop you from sending a short username.",
            "You need to bypass the JS. Try using DevTools to edit the HTML form.",
            "Right-click the form, 'Inspect', and delete the 'onsubmit=\"return validateForm()\"' part. Then submit a short name!"
        ],
        explanation: {
            bug: "Insufficient Server-Side Validation",
            why: "The server blindly accepts the data, trusting that the frontend JavaScript validated it.",
            prevent: "Client-side validation is for UX only. Always duplicate validation logic securely on the server."
        }
    },
    14: {
        title: "Hidden Input Field",
        skill: "editing form values",
        flag: "THM{hidden_is_not_safe}",
        hints: [
            "There's a secret input field in the form that you can't see.",
            "Right-click the 'Update Profile' button and select 'Inspect'. Look just above the button in the HTML.",
            "Find the hidden input named 'isAdmin' and change its value from 'false' to 'true'. Then submit!"
        ],
        explanation: {
            bug: "Hidden Field Manipulation",
            why: "Hidden fields are just HTML. The user can modify them easily before submitting the form.",
            prevent: "Never use hidden fields to store critical state or permission levels."
        }
    },
    15: {
        title: "IDOR Beginner Lab",
        skill: "insecure direct object reference",
        flag: "THM{idor_found}",
        hints: [
            "Look at the URL. It's asking for a specific ID.",
            "You are viewing ID 1. What happens if you look at a different number?",
            "Change ?id=1 to ?id=2 in the address bar."
        ],
        explanation: {
            bug: "Insecure Direct Object Reference (IDOR)",
            why: "The application provides direct access to objects based on user-supplied input without checking permissions.",
            prevent: "Implement access control checks. Verify the logged-in user has permission to access the requested resource ID."
        }
    },
    16: {
        title: "File Name Guessing",
        skill: "common file enumeration mindset",
        flag: "THM{backup_files_matter}",
        hints: [
            "Developers often leave zip files or text files lying around.",
            "Try common names like 'backup', 'db', or 'old'.",
            "Try visiting /backup.zip in the URL!"
        ],
        explanation: {
            bug: "Sensitive Data Exposure",
            why: "Leaving backup files in the webroot makes them accessible to anyone who guesses the name.",
            prevent: "Store backups outside the public web directory or restrict access using server configurations."
        }
    },
    17: {
        title: "Search Box XSS Intro",
        skill: "reflected XSS basics",
        flag: "THM{xss_is_real}",
        hints: [
            "Whatever you search for is printed directly onto the page.",
            "What happens if you search for HTML code?",
            "Try searching for exactly this: <script>alert(1)</script>"
        ],
        explanation: {
            bug: "Reflected Cross-Site Scripting (XSS)",
            why: "The server takes user input and reflects it back into the HTML response without escaping it, allowing execution of malicious scripts.",
            prevent: "Always encode/escape user input before rendering it in the browser (e.g., convert < to &lt;)."
        }
    },
    18: {
        title: "Profile Message Stored XSS",
        skill: "stored XSS basics",
        flag: "THM{stored_xss_master}",
        hints: [
            "Instead of just bouncing back like a search page, this saves your input.",
            "You can save the same malicious code as the last level.",
            "Submit <script>alert(1)</script> as your message!"
        ],
        explanation: {
            bug: "Stored Cross-Site Scripting (XSS)",
            why: "The payload is saved permanently in the database and executed whenever anyone views the affected page.",
            prevent: "Sanitize input on arrival and encode output upon rendering."
        }
    },
    19: {
        title: "Path Traversal Lite",
        skill: "path traversal concept",
        flag: "THM{dot_dot_slash}",
        hints: [
            "The URL tells the server which file to load.",
            "You can use '../' to go up a folder directory.",
            "Change the parameter to ?page=../flag.txt"
        ],
        explanation: {
            bug: "Local File Inclusion (LFI) / Path Traversal",
            why: "The server uses unsanitized user input to construct a file path, allowing access to files outside the intended directory.",
            prevent: "Use safe APIs for accessing files, avoid passing filenames directly, or use strict allowlists."
        }
    },
    20: {
        title: "Multi-Step Final Challenge",
        skill: "chaining easy web bugs",
        flag: "THM{web_beginner_complete}",
        hints: [
            "First, check the source code or network tab to find a hidden Javascript file that might tell you where to go.",
            "Once you find the secret endpoint (/secret-admin-gate), it will complain about a missing cookie.",
            "Use DevTools to add a cookie named 'step2' with the value 'completed' and refresh the secret page!"
        ],
        explanation: {
            bug: "Chained Vulnerabilities",
            why: "Real-world attacks often require combining multiple small leaks or misconfigurations.",
            prevent: "Defense in depth: secure your code, secure your cookies, and secure your endpoints."
        }
    }
};
