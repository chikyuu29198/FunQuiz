module.exports = function(app) {
    var data = require('./controller.js');
    app.get("/api", data.getAll);
}