CREATE TABLE patient (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    created_by VARCHAR (10),
    created_at date,
    updated_at TIMESTAMP,
    is_deleted BOOLEAN,
    name VARCHAR(100) NOT NULL,
    identity_number VARCHAR(100) NOT NULL,
    address VARCHAR(300) NOT NULL,
    complaint VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    status VARCHAR(10)
)