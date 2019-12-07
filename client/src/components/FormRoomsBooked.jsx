import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from './Dialog';
import HotelSelect from './Fields/HotelSelect';
import DatePicker from './FieldDatePicker';
import { formatQuery } from '../lib/format';

// const fields = ['hotelID', 'bookingDate'];
// const labels = ['Hotel ID', 'Booking Date'];

export default function FormRoomsBooked() {
    const [state, setState] = React.useState({
        hotelID: '',
        bookingDate: ''
    });
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        // const { hotelID, bookingDate } = event.target;
        // const values = {
        //     hotelID: hotelID.value,
        //     bookingDate: bookingDate.value
        // };
        const url = formatQuery('/read/8', state);
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
                <Typography variant='h4'>Number of Rooms Booked</Typography>
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
