/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HotelSelect from './Fields/HotelSelect';
import DatePicker from './FieldDatePicker';
import RoomSelect from './Fields/RoomSelect';
import Dialog from './Dialog';
import { formatQuery } from '../lib/format';

// const fields = ['hotelID', 'roomNo', 'bookingDate'];
// const labels = ['Hotel ID', 'Room #', 'Booking Date'];

export default function FormBookingsForWeek() {
    const [state, setState] = React.useState({
        hotelID: '',
        roomNo: '',
        bookingDate: ''
    });
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        // const { hotelID, roomNo, bookingDate } = event.target;
        // const values = {
        //     hotelID: hotelID.value,
        //     roomNo: roomNo.value,
        //     bookingDate: bookingDate.value
        // };
        const url = formatQuery('/read/9', state);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then(({ data: resData }) => {
                    // console.log(obj);
                    console.log(resData);
                    setData(resData);
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <>
            <Paper style={{ padding: '16px' }}>
                <Typography variant='h4'>Number of Bookings</Typography>
                <form id='new-customer' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <HotelSelect
                                value={state.hotelID}
                                onChange={e =>
                                    setState({
                                        ...state,
                                        hotelID: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RoomSelect
                                hotelID={state.hotelID}
                                value={state.roomNo}
                                onChange={e =>
                                    setState({
                                        ...state,
                                        roomNo: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker
                                id='date-of-booking'
                                label='Booking Date'
                                value={state.bookingDate}
                                onChange={e =>
                                    setState({
                                        ...state,
                                        bookingDate: e.target.value
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid container item xs={12} justify='flex-end'>
                            <Button
                                variant='contained'
                                onSubmit={handleSubmit}
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Dialog
                data={data || []}
                open={Boolean(data)}
                handleClose={() => setData(null)}
            />
        </>
    );
}
