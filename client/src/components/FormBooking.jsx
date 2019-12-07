/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DatePicker from './FieldDatePicker';
import RoomSelect from './Fields/RoomSelect';
import HotelSelect from './Fields/HotelSelect';
import CustomerSelect from './Fields/CustomerSelect';
import useSnack from '../hooks/useSnack';

const fields = [
    'customer',
    'hotelID',
    'roomNo',
    'bookingDate',
    'noOfPeople',
    'price'
];
// const labels = [
//     'Customer',
//     'Hotel ID',
//     'Room Number',
//     'Booking Date',
//     '# of People',
//     'Price'
// ];

const defaultState = fields.reduce(
    (accum, field) => ({
        ...accum,
        [field]: ''
    }),
    {}
);

export default function FormBooking() {
    const [state, setState] = React.useState(defaultState);
    const snack = useSnack();
    const handleSubmit = event => {
        event.preventDefault();
        fetch('/create/4', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then(({ data, detail }) => {
                    setState(defaultState);
                    if (data === 1) {
                        snack(
                            `Successfully added repair to room ${state.roomNo}`,
                            'success'
                        );
                    } else {
                        // console.log(rest);
                        snack(`Error: ${detail}`, 'error');
                    }
                });
            })
            .catch(err => {
                snack('Error, please try again', 'error');
                console.log(err);
            });
    };
    const handleChange = (key, e) => {
        setState({ ...state, [key]: e.target.value });
    };
    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Add a Booking</Typography>
            <form id='new-customer' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomerSelect
                            value={state.customer}
                            onChange={e => handleChange('customer', e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <HotelSelect
                            value={state.hotelID}
                            onChange={e => handleChange('hotelID', e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RoomSelect
                            hotelID={state.hotelID}
                            value={state.roomNo}
                            onChange={e => handleChange('roomNo', e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            id='date-of-booking'
                            label='Booking Date'
                            value={state.bookingDate}
                            onChange={e => handleChange('bookingDate', e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='# of People'
                            value={state.noOfPeople}
                            onChange={e => handleChange('noOfPeople', e)}
                            fullWidth
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Price'
                            value={state.price}
                            onChange={e => handleChange('price', e)}
                            fullWidth
                            type='number'
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
    );
}
