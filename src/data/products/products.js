/**
 * Handles product data requests
 */
export default function handleProductRequest(req, connection){
    switch (req.body.action){
        case("get"): {
            getProducts(req, connection);
        } default: {
            break;
        }
    }
}

/**
 * Gets product records from the database
 */
export function getProducts(req, connection){
    let queryStr = "select * from products";
    connection.query(queryStr, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json(results);
    })
}
