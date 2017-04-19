/**
 * Handles deliveryrequests
 */
export default function handleProductRequest(req, res, next, connection){
    switch (req.body.action){
        case("get"): {
            getDeliveries(req, res, next, connection);
            break;
        }
        case("add"): {
            addDeliveries(req, res, next, connection);
            break;
        }
        default: {
            break;
        }
    }
}

/**
 * Gets deliveries
 */
export function getDeliveries(req, res, next, connection){
    let queryStr = "select * \
        from deliveries \
        inner join products on products.productId=deliveries.productId \
        inner join warehouses on warehouses.warehouseId=deliveries.warehouseId \
        order by deliveries.deliveryDate desc \
    ";
    connection.query(queryStr, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json(results);
        next();
    })
}

/**
 * Adds a delivery to the database
 */
export function addDeliveries(req, res, next, connection){
    let queryStr = "insert into deliveries \
        (deliveryDate, productid, warehouseId, deliveryQuantity) \
        values(" +
        connection.escape(req.body.date) + ", " +
        connection.escape(req.body.productId) + ", " +
        connection.escape(req.body.warehouseId) + ", " +
        connection.escape(req.body.amount)+ ")";
    console.log(queryStr);
    connection.query(queryStr, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json(results);
        next();
    })
}
