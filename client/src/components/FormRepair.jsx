/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import HotelSelect from './Fields/HotelSelect';
import RoomSelect from './Fields/RoomSelect';
import CompanySelect from './Fields/CompanySelect';
import DatePicker from './FieldDatePicker';
import useSnack from '../hooks/useSnack';
import Select from './FieldSelect';

const fields = [
    'rID',
    'hotelID',
    'roomNo',
    'mCompany',
    'repairDate',
    'description',
    'repairType'
];
// const labels = [
//     'Room ID',
//     'Hotel ID',
//     'Room #',
//     'Maintenance Company ID',
//     'Date of Repair',
//     'Description',
//     'Type of Repair'
// ];
const repairTypes = ['Small', 'Medium', 'Large'];
const defaultState = fields.reduce(
    (accum, field) => ({
        ...accum,
        [field]: ''
    }),
    {}
);

export default function FormRepair() {
    const [state, setState] = React.useState(defaultState);
    const snack = useSnack();
    const handleSubmit = event => {
        event.preventDefault();
        fetch('/create/3', {
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
                            `Successfully added repair to room ${state.roomNo}`,
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
    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Add a Repair</Typography>
            <form id='new-customer' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label='Repair ID'
                            value={state.rID}
                            onChange={e =>
                                setState({ ...state, rID: e.target.value })
                            }
                            fullWidth
                            type='number'
                        />
                        <HotelSelect
                            value={state.hotelID}
                            onChange={e =>
                                setState({ ...state, hotelID: e.target.value })
                            }
                        />
                        <RoomSelect
                            hotelID={state.hotelID}
                            value={state.roomNo}
                            onChange={e =>
                                setState({ ...state, roomNo: e.target.value })
                            }
                        />
                        <CompanySelect
                            value={state.mCompany}
                            onChange={e =>
                                setState({ ...state, mCompany: e.target.value })
                            }
                        />
                        <DatePicker
                            id='date-of-repair'
                            label='Date of Repair'
                            value={state.repairDate}
                            onChange={e =>
                                setState({
                                    ...state,
                                    repairDate: e.target.value
                                })
                            }
                            fullWidth
                        />
                        <TextField
                            label='Description'
                            value={state.description}
                            onChange={e =>
                                setState({
                                    ...state,
                                    description: e.target.value
                                })
                            }
                            fullWidth
                        />
                        <Select
                            disabled={false}
                            id='repairType'
                            label='Repair Type'
                            fullWidth
                            value={state.repairType}
                            onChange={e =>
                                setState({
                                    ...state,
                                    repairType: e.target.value
                                })
                            }
                            subscriber={(setData, setLoading) => {
                                setLoading(false);
                                setData(
                                    repairTypes.map(value => ({
                                        value,
                                        label: value
                                    }))
                                );
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
