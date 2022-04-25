import { CircularProgress } from '@mui/material';
import { FC } from 'react';

interface CenterSpinnerProps {
  disableShrink?: boolean;
}

const defaultProps: CenterSpinnerProps = {
  disableShrink: false,
};

const CenterSpinner: FC<CenterSpinnerProps> = ({ disableShrink }) => (
  <CircularProgress
    disableShrink={disableShrink}
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-12px',
      marginLeft: '-12px',
    }}
  />
);
CenterSpinner.defaultProps = defaultProps;
export default CenterSpinner;
