/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select from '../FieldSelect';

export default function HotelSelect(props) {
    return (
        <Select
            id='cmpID'
            disabled={false}
            fullWidth
            label='Company ID'
            subscriber={(setData, setLoading) => {
                fetch('/fields/company')
                    .then(res => {
                        res.json().then(({ data }) => {
                            setData(
                                data.map(({ cmpid }) => ({
                                    value: cmpid,
                                    label: cmpid
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
