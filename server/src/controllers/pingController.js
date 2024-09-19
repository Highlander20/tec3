const connection = require('../models/db.js');

module.exports.ping = (req, res) => {
    
    const consult = 'SELECT * FROM login';

    try {
        connection.query(consult, (err, results) => {
            console.log(results)
        });
    } catch (e) {
        
    }
}