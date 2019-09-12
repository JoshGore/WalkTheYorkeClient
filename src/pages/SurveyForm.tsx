import React, { useState } from 'react';
import { Dialog, Typography } from '@material-ui/core';

const SurveyForm: React.FC<{
  open: boolean;
  setOpen: any;
}> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const [activeStep, setActiveStep] = useState(1);
  return (
    <Dialog onClose={handleClose} open={open}>
      <Typography>About This Map</Typography>
      <Typography>About This Project</Typography>
      <Typography>Technical Details</Typography>
      <Typography>Survey</Typography>
    </Dialog>
  );
};

export default SurveyForm;
