import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from './Dialog';
import CustomerSelect from './Fields/CustomerSelect';
import { formatQuery } from '../lib/format';

// const fields = ['customerID', 'outputLimit'];
// const labels = ['Customer ID', 'Top K'];

export default function FormRepairsPerYear() {
    const [state, setState] = React.useState({
        customerID: '',
        outputLimit: ''
    });
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        // const {
        //     customerID,
        //     outputLimit,
        // } = event.target;
        // const values = {
        //     customerID: customerID.value,
        //     outputLimit: outputLimit.value
        // };
        const url = formatQuery('/read/11', state);
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
                <Typography variant='h4'>Top Booking Prices</Typography>
                <form id='new-customer' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomerSelect
                                value={state.customer}
                                onChange={e => handleChange('customerID', e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Top K'
                                value={state.price}
                                onChange={e => handleChange('outputLimit', e)}
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
