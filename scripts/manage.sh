#!/bin/bash

# Manage script for Guidesoft IT Solutions
# Usage: ./manage.sh [command] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show help
show_help() {
    echo "Guidesoft IT Solutions Management Script"
    echo ""
    echo "Usage: ./manage.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  create-admin    Create a new admin user"
    echo "  list-users      List all users"
    echo "  reset-password  Reset user password"
    echo "  backup-db       Create database backup"
    echo "  restore-db      Restore database from backup"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./manage.sh create-admin --email admin@example.com --fullname \"Super Admin\""
    echo "  ./manage.sh reset-password --email user@example.com"
}

# Function to create admin user
create_admin() {
    local email=""
    local fullname=""
    local password=""
    local role="ADMIN"
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --email)
                email="$2"
                shift 2
                ;;
            --fullname)
                fullname="$2"
                shift 2
                ;;
            --role)
                role="$2"
                shift 2
                ;;
            *)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Validate required parameters
    if [[ -z "$email" ]] || [[ -z "$fullname" ]]; then
        print_error "Email and fullname are required"
        show_help
        exit 1
    fi
    
    # Check if password is provided via environment variable
    if [[ -z "$GUIDESOFT_SUPERADMIN_PASS" ]]; then
        print_warn "GUIDESOFT_SUPERADMIN_PASS environment variable not set"
        print_info "Generating random password..."
        password=$(openssl rand -base64 16)
        print_info "Generated password: $password"
        print_warn "Please save this password securely!"
    else
        password="$GUIDESOFT_SUPERADMIN_PASS"
    fi
    
    # Create admin user via Node.js script
    print_info "Creating admin user: $fullname ($email) with role $role"
    
    # Run Node.js script to create user
    node << EOF
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
    const prisma = new PrismaClient();
    
    try {
        const hashedPassword = await bcrypt.hash('$password', 10);
        
        const user = await prisma.user.create({
            data: {
                email: '$email',
                password: hashedPassword,
                name: '$fullname',
                role: '$role'
            }
        });
        
        console.log('Admin user created successfully!');
        console.log('User ID:', user.id);
        console.log('Email:', user.email);
        console.log('Role:', user.role);
    } catch (error) {
        console.error('Error creating admin user:', error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();
EOF
    
    if [[ $? -eq 0 ]]; then
        print_info "Admin user created successfully!"
    else
        print_error "Failed to create admin user"
        exit 1
    fi
}

# Function to list users
list_users() {
    print_info "Listing all users..."
    
    node << EOF
const { PrismaClient } = require('@prisma/client');

async function listUsers() {
    const prisma = new PrismaClient();
    
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        });
        
        console.log('Users:');
        users.forEach(user => {
            console.log(`  - ${user.name} (${user.email}) [${user.role}] - Created: ${user.createdAt}`);
        });
    } catch (error) {
        console.error('Error listing users:', error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

listUsers();
EOF
}

# Function to reset password
reset_password() {
    local email=""
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --email)
                email="$2"
                shift 2
                ;;
            *)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Validate required parameters
    if [[ -z "$email" ]]; then
        print_error "Email is required"
        show_help
        exit 1
    fi
    
    # Generate new password
    local new_password=""
    if [[ -z "$GUIDESOFT_SUPERADMIN_PASS" ]]; then
        new_password=$(openssl rand -base64 16)
        print_info "Generated new password: $new_password"
        print_warn "Please save this password securely!"
    else
        new_password="$GUIDESOFT_SUPERADMIN_PASS"
    fi
    
    # Reset password via Node.js script
    print_info "Resetting password for user: $email"
    
    node << EOF
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function resetPassword() {
    const prisma = new PrismaClient();
    
    try {
        const hashedPassword = await bcrypt.hash('$new_password', 10);
        
        const user = await prisma.user.update({
            where: {
                email: '$email'
            },
            data: {
                password: hashedPassword
            }
        });
        
        console.log('Password reset successfully!');
        console.log('User ID:', user.id);
        console.log('Email:', user.email);
    } catch (error) {
        console.error('Error resetting password:', error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

resetPassword();
EOF
    
    if [[ $? -eq 0 ]]; then
        print_info "Password reset successfully!"
    else
        print_error "Failed to reset password"
        exit 1
    fi
}

# Function to backup database
backup_db() {
    local backup_dir="./backups"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="$backup_dir/backup_$timestamp.db"
    
    # Create backups directory if it doesn't exist
    mkdir -p "$backup_dir"
    
    print_info "Creating database backup..."
    
    # Copy database file
    if cp "./prisma/dev.db" "$backup_file"; then
        print_info "Database backup created: $backup_file"
    else
        print_error "Failed to create database backup"
        exit 1
    fi
}

# Function to restore database
restore_db() {
    local backup_file=""
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --file)
                backup_file="$2"
                shift 2
                ;;
            *)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Validate required parameters
    if [[ -z "$backup_file" ]]; then
        print_error "Backup file is required"
        show_help
        exit 1
    fi
    
    # Check if backup file exists
    if [[ ! -f "$backup_file" ]]; then
        print_error "Backup file not found: $backup_file"
        exit 1
    fi
    
    print_info "Restoring database from: $backup_file"
    
    # Stop any running server processes
    pkill -f "node.*server" || true
    
    # Restore database file
    if cp "$backup_file" "./prisma/dev.db"; then
        print_info "Database restored successfully!"
    else
        print_error "Failed to restore database"
        exit 1
    fi
}

# Main script logic
case "$1" in
    create-admin)
        shift
        create_admin "$@"
        ;;
    list-users)
        list_users
        ;;
    reset-password)
        shift
        reset_password "$@"
        ;;
    backup-db)
        backup_db
        ;;
    restore-db)
        shift
        restore_db "$@"
        ;;
    help|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac