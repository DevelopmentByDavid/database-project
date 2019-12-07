import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from './Dialog';
import {formatQuery} from '../lib/format';

const fields = [
    'outputLimit',
];
const labels = [
    'Output Limit',
];

export default function FormBooking() {
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        const {
            outputLimit,
        } = event.target;
        const values = {
            outputLimit: outputLimit.value
        };
        const url = formatQuery('/read/14', values);
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
                <Typography variant='h4'>Top Repairs Made By Maintenance Companies</Typography>
                <form id='new-customer' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {fields.map((fieldName, idx) => (
                            <Grid item xs={12} key={fieldName}>
                                <TextField
                                    // key={fieldName}
                                    id={fieldName}
                                    label={labels[idx]}
                                    fullWidth
                                    type='number'
                                />
                            </Grid>
                        ))}
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
            <Dialog data={data || []} open={Boolean(data)} handleClose={() => setData(null)} />
        </>
    );
}
