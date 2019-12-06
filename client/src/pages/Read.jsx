import React from 'react';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import FormRoomsAvailable from '../components/FormRoomsAvailable';
import FormRoomsBooked from '../components/FormRoomsBooked';
import FormBookingsForWeek from '../components/FormBookingsForWeek';
import FormHighestPricedRooms from '../components/FormHighestPricedRooms';

const config = {
    '7': <FormRoomsAvailable />,
    '8': <FormRoomsBooked />,
    '9': <FormBookingsForWeek />,
    '10': <FormHighestPricedRooms />
};

export default function Create() {
    const { id } = useParams();
    return (
        <Container maxWidth='md' style={{ paddingTop: '16px' }}>
            {config[id]}
        </Container>
    );
}
