import { IScript } from "../types"

const EXAMPLE_SQL = `
-- Enums
CREATE TYPE order_status AS ENUM ('Pending', 'Shipped', 'Cancelled', 'Delivered');
CREATE TYPE payment_method AS ENUM ('Credit Card', 'Paypal', 'Bank Transfer');

-- Table for Categories
CREATE TABLE Categories (
CategoryID SERIAL PRIMARY KEY,
CategoryName VARCHAR(100) NOT NULL,
Description TEXT
);

-- Table for Suppliers
CREATE TABLE Suppliers (
SupplierID SERIAL PRIMARY KEY,
Name VARCHAR(100) NOT NULL,
ContactEmail VARCHAR(100),
Phone VARCHAR(20)
);

-- Table for Products
CREATE TABLE Products (
ProductID SERIAL PRIMARY KEY,
ProductName VARCHAR(100) NOT NULL,
Price DECIMAL(10, 2) NOT NULL,
StockQuantity INT NOT NULL,
CategoryID INT REFERENCES Categories(CategoryID),
SupplierID INT REFERENCES Suppliers(SupplierID)
);

-- Table for Customers
CREATE TABLE Customers (
CustomerID SERIAL PRIMARY KEY,
FirstName VARCHAR(50),
LastName VARCHAR(50),
Email VARCHAR(100),
Phone VARCHAR(20),
ManagerID INT REFERENCES Customers(CustomerID)
);

-- Table for Orders
CREATE TABLE Orders (
OrderID SERIAL PRIMARY KEY,
OrderDate DATE DEFAULT CURRENT_DATE,
Status order_status DEFAULT 'Pending',
PaymentMethod payment_method,
CustomerID INT REFERENCES Customers(CustomerID)
);

-- Table for OrderDetails
CREATE TABLE OrderDetails (
OrderDetailID SERIAL PRIMARY KEY,
OrderID INT REFERENCES Orders(OrderID),
ProductID INT REFERENCES Products(ProductID),
Quantity INT NOT NULL,
UnitPrice DECIMAL(10, 2) NOT NULL
);
`

const EXAMPLE_SQL_2 = `
-- Create a Person table with person_id as its primary key
CREATE TABLE Person (
  person_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  age INT
);

-- Create a Passport table with passport_id as its primary key
CREATE TABLE Passport (
  passport_id SERIAL PRIMARY KEY,
  passport_number VARCHAR(20),
  country VARCHAR(20),
  person_id INT UNIQUE,  -- Unique foreign key constraint for 1-to-1 relationship
  FOREIGN KEY (person_id) REFERENCES Person(person_id)
);
`


export const EXAMPLE_SCRIPT: IScript = {
    id: "1",
    title: "Large Example Script",
    text: EXAMPLE_SQL,
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
}

export const EXAMPLE_SCRIPT_1_1: IScript = {
    id: "2",
    title: "Example Script (1 to 1)",
    text: EXAMPLE_SQL_2,
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
}