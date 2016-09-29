var app = {};
function init(appVar) {
    app = appVar;
}

var mysqlDao = function() {};


mysqlDao.prototype.findById = function (customerId) {
    var foundCust = null;
    return foundCust;
};

mysqlDao.prototype.findByLastName = function (lastName) {
    var foundCusts = [];
    return foundCusts;
};

mysqlDao.prototype.findAll = function () {
    return customers;
};

mysqlDao.prototype.insert = function (cust) {
    return cust;
};

mysqlDao.prototype.update = function (customerToUpdate) {
    var cust = null;
    return cust;
};

mysqlDao.prototype.remove = function(customer) {
    var id = customer.customerId;
    return null;
};

module.exports = new mysqlDao();