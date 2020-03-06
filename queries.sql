-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.ProductName, c.CategoryName 
From Product AS p
JOIN Category AS c
ON p.CategoryId = c.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.id, s.CompanyName 
From Order AS o
JOIN Shipper AS s
    ON o.shipVia = s.id 
WHERE o.orderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT oD.Quantity, p.ProductName
FROM OrderDetail as oD
JOIN Product as p
    ON oD.OrderId is 10251 and oD.productId = p.id
Order By p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT DISTINCT o.id as 'OrderID', e.LastName as 'Employee_LastName'
FROM "Order" as o
JOIN Employee as e
    ON o.EmployeeId = e.id;