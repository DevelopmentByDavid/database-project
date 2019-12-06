import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useGet from '../hooks/useGet';

const fields = [
    'outputLimit',
];
const labels = [
    'Output Limit',
];

export default function FormBooking() {
    const handleSubmit = event => {
        event.preventDefault();
        const {
            outputLimit,
        } = event.target;
        const values = {
            outputLimit: outputLimit.value
        };
        console.log(values);
        console.log('TODO');
    };
    const [loading, data] = useGet(`/read/12?outputLimit=${outputLimit}`);
    return (
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
    );
}
