import React from 'react';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import FormRoomsAvailable from '../components/FormRoomsAvailable';
import FormRoomsBooked from '../components/FormRoomsBooked';
import FormBookingsForWeek from '../components/FormBookingsForWeek';
import FormHighestPricedRooms from '../components/FormHighestPricedRooms';
import FormTopBooking from '../components/FormTopBooking';
import FormCustomerCost from '../components/FormCustomerCost';
import FormRepairsByCompany from '../components/FormRepairsByCompany';
import FormTopMaintComp from '../components/FormTopMaintComp';
import FormRepairsPerYear from '../components/FormRepairsPerYear';

const config = {
    '7': <FormRoomsAvailable />,
    '8': <FormRoomsBooked />,
    '9': <FormBookingsForWeek />,
    '10': <FormHighestPricedRooms />,
    '11': <FormTopBooking />,
    '12': <FormCustomerCost />,
    '13': <FormRepairsByCompany />,
    '14': <FormTopMaintComp />,
    '15': <FormRepairsPerYear />
};

export default function Create() {
    const { id } = useParams();
    return (
        <Container maxWidth='md' style={{ paddingTop: '16px' }}>
            {config[id]}
        </Container>
    );
}
