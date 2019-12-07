import express from 'express';
import db from '../db';

const router = express.Router();

/* GET home page. */
router.get('/fields/:table', (req, res) => {
    const { table } = req.params;

    switch (table) {
        case 'hotel': {
            db.query(`
                    SELECT H.hotelID
                    FROM Hotel H`
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

        case 'room': {
            const { hotelID } = req.query;
            db.query(`
                    SELECT R.roomNo
                    FROM Hotel H, Room R
                    WHERE H.hotelID = ${hotelID}
                            AND H.hotelID = R.hotelID`
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

        case 'booking': {
            const { hotelID, roomNo } = req.query;
            db.query(`
                    SELECT B.bID
                    FROM Hotel H, Room R, Booking B
                    WHERE H.hotelID = ${hotelID}
                            AND R.roomNo = ${roomNo}
                            AND B.hotelID = H.hotelID
                            AND B.roomNo = R.roomNo`
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

        case 'staff': {
            const { hotelID, staffRole } = req.query;
            db.query(`
                    SELECT S.ssn
                    FROM Staff S, Hotel H
                    WHERE H.hotelID = ${hotelID}
                            AND H.hotelID = S.employerID
                            AND S.role = ${staffRole}`
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

        case 'company': {
            db.query(`
                    SELECT M.cmpID
                    FROM MaintenanceCompany M`
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

        case 'repair': {
            const { cmpID } = req.query;
            db.query(`
                    SELECT R.rID
                    FROM Repair R, MaintenanceCompany M
                    WHERE M.cmp = ${cmpID}
                            AND R.company = M.cmpID`
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
