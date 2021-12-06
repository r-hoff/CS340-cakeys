##################
# SELECT QUERIES #
##################

# select statements for all entities
SELECT * FROM CustomerDiscount;
SELECT * FROM Customers;
SELECT * FROM OrderReviews;
SELECT * FROM Orders;
SELECT * FROM Cakes;
SELECT * FROM OrderedCakes;

# select statement for search function (search Customers by last name)
SELECT * FROM Customers
WHERE customer_first_name LIKE '%:customer_first_name_input%' OR
customer_last_name = '%:customer_last_name_input%';


##################
# INSERT QUERIES #
##################

# insert new record into CustomerDiscount
INSERT INTO `CustomerDiscount`(`discount_name`, `discount_rate`) VALUES
(:discount_name_input, discount_rate_input);

# insert new record into Customers
INSERT INTO `Customers` (`customer_first_name`,`customer_last_name`,`customer_DOB`,`customer_street_address`,`customer_city`,`customer_state`, `customer_zip`, `customer_phone`, `customer_email`, `discount_ID`) VALUES
(:customer_first_name_input, :customer_last_name_input, :customer_DOB_input, :customer_street_address_input, :customer_city_input, :customer_state_input, :customer_zip_input, :customer_phone_input, :customer_email_input, :discount_ID_input);

# insert new record into Cakes
INSERT INTO `Cakes` (`cake_name`, `cake_size`, `cake_retail_price_USD`) VALUES
(:cake_name_input, :cake_size_input, :cake_retail_price_USD_input);

# insert new record into OrderReviews
INSERT INTO `OrderReviews` (`overall_rating`, `product_quality_rating`, `service_rating`, `comment`) VALUES
(:overall_rating_input, :product_quality_rating_input, :service_rating_input, :comment_input);

# insert new record into Orders
INSERT INTO `Orders` (`order_total_USD`, `order_date_time`, `credit_card_number`, `credit_card_expiration`, `order_fill_date`, `order_pickup_date`, `customer_ID`, `review_ID`) VALUES
(:order_total_USD_input, :order_date_time_input, :credit_card_number_input, :credit_card_expiration_input, :order_fill_date_input, :order_pickup_date_input, :customer_ID_input, :review_ID_input);

# insert new record into OrderedCakes
INSERT INTO `OrderedCakes` (`order_ID`, `cake_ID`, `cake_sale_price_USD`, `cake_qty`, `order_status`) VALUES
(:order_ID_input, :cake_ID_input, :cake_sale_price_USD_input, :cake_qty_input, :order_status_input);


##################
# UPDATE QUERIES #
##################

# update CustomerDiscount by discount_ID
UPDATE CustomerDiscount
SET
`discount_name` = :discount_name_input,
`discount_rate` = :discount_rate_input
WHERE discount_ID = :discount_ID_input;

# update Customers by customer_id
UPDATE Customers
SET
`customer_first_name` = :customer_first_name_input,
`customer_last_name` = :customer_last_name_input,
`customer_DOB` = :customer_DOB_input,
`customer_street_address` = :customer_street_address_input,
`customer_city` = :customer_city_input,
`customer_state` = :customer_state_input,
`customer_zip` = :customer_zip_input,
`customer_phone` = :customer_phone_input,
`customer_email` = :customer_email_input,
`discount_ID` = :discount_ID_input
WHERE customer_id = :customer_id_input;

# update Orders by order_ID
UPDATE Orders
SET
`order_total_USD` = :order_total_USD_input,
`order_date_time` = :order_date_time_input,
`credit_card_number` = :credit_card_number_input,
`credit_card_expiration` = :credit_card_expiration_input,
`order_fill_date` = :order_fill_date_input,
`order_pickup_date` = :order_pickup_date_input,
`customer_ID` = :customer_ID_input,
`review_ID` = :review_ID_input
WHERE order_ID = :order_ID_input;

# update OrderReviews by review_ID
UPDATE OrderReviews 
SET 
`overall_rating` = :overall_rating_input,
`product_quality_rating` = :product_quality_rating_input,
`service_rating` = :service_rating_input,
`comment` = :comment_input
WHERE review_ID = :review_ID_input;

# update OrderedCakes by order_ID & cake_ID
UPDATE OrderedCakes
SET
`order_ID` = :order_ID_input,
`cake_ID` = :cake_ID_input,
`cake_sale_price_USD` = :cake_sale_price_USD_input,
`cake_qty` = :cake_qty_input,
`order_status` = :order_status_input
WHERE order_ID = :order_ID_input and cake_ID = :cake_ID_input;

# update Cakes by cake_ID
UPDATE Cakes 
SET 
`cake_name` = :cake_name_input,
`cake_size` = :cake_size_input, 
`cake_retail_price_USD` = :cake_retail_price_USD_input
WHERE cake_ID = :cake_ID_input;


##################
# DELETE QUERIES #
##################

# delete from CustomerDiscount by discount_ID
DELETE FROM CustomerDiscount
WHERE discount_ID = :discount_ID_input;

# delete from Customers by customer_ID
DELETE FROM Customers
WHERE customer_ID = :customer_ID_input;

# delete from Cakes by cake_ID
DELETE FROM Cakes
WHERE cake_ID = :cake_ID_input;

# delete from Orders by order_ID
DELETE FROM Orders
WHERE order_ID = :order_ID_input;

# delete from OrderReviews by review_ID
DELETE FROM OrderReviews
WHERE review_ID = :review_ID_input;

# delete from OrderedCakes by order_ID & cake_ID
DELETE FROM OrderedCakes
WHERE order_ID = :order_ID_input AND cake_ID = :cake_ID_input;
