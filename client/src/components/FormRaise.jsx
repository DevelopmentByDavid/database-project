import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const fields = ['managerID', 'repairID', 'requestDate', 'description'];
const labels = ['Manager ID', 'Repair ID', 'Request Date', 'Description'];

export default function FormRaise() {
    const handleSubmit = event => {
        event.preventDefault();
        const { managerID, repairID, requestDate, description } = event.target;
        const values = {
            managerID: managerID.value,
            repairID: repairID.value,
            requestDate: requestDate.value,
            description: description.value
        };
        console.log(values);
        console.log('TODO');
    };
    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Raise a Repair Request</Typography>
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
