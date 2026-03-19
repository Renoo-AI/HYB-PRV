// Javascript for Level 11
// Hint: Look closely at the password checking logic
document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to level 11. Hint: don't look at me, look at the server logic!");
    // Actually, wait, the prompt asks for a JS password leak.
    // Let's ensure the frontend has the password logic as well, or just hints at it.

    // The server currently checks for: 'superSecretJS123'
    // Let's hardcode it here for the user to find.
    const CORRECT_PASSWORD = 'superSecretJS123';

    // The server does the actual checking, but this file leaks the credential.
});