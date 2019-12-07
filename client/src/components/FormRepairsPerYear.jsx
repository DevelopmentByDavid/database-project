import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from './Dialog';
import HotelSelect from './Fields/HotelSelect';
import RoomSelect from './Fields/RoomSelect';
import { formatQuery } from '../lib/format';

// const fields = [
//     'hotelID',
//     'roomNo',
// ];
// const labels = [
//     'Hotel ID',
//     'Room #',
// ];

export default function FormRepairsPerYear() {
    const [state, setState] = React.useState({
        hotelID: '',
        roomNo: ''
    });
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        // const { hotelID, roomNo } = event.target;
        // const values = {
        //     hotelID: hotelID.value,
        //     roomNo: roomNo.value
        // };
        const url = formatQuery('/read/15', state);
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
    const handleChange = (key, e) => {
        setState({ ...state, [key]: e.target.value });
    };
    return (
        <>
            <Paper style={{ padding: '16px' }}>
                <Typography variant='h4'>Repairs Per Year</Typography>
                <form id='new-customer' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
