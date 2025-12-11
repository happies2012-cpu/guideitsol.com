# Test Users for Guidesoft Platform

This document provides information about test users that can be used for testing the Guidesoft platform.

## Existing Test Users

There is already a predefined test user in the seed data:

- **Email:** pranu21m@gmail.com
- **Password:** admin123
- **Name:** Super Admin
- **Role:** SUPER_ADMIN

Additional test users have been created:

- **Email:** testuser1@example.com
- **Password:** testpass123
- **Name:** Test User 1
- **Role:** USER

- **Email:** adminuser@example.com
- **Password:** adminpass123
- **Name:** Admin User
- **Role:** ADMIN

- **Email:** superadmin@example.com
- **Password:** superpass123
- **Name:** Super Admin User
- **Role:** SUPER_ADMIN
## Creating New Test Users

### Using the NPM Script (Recommended)

You can create new test users using the npm script:

```bash
npm run create:test-user <email> <password> <name> [role]
```

Examples:
```bash
# Create a regular user
npm run create:test-user testuser1@example.com testpass123 "Test User 1"

# Create an admin user
npm run create:test-user adminuser@example.com adminpass123 "Admin User" ADMIN

# Create a super admin user
npm run create:test-user superadmin@example.com superpass123 "Super Admin User" SUPER_ADMIN
```
### Using the Node Script Directly

You can also run the script directly:

```bash
node scripts/create-test-user.js <email> <password> <name> [role]
```

## Valid Roles

The following roles are valid in the Guidesoft platform:

- `USER` - Regular user
- `ADMIN` - Administrator
- `SUPER_ADMIN` - Super administrator with all privileges

If no role is specified, the default role is `USER`.

## Notes

- Passwords are stored securely using bcrypt hashing
- If a user with the specified email already exists, the script will show the existing user details
- The script will display the plaintext password in the output for testing purposes only