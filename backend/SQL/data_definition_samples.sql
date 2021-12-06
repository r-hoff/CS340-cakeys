DROP TABLE IF EXISTS `OrderedCakes`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `Cakes`;
DROP TABLE IF EXISTS `OrderReviews`;
DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `CustomerDiscount`;

#############################
# SET UP TABLES IN DATABASE #
#############################

# create table for CustomerDiscount entity
CREATE TABLE `CustomerDiscount` (
    `discount_ID` int(11) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `discount_name` varchar(255) NOT NULL,
    `discount_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# create table for Customers entity
CREATE TABLE `Customers` (
    `customer_ID` int(11) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `customer_first_name` varchar(255) NOT NULL,
    `customer_last_name` varchar(255) NOT NULL,
    `customer_DOB` date,
    `customer_street_address` varchar(255) NOT NULL,
    `customer_city` varchar(255) NOT NULL,
    `customer_state` varchar(255) NOT NULL,
    `customer_zip` varchar(255) NOT NULL,
    `customer_phone` varchar(255) NOT NULL,
    `customer_email` varchar(255) NOT NULL UNIQUE,
    `discount_ID` int(11),
    FOREIGN KEY (`discount_ID`) REFERENCES `CustomerDiscount` (`discount_ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# create table for OrderReviews entity
CREATE TABLE `OrderReviews` (
    `review_ID` int(11) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `overall_rating` int(11) NOT NULL,
    `product_quality_rating` int(11) NOT NULL,
    `service_rating` int(11) NOT NULL,
    `comment` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# create table for Orders entity
CREATE TABLE `Orders` (
    `order_ID` int(11) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `order_total_USD` float UNSIGNED NOT NULL,
    `order_date_time` datetime NOT NULL,
    `credit_card_number` varchar(255) NOT NULL,
    `credit_card_expiration` varchar(255) NOT NULL,
    `order_fill_date` date,
    `order_pickup_date` date,
    `customer_ID` int(11) NOT NULL,
    `review_ID` int(11) UNIQUE,
    FOREIGN KEY (`customer_ID`) REFERENCES `Customers` (`customer_ID`) ON DELETE CASCADE,
    FOREIGN KEY (`review_ID`) REFERENCES `OrderReviews` (`review_ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# create table for Cakes entity
CREATE TABLE `Cakes` (
    `cake_ID` int(11) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `cake_name` varchar(255) NOT NULL,
    `cake_size` int UNSIGNED NOT NULL,
    `cake_retail_price_USD` float UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# create table for OrderedCakes composite entity
CREATE TABLE `OrderedCakes` (
    `order_ID` int(11) NOT NULL,
    `cake_ID` int(11) NOT NULL,
    `cake_sale_price_USD` float UNSIGNED NOT NULL,   
    `cake_qty` int(11) NOT NULL,
    `order_status` varchar(255) NOT NULL,
    PRIMARY KEY (`order_ID`, `cake_ID`),
    FOREIGN KEY (`order_ID`) REFERENCES `Orders` (`order_ID`) ON DELETE CASCADE,
    FOREIGN KEY (`cake_ID`) REFERENCES `Cakes` (`cake_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


#############################
# POPULATE TABLES WITH DATA #
#############################

# insert dummy data into CustomerDiscount table
INSERT INTO `CustomerDiscount`(`discount_name`, `discount_rate`) VALUES
('Corporate Partnership', 0.15),
('Fall 2021 Sale', 0.05),
('Frequent Buyer', 0.1),
('Employee Discount', 0.25);

# insert dummy data into Customers table
INSERT INTO `Customers` (`customer_first_name`,`customer_last_name`,`customer_DOB`,`customer_street_address`,`customer_city`,`customer_state`, `customer_zip`, `customer_phone`, `customer_email`, `discount_ID`) VALUES
('John', 'Smith', '1996-10-10', '123 SW Street', 'Corvallis', 'OR', '97300', '123-456-7890', 'smithj@outlook.com', NULL),
('James', 'Smith', '1923-05-04', '456 SW Street', 'Corvallis', 'OR', '97301', '541-456-0789', 'james05@outlook.com', 1),
('Betty', 'Baker', '1990-01-05', '1234 Baguette Court', 'Corvallis', 'OR', '97301', '541-456-7890', 'betty_the_baker@cakeys.com', 4),
('Steve', 'Chowder', '2004-04-15', '832 Main Street', 'Corvallis', 'OR', '97301', '555-111-2222', 'stevie_lul@gmail.com', 3);

# insert dummy data into Cakes table
INSERT INTO `Cakes` (`cake_name`, `cake_size`, `cake_retail_price_USD`) VALUES
('Chocolate Strawberry Cake', 15, 45.99),
('Red Velvet Cake', 17, 52.99),
('Tiramisu Cake', 15, 43.99);

# insert dummy data into OrderReviews table
INSERT INTO `OrderReviews` (`overall_rating`, `product_quality_rating`, `service_rating`, `comment`) VALUES
(4, 5, 5, 'My standards for cake are now way too high. Thanks Cakeys.'),
(5, 5, 5, 'The best experience of my life, hands down.'),
(5, 5, 5, 'The cake tasted delicious!');

# insert dummy data into Orders table
INSERT INTO `Orders` (`order_total_USD`, `order_date_time`, `credit_card_number`, `credit_card_expiration`, `order_fill_date`, `order_pickup_date`, `customer_ID`, `review_ID`) VALUES
(88.21, '2021-10-23 14:30:27','1234567812345678','2024-11','2021-10-24','2021-10-26', 1, 1),
(90.08, '2021-10-21 22:00:11','4321876543218765','2023-05','2021-10-11', NULL, 2, 2),
(32.99, '2021-11-10 12:30:14','1111222233334444','2022-07', NULL, NULL, 3, NULL);

# insert dummy data into OrderedCakes table
INSERT INTO `OrderedCakes` (`order_ID`, `cake_ID`, `cake_sale_price_USD`, `cake_qty`, `order_status`) VALUES
(1, 1, 45.99, 2, 'Completed'),
(2, 2, 45.04, 1, 'Awaiting Pickup'),
(3, 3, 32.99, 2, 'Placed');
