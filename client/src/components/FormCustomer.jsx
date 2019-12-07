/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from './FieldSelect';
import DatePicker from './FieldDatePicker';
import useSnack from '../hooks/useSnack';
// import { formatQuery } from '../lib/format';

// const fields = ['fName', 'lName', 'Address', 'phNo', 'DOB', 'gender'];
// const labels = [
//     'First Name',
//     'Last Name',
//     'Address',
//     'Phone Number',
//     'Date of Birth',
//     'Gender'
// ];

export default function FormCustomer() {
    const [state, setState] = React.useState({
        fName: '',
        lName: '',
        Address: '',
        phNo: '',
        DOB: '',
        gender: ''
    });
    const snack = useSnack();
    // const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        // const { fName, lName, Address, phNo, DOB, gender } = event.target;
        // const values = {
        //     fName: fName.value,
        //     lName: lName.value,
        //     Address: Address.value,
        //     phNo: phNo.value,
        //     DOB: DOB.value,
        //     gender: gender.value
        // };
        fetch('/create/0', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then(({ data, detail }) => {
                    if (data === 1) {
                        snack(
                            `Successfully added new customer ${state.fName}`,
                            'success'
                        );
                    } else {
                        // console.log(rest);
                        snack(`Error: ${detail}`, 'error');
                    }
                    // setData(resData);
                    // console.log(resData);
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
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Add a Customer</Typography>
            <form id='new-customer' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label='First Name'
                            value={state.fName}
                            onChange={e => handleChange('fName', e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Last Name'
                            value={state.lName}
                            onChange={e => handleChange('lName', e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Address'
                            value={state.Address}
                            onChange={e => handleChange('Address', e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Phone Number'
                            value={state.phNo}
                            onChange={e => handleChange('phNo', e)}
                            fullWidth
                            type='tel'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            id='DOB'
                            label='DOB'
                            value={state.DOB}
                            onChange={e =>
                                setState({
                                    ...state,
                                    DOB: e.target.value
                                })
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id='gender'
                            label='Gender'
                            disabled={false}
                            value={state.gender}
                            onChange={e =>
                                setState({ ...state, gender: e.target.value })
                            }
                            subscriber={(foo, setLoading) => {
                                const choices = ['Male', 'Female', 'Other'];
                                foo(
                                    choices.map(choice => ({
                                        label: choice,
                                        value: choice
                                    }))
                                );
                                setLoading(false);
                            }}
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
    );
}
