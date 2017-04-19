/**
 * Handles warehouse data requests
 */
export default function handleWarehouseRequest(req, res, next, connection){
    switch (req.body.action){
        case("get"): {
            getWarehouseData(req, res, next, connection);
            break;
        } default: {
            res.json({});
            break;
        }
    }
}

/**
 * Gets warehouse info from the database
 */
export function getWarehouseData(req, res, next, connection){
    let queryStr = "select * from warehouses";
    connection.query(queryStr, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json(results);
        next();
    })
}
