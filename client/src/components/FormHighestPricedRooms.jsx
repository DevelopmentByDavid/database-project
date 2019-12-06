import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const fields = ['hotelID', 'searchStartDate', 'searchEndDate', 'outputLimit'];
const labels = ['Hotel ID', 'Start Date', 'End Date', '# of Results'];

export default function FormHighestPricedRooms() {
    const handleSubmit = event => {
        event.preventDefault();
        const { hotelID, searchStartDate, searchEndDate, outputLimit } = event.target;
        const values = {
            hotelID: hotelID.value,
            searchStartDate: searchStartDate.value,
            searchEndDate: searchEndDate.value,
            outputLimit: outputLimit.value
        };
        console.log(values);
        console.log('TODO');
    };
    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Number of Bookings</Typography>
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
