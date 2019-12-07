import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '100%'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    actionsContainer: {
        marginBottom: theme.spacing(2)
    },
    resetContainer: {
        padding: theme.spacing(3)
    },
    component: {
        marginTop: theme.spacing(3)
    }
}));

const CustomStepper = React.forwardRef(function CustomStepper(
    { steps, onFinish },
    ref
) {
    const classes = useStyles();
    const [currentStep, setStep] = useState(0);

    const controls = {
        goNext: () => setStep(prevStep => prevStep + 1),
        goBack: () => setStep(prevStep => prevStep - 1),
        reset: () => setStep(0)
    };

    return (
        <div className={classes.root} ref={ref}>
            <Stepper activeStep={currentStep} orientation='vertical'>
                {steps.map(({ label, component: Component }) => (
                    <Step key={label} classes={{ root: classes.root }}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <div className={classes.actionsContainer}>
                                <Button
                                    disabled={currentStep === 0}
                                    onClick={controls.goBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className={classes.component}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Component controls={controls} />
                                    </Grid>
                                </Grid>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {currentStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Click finish to complete.</Typography>
                    <Button
                        onClick={() => onFinish(controls)}
                        className={classes.button}
                    >
                        Finish
                    </Button>
                </Paper>
            )}
        </div>
    );
});

CustomStepper.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            component: PropTypes.func.isRequired
        })
    ).isRequired,
    onFinish: PropTypes.func.isRequired
};

export default CustomStepper;
