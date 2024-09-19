const connection = require('../models/db.js');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const {username, password} = req.body;

    //console.log(username);
    //console.log(password);

    const consult = 'SELECT * FROM login WHERE username = ? AND password = ?';

    try {
        connection.query(consult, [username, password], (err, result) => {
            if(err){
                res.send(err);
            }

            if(result.length > 0){
                const token = jwt.sign({username}, "Stack", {
                    expiresIn: '30m'
                });
                res.send({token});

                //console.log(result);
                //res.send(result);

            } else {
                console.log('No existe usuario')
                res.send({MessageEvent: 'No existe usuario'})
            }
        })
    } catch (e) {
        
    }

}