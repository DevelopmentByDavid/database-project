/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from './Dialog';
import CustomerSelect from './Fields/CustomerSelect';
import DatePicker from './FieldDatePicker';
import { formatQuery } from '../lib/format';

// const fields = ['customerID', 'searchStartDate', 'searchEndDate'];
// const labels = ['Customer ID', 'Start Date', 'End Date'];

export default function FormCustomerCost() {
    const [state, setState] = React.useState({
        customerID: '',
        searchStartDate: '',
        searchEndDate: ''
    });
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        // const { customerID, searchStartDate, searchEndDate } = event.target;
        // const values = {
        //     customerID: customerID.value,
        //     searchStartDate: searchStartDate.value,
        //     searchEndDate: searchEndDate.value
        // };
        const url = formatQuery('/read/12', state);
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
                <Typography variant='h4'>
                    Total Cost Incurred For Customer
                </Typography>
                <form id='new-customer' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomerSelect
                                value={state.customer}
                                onChange={e => handleChange('customerID', e)}
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
