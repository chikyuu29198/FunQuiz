module.exports = function(app) {
    var data = require('./controller.js');
    app.get("/", data.getAll);
}