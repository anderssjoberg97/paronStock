import getDatabaseConnection from "./connection";

import handleProductRequest from "./products/products";
import handleWarehouseRequest from "./warehouses/warehouses";
import handleStockRequest from "./stock/stock";
import handleDeliveriesRequest from "./deliveries/deliveries";

/**
 * Redirects API-requests to eachs respective function
 */
export default function handleDataRequest(req, res, next){
    let connection = getDatabaseConnection();
    if(req.url == "/data/products/" || req.url == "/data/products"){
        handleProductRequest(req, res, next, connection);
    } else if(req.url == "/data/warehouses/" || req.url == "/data/warehouses"){
        handleWarehouseRequest(req, res, next, connection);
    } else if(req.url == "/data/stock/" || req.url == "/data/stock"){
        handleStockRequest(req, res, next, connection);
    } else if(req.url == "/data/deliveries/" || req.url == "/data/deliveries"){
        handleDeliveriesRequest(req, res, next, connection);
    }
    connection.end();
}
