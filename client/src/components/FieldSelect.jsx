/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
// import FormHelperText from '@material-ui/core/FormHelperText';

export default function Select({
    id,
    subscriber,
    label,
    disabled,
    ...passThroughProps
}) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        if (!disabled) {
            subscriber(setData, setLoading);
        }
    }, [disabled, subscriber]);

    return (
        <FormControl fullWidth disabled={disabled}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <NativeSelect
                inputProps={{
                    name: 'name',
                    id
                }}
                id={id}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...passThroughProps}
            >
                <option value='' />
                {!loading &&
                    !disabled &&
                    data.map(({ value, label: optionLabel }) => (
                        <option key={value} value={value}>
                            {optionLabel}
                        </option>
                    ))}
                {/* <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option> */}
            </NativeSelect>
            {/* <FormHelperText>Uncontrolled</FormHelperText> */}
        </FormControl>
    );
}

Select.propTypes = {
    subscriber: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
};
