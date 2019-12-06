import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Output Limit</Typography>
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