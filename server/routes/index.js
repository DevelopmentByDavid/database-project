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
            // Get number of rooms available
            console.log('todo');
            db.query(`SELECT COUNT(*)
                        FROM (
                            SELECT R.roomNo
                            FROM Hotel H, Room R
 55     WHERE H.hotelID = 1 /* given hotel ID */
 56             AND H.hotelID = R.hotelID
 57     EXCEPT
 58     SELECT R_in.roomNo
 59     FROM Hotel H_in, Room R_in, Booking B_in
 60     WHERE H_in.hotelID = 1 /* given hotel ID */
 61             AND H_in.hotelID = B_in.hotelID
 62             AND H_in.hotelID = R_in.hotelID
 63             AND B_in.roomNo = R_in.roomNo
 64             AND B_in.bookingDate = '2017-11-22'::DATE /* given date */
 65 ) AS available;`);
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
