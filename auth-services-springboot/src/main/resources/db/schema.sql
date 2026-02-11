-- Custom ENUM type for user roles
CREATE TYPE user_role AS ENUM ('ADMIN', 'STAFF', 'USER');

-- Users table - Authentication data
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'USER',
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default admin user
-- Username: admin
-- Password: admin123
INSERT INTO users (username, password, role, is_active)
VALUES (
    'admin',
    '$2a$10$slYQmyNdGzin7olVN3p8.OPST9/PgBkqquzi.OnMWrMHAc5bQsL5q',
    'ADMIN',
    TRUE
) ON CONFLICT (username) DO NOTHING;
```

## 2. Minimal Project Structure
```
src/main/java/com/pos/
├── config/
│   └── SecurityConfig.java
├── controller/
│   └── AuthController.java
├── entity/
│   ├── User.java
│   └── UserRole.java
├── repository/
│   └── UserRepository.java
├── security/
│   ├── JwtUtil.java
│   └── JwtAuthenticationFilter.java
├── service/
│   └── CustomUserDetailsService.java
└── dto/
    ├── LoginRequest.java
    └── AuthResponse.java