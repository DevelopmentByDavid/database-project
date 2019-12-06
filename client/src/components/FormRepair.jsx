import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const fields = [
    'rID',
    'hotelID',
    'roomNo',
    'mCompany',
    'repairDate',
    'description',
    'repairType'
];
const labels = [
    'Room ID',
    'Hotel ID',
    'Room #',
    'Maintenance Company ID',
    'Date of Repair',
    'Description',
    'Type of Repair'
];

export default function FormRepair() {
    const handleSubmit = event => {
        event.preventDefault();
        const {
            rID,
            hotelID,
            roomNo,
            mCompany,
            repairDate,
            description,
            repairType
        } = event.target;
        const values = {
            rID: rID.value,
            hotelID: hotelID.value,
            roomNo: roomNo.value,
            mCompany: mCompany.value,
            repairDate: repairDate.value,
            description: description.value,
            repairType: repairType.value
        };
        console.log(values);
        console.log('TODO');
    };
    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Add a Customer</Typography>
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
