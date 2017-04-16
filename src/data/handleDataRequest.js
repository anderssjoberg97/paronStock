import getDatabaseConnection from "./connection";

import handleProductRequest from "./products/products";

/**
 * Redirects API-requests to eachs respective function
 */
export default function handleDataRequest(req, res, next){
    let connection = getDatabaseConnection();
    let response;
    if(req.url == "/data/products/" || req.url == "/data/products"){
        response = handleProductRequest(req, connection);
    }
    res.json(response);
    connection.end();
    next();
}
