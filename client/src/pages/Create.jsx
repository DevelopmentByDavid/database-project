import React from 'react';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import FormAssign from '../components/FormAssign';
import FormBooking from '../components/FormBooking';
import FormCompany from '../components/FormCompany';
import FormCustomer from '../components/FormCustomer';
import FormRaise from '../components/FormRaise';
import FormRepair from '../components/FormRepair';
import FormRoom from '../components/FormRoom';

const config = {
    '0': <FormCustomer />,
    '1': <FormRoom />,
    '2': <FormCompany />,
    '3': <FormRepair />,
    '4': <FormBooking />,
    '5': <FormAssign />,
    '6': <FormRaise />
};

export default function Create() {
    const { id } = useParams();
    return (
        <Container maxWidth='md' style={{ paddingTop: '16px' }}>
            {config[id]}
        </Container>
    );
}
