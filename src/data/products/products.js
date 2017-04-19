/**
 * Handles product data requests
 */
export default function handleProductRequest(req, res, next, connection){
    switch (req.body.action){
        case("get"): {
            getProducts(req, res, next, connection);
            break;
        }
        case "add": {
            addProduct(req, res, next, connection);
            break;
        } default: {
            break;
        }
    }
}

/**
 * Gets product records from the database
 */
function getProducts(req, res, next, connection){
    let queryStr = "select * from products";
    if(req.body.search){
        queryStr += " where productName like concat('%'," +
            connection.escape(req.body.search) +
            ",'%')";
    }
    if(req.body.limit){
        queryStr += " limit " + connection.escape(req.body.limit);
    }
    connection.query(queryStr, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json(results);
        next();
    });
}

/**
 * Adds a product to the database
 */
function addProduct(req, res, next, connection){
    let queryStr = "insert into products (productName, productPrice) values(" + connection.escape(req.body.productName) + ", " + connection.escape(req.body.productPrice) +")";
    connection.query(queryStr, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json(true);
        next();
    });
}
