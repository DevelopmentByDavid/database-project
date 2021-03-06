/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import HotelSelect from './Fields/HotelSelect';
import DatePicker from './FieldDatePicker';
import Dialog from './Dialog';

import { formatQuery } from '../lib/format';

// const fields = ['hotelID', 'searchStartDate', 'searchEndDate', 'outputLimit'];
// const labels = ['Hotel ID', 'Start Date', 'End Date', '# of Results'];

export default function FormHighestPricedRooms() {
    const [state, setState] = React.useState({
        hotelID: '',
        searchStartDate: '',
        searchEndDate: '',
        outputLimit: ''
    });
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        // const {
        //     hotelID,
        //     searchStartDate,
        //     searchEndDate,
        //     outputLimit
        // } = event.target;
        // const values = {
        //     hotelID: hotelID.value,
        //     searchStartDate: searchStartDate.value,
        //     searchEndDate: searchEndDate.value,
        //     outputLimit: outputLimit.value
        // };
        const url = formatQuery('/read/10', state);
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
                <Typography variant='h4'>Highest Priced Rooms</Typography>
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
                                id='searchStartDate'
                                label='Start Date'
                                value={state.searchStartDate}
                                onChange={e =>
                                    setState({
                                        ...state,
                                        searchStartDate: e.target.value
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker
                                id='searchEndDate'
                                label='End Date'
                                value={state.searchEndDate}
                                onChange={e =>
                                    setState({
                                        ...state,
                                        searchEndDate: e.target.value
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='# of Results'
                                value={state.outputLimit}
                                onChange={e =>
                                    setState({ ...state, outputLimit: e.target.value })
                                }
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
            <Dialog
                data={data || []}
                open={Boolean(data)}
                handleClose={() => setData(null)}
            />
        </>
    );
}
