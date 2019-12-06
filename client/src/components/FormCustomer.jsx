import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from './Dialog';
// import { formatQuery } from '../lib/format';

const fields = ['fName', 'lName', 'Address', 'phNo', 'DOB', 'gender'];
const labels = [
    'First Name',
    'Last Name',
    'Address',
    'Phone Number',
    'Date of Birth',
    'Gender'
];

export default function FormCustomer() {
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        const { fName, lName, Address, phNo, DOB, gender } = event.target;
        const values = {
            fName: fName.value,
            lName: lName.value,
            Address: Address.value,
            phNo: phNo.value,
            DOB: DOB.value,
            gender: gender.value
        };
        fetch('/create/0', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then(jsonRes => {
                    console.log(jsonRes);
                    // setData(resData);
                    // console.log(resData);
                });
            })
            .catch(err => {
                console.log(err);
            });
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
