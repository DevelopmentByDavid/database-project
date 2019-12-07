/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select from '../FieldSelect';

export default function HotelSelect(props) {
    return (
        <Select
            id='customerID'
            disabled={false}
            fullWidth
            label='Customer ID'
            subscriber={(setData, setLoading) => {
                fetch('/fields/customer')
                    .then(res => {
                        res.json().then(({ data }) => {
                            setData(
                                data.map(({ customerid }) => ({
                                    value: customerid,
                                    label: customerid
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
