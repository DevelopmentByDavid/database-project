/* eslint-disable no-multi-str */
import express from 'express';
import db from '../db';

const router = express.Router();

/* GET home page. */
router.get('/search/:searchId', (req, res) => {
    const { searchId } = req.params;
    const queryParams = req.query;
    switch (searchId) {
        case 7: {
            console.log('todo');
            break;
        }
        case 8: {
            console.log('todo');
            break;
        }
        case 9: {
            console.log('todo');
            break;
        }
        case 10: {
            console.log('todo');
            break;
        }
        case 11: {
            console.log('todo');
            break;
        }
        case 12: {
            console.log('todo');
            break;
        }
        case 13: {
            console.log('todo');
            break;
        }
        case 14: {
            console.log('todo');
            break;
        }
        case 15: {
            console.log('todo');
            break;
        }
        default: {
            res.json({ msg: 'Invalid Query' });
        }
    }
});

router.post('/insert/:insertId', (req, res) => {
    const { insertId } = req.params;
    const data = req.body;
    switch (insertId) {
        case 0: {
            const { fName, lName, Address, phNo, DOB, gender } = data;
            db.query(
                `INSERT INTO customer(fName, lName,\
                 Address, phNo, DOB, gender) VALUES\
                  (${fName}, ${lName}, ${Address}, ${phNo}, ${DOB}, ${gender})`
            )
                .then(queryRes => {
                    res.json(queryRes.rows);
                })
                .catch(err => {
                    console.log(err);
                    res.json(err);
                });
            break;
        }
        case 1: {
            console.log('todo');
            break;
        }
        case 2: {
            console.log('todo');
            break;
        }
        case 3: {
            console.log('todo');
            break;
        }
        case 4: {
            console.log('todo');
            break;
        }
        case 5: {
            console.log('todo');
            break;
        }
        case 6: {
            console.log('todo');
            break;
        }
        default: {
            res.json({ msg: 'Invalid insertion' });
        }
    }
});

module.exports = router;
