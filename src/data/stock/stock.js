/**
 * Handles stock requests
 */
export default function handleStockRequest(req, res, next, connection){
    switch (req.body.action){
        case("get"): {
            getStockData(req, res, next, connection);
            break;
        } default: {
            res.json({});
            break;
        }
    }
}

/**
 * Gets stock data
 */
export function getStockData(req, res, next, connection){
    let queryString;
    queryString ="select * from warehouses; \
        SET @sql = NULL; \
        SELECT \
          GROUP_CONCAT(DISTINCT  \
            CONCAT( \
              'IFNULL(SUM(IF(warehouseId = \"', \
              warehouseId, \
              '\", deliveryQuantity, 0)), 0) AS warehouse', \
              warehouseId, 'Stock' \
            ) \
          ) INTO @sql \
        FROM deliveries; \
        SET @sql = CONCAT('SELECT products.productId, products.productName, products.productPrice, IFNULL(SUM(deliveryQuantity), 0) as stock, ', @sql, ' FROM deliveries \
        right join products on products.productId=deliveries.productId \
        GROUP BY productId'); \
        PREPARE stmt FROM @sql; \
        EXECUTE stmt;";
        connection.query(queryString, (err, results, fields) => {
            if (err){
                throw err;
            }
            res.json({warehouses: results[0], data: results[5]});
            next();
        });

}
