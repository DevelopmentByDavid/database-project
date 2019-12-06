/* eslint-disable no-multi-str */
import express from 'express';
import db from '../db';

const router = express.Router();

/* GET home page. */
router.get('/read/:searchId', (req, res) => {
    const { searchId } = req.params;
    switch (parseInt(searchId, 10)) {
        case 7: {
            // Get number of rooms available
            const { hotelID, bookingDate } = req.query;
            db.query(
                `
                    SELECT COUNT(*) AS "available"
                    FROM (
                        SELECT R.roomNo
                        FROM Hotel H, Room R
                        WHERE H.hotelID = ${hotelID}
                                  AND H.hotelID = R.hotelID
                        EXCEPT
                        SELECT R_in.roomNo
                        FROM Hotel H_in, Room R_in, Booking B_in
                        WHERE H_in.hotelID = ${hotelID}
                                  AND H_in.hotelID = B_in.hotelID
                                  AND H_in.hotelID = R_in.hotelID
                                  AND B_in.roomNo = R_in.roomNo
                                  AND B_in.bookingDate = ${bookingDate}::DATE
                     ) AS available`
            )
                .then(queryRes => {
                    
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        case 8: {
            // Get number of booked rooms
            const { hotelID, bookingDate } = req.body;
            db.query(
                `
                    SELECT COUNT(*) AS "booked"
                    FROM (
                        SELECT R_in.roomNo
                        FROM Hotel H_in, Room R_in, Booking B_in
                        WHERE H_in.hotelID = ${hotelID}
                                AND H_in.hotelID = B_in.hotelID
                                AND H_in.hotelID = R_in.hotelID
                                AND B_in.roomNo = R_in.roomNo
                                AND B_in.bookingDate = ${bookingDate}::DATE
                    ) AS booked`
            )
                .then(queryRes => {
                    
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        case 9: {
            // Get hotel bookings for a week
            const { hotelID, roomNo, bookingDate } = req.query;
            db.query(
                `
                    SELECT B.bID
                    FROM Hotel H, Room R, Booking B
                    WHERE H.hotelID = ${hotelID}
                            AND H.hotelID = R.hotelID
                            AND R.roomNo = B.roomNo
                            AND B.hotelID = H.hotelID
                            AND R.roomNo = ${roomNo}
                            AND B.bookingDate >= ${bookingDate}::DATE 
                            AND B.bookingDate <= ${bookingDate}::DATE + '7 day'::INTERVAL`
            )
                .then(queryRes => {
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        case 10: {
            // Get top k rooms with highest price for a date range
            const {
                hotelID,
                searchStartDate,
                searchEndDate,
                outputLimit
            } = req.query;
            db.query(
                `
                    SELECT R.roomNo, B.price
                    FROM Hotel H, Room R, Booking B
                    WHERE H.hotelID = ${hotelID} 
                            AND H.hotelID = B.hotelID
                            AND R.hotelID = H.hotelID
                            AND B.roomNo = R.roomNo
                            AND B.bookingDate >= ${searchStartDate}::DATE
                            AND B.bookingDate <= ${searchEndDate}::DATE
                    ORDER BY B.price DESC
                    LIMIT ${outputLimit}`
            )
                .then(queryRes => {
                    
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        case 11: {
            // Get top k highest booking price for a customer
            const { customerID, outputLimit } = req.query;
            db.query(
                `
                    SELECT R.roomNo, B.price
                    FROM Room R, Booking B, Customer C
                    WHERE C.customerID = ${customerID}
                            AND B.customer = C.customerID
                            AND B.hotelID = R.hotelID
                            AND B.roomNo = R.roomNo
                    ORDER BY B.price DESC
                    LIMIT ${outputLimit}`
            )
                .then(queryRes => {
                    
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        case 12: {
            // Get customer total cost occurred for a give date range
            const { customerID, searchStartDate, searchEndDate } = req.query;
            db.query(
                `
                    SELECT SUM(B.price) as "totalCost"
                    FROM Booking B, Customer C
                    WHERE C.customerID = ${customerID}
                            AND B.customer = C.customerID
                            AND B.bookingDate >= ${searchStartDate}::DATE
                            AND B.bookingDate <= ${searchEndDate}::DATE`

            )
                .then(queryRes => {
                    
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        case 13: {
            // List the repairs made by maintenance company
            const { cmpID } = req.query;
            db.query(
                `
                    SELECT R.rID
                    FROM Repair R, MaintenanceCompany M
                    WHERE M.cmpID = ${cmpID}
                            AND M.cmpID = R.mCompany`
            )
                .then(queryRes => {
                    
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        case 14: {
            // Get top k maintenance companies based on repair count
            const { outputLimit } = req.query;
            db.query(
                `
                    SELECT M.cmpID, M.name, COUNT(*) as "numRepairs"
                    FROM Repair R, MaintenanceCompany M
                    WHERE M.cmpID = R.mCompany
                    GROUP BY M.cmpID
                    ORDER BY "Number of Repairs" DESC
                    LIMIT ${outputLimit}`
            )
                .then(queryRes => {
                    
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        case 15: {
            // Get number of repairs occurred per year for a given hotel room
            console.log('todo');
            const { hotelID, roomNo } = req.query;
            db.query(
                `
                    SELECT EXTRACT(YEAR FROM R.repairDate) AS "year", COUNT(*) AS "totalRepairs"
                    FROM Repair R
                    WHERE R.hotelID = ${hotelID}
                            AND R.roomNo = ${roomNo}
                    GROUP BY "Year"`
            )
                .then(queryRes => {
                    
                    res.json({ data: queryRes.rows });
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
            break;
        }
        default: {
            res.json({ msg: 'Invalid Query' });
        }
    }
});

// We need to make sure we do validation. E.g. does the room we're trying to book exist?
router.post('/create/:insertId', (req, res) => {
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
