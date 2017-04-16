/**
 * Handles warehouses data requests
 */
export default function handleProductRequest(req, connection){
    switch (req.body.action){
        case("get"): {
            getWarehouses(req, connection);
        } default: {
            break;
        }
    }
}

/**
 * Gets product records from the database
 */
export function getWarhouses(req, connection){
    let queryStr = "select * from warehouses";
    connection.query(queryStr, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json(results);
    })
}
