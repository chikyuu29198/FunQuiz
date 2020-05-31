module.exports = function(app) {
    var data = require('./controller.js');
    app.get("/", data.getAll);
    app.use((req, res, next) => {
        res.status('404');
        res.send('404');
    });
}