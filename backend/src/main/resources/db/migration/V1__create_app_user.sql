CREATE TABLE app_user (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(254) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_app_user_email UNIQUE (email),

    CONSTRAINT chk_app_user_email_normalized
        CHECK (email = lower(btrim(email)) AND email <> ''),

    CONSTRAINT chk_app_user_role
        CHECK (role IN ('USER', 'ADMIN'))
);