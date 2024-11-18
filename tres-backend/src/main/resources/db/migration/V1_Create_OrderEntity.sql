CREATE TABLE OrderEntity (
    orderId VARCHAR(255) PRIMARY KEY,
    order_date VARCHAR(255) NOT NULL,
    order_time VARCHAR(255) NOT NULL,
    total_amount FLOAT NOT NULL
);
