CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    country VARCHAR(50)
);

CREATE TABLE navatar (
    navatar_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    navatar_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
    location VARCHAR(100) NOT NULL,
);

CREATE TABLE navatar_admin (
    admin_name VARCHAR(100) NOT NULL,
    admin_email VARCHAR(100) PRIMARY KEY
    navatar_id INTEGER NOT NULL,
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobileno VARCHAR(15),
    company_id INTEGER NOT NULL,
    roles VARCHAR(50), -- e.g., doctor, nurse
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);

CREATE TABLE meeting(
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL, -- Duration in minutes
    booking_status VARCHAR(20) NOT NULL, -- e.g., confirmed, cancelled
    meeting_status VARCHAR(20) NOT NULL, -- e.g., completed, pending
    booking_reference VARCHAR(50) NOT NULL,
    booking_amount DECIMAL(10, 2),
    partner_id INTEGER NOT NULL,
    payment_id SERIAL ,
    payment_amount DECIMAL(10,2),
    payment_date_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
);


