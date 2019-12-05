import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default function Results({ data, onClick }) {
    return data.length === 0 ? (
        <Typography variant='h4'>
            No Results to Display!
        </Typography>
    ):(
        <List>
            {data.map(({ _id, primary, secondary }) => (
                <ListItem button divider key={_id} onClick={() => onClick(_id)}>
                    <ListItemText primary={primary} secondary={secondary} />
                </ListItem>
            ))}
        </List>
    );
}

Results.propTypes = {
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
};
