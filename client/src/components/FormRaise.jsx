import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ManagerSelect from './Fields/ManagerSelect';
import RepairSelect from './Fields/RepairSelect';
import DatePicker from './FieldDatePicker';
import useSnack from '../hooks/useSnack';

const fields = ['managerID', 'repairID', 'requestDate', 'description'];
// const labels = ['Manager ID', 'Repair ID', 'Request Date', 'Description'];

const defaultState = fields.reduce(
    (accum, field) => ({
        ...accum,
        [field]: ''
    }),
    {}
);

export default function FormRaise() {
    const [state, setState] = React.useState(defaultState);
    const snack = useSnack();
    const handleSubmit = event => {
        event.preventDefault();
        fetch('/create/6', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then(({ data, detail }) => {
                    setState(defaultState);
                    if (data === 1) {
                        snack(
                            `Successfully requested repair on ${state.requestDate}`,
                            'success'
                        );
                    } else {
                        // console.log(rest);
                        snack(`Error: ${detail}`, 'error');
                    }
                });
            })
            .catch(err => {
                snack('Error, please try again', 'error');
                console.log(err);
            });
    };
    const handleChange = (key, e) => {
        setState({ ...state, [key]: e.target.value });
    };
    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Raise a Repair Request</Typography>
            <form id='new-customer' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ManagerSelect
                            value={state.managerID}
                            onChange={e => handleChange('managerID', e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RepairSelect
                            value={state.repairID}
                            onChange={e => handleChange('repairID', e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            id='date-of-request'
                            label='Request Date'
                            value={state.bookingDate}
                            onChange={e => handleChange('requestDate', e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Description'
                            value={state.description}
                            onChange={e => handleChange('description', e)}
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
    );
}
