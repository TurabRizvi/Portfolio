// Usage: npm run hash-password -- "your-new-password"
// Prints a bcrypt hash to paste into .env as ADMIN_PASSWORD_HASH.
// The plaintext password is never stored anywhere — only this hash is.

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- "your-new-password"');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  console.log('\nAdd this line to your .env:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
});
