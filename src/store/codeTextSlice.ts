import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const codeTextFromLocalStorage = localStorage.getItem("codeText") !== null ? JSON.parse(localStorage.getItem("codeText")!) : `
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
`;

const saveCodeTextToLocalStorage = (codeText: string) => {
    localStorage.setItem("codeText", JSON.stringify(codeText))
}

interface ICodeTextState {
    codeText: string;
}

const initialState : ICodeTextState = {
    codeText: codeTextFromLocalStorage,
};

export const codeTextSlice = createSlice({
    name: 'codeText',
    initialState,
    reducers: {

        setCodeText: (state, action: PayloadAction<string>) => {
            state.codeText = action.payload;
            saveCodeTextToLocalStorage(action.payload);
        }
    }
});

export const { setCodeText} = codeTextSlice.actions;
export default codeTextSlice.reducer;