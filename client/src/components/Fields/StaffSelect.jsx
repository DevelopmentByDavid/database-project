/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select from '../FieldSelect';
import { formatQuery } from '../../lib/format';

export default function StaffSelect({ hotelID, ...props }) {
    return (
        <Select
            id='staffID'
            fullWidth
            label='Staff SSN'
            disabled={hotelID === ''}
            subscriber={(setData, setLoading) => {
                fetch(
                    formatQuery('/fields/staff', {
                        hotelID,
                        staffRole: 'HouseCleaning'
                    })
                )
                    .then(res => {
                        res.json().then(({ data }) => {
                            setData(
                                data.map(({ ssn }) => ({
                                    value: ssn,
                                    label: ssn
                                }))
                            );
                            setLoading(false);
                        });
                    })
                    .catch(err => console.log(err));
            }}
            {...props}
        />
    );
}
