/**
 * Run this script once to generate the bcrypt hash for your admin password.
 *
 * Usage:
 *   cd backend
 *   node generate-password-hash.js
 *
 * Then copy the printed hash into your .env file as ADMIN_PASSWORD_HASH
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter admin password: ', (password) => {
  if (!password || password.length < 6) {
    console.error('Password must be at least 6 characters.');
    process.exit(1);
  }
  const hash = bcrypt.hashSync(password, 10);
  console.log('\n✅ Your ADMIN_PASSWORD_HASH for .env:\n');
  console.log(hash);
  console.log('\nCopy the above line into your .env file.');
  rl.close();
});
