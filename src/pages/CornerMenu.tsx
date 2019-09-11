import React, { useState, useContext } from 'react';
import {
  makeStyles,
  createStyles,
  IconButton,
  Avatar,
} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import BugReportIcon from '@material-ui/icons/BugReport';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import UserContext, { UserContextProps } from '../contexts/UserContext';
import TrailContext, { TrailContextProps } from '../contexts/TrailContext';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 99,
    },
    button: {
      boxShadow: '4px 4px 10px -5px rgba(0,0,0,0.75)',
      padding: 0,
    },
    loggedIn: {
      backgroundColor: '#3f51b5',
    },
  }),
);

interface BodyTextProps {
  loading: boolean;
  body: string | undefined;
}

const CornerMenu: React.FC = () => {
  const classes = useStyles();
  const User = useContext<UserContextProps>(UserContext);
  const Trail = useContext<TrailContextProps>(TrailContext);
  const handleLoginToggle = () => {
    User.setLoginMenuOpen(!User.loginMenuOpen);
  };
  const [dialOpen, setDialOpen] = useState(false);
  const toggleDialMenu = () => setDialOpen(!dialOpen);
  const setSubmissionMode = (
    type: 'issue' | 'newFeature',
    subType: string | undefined,
  ) => {
    if (!Trail.newTrailPoint.type) {
      Trail.setNewTrailPoint({
        ...Trail.newTrailPoint,
        type,
        subType,
      });
      toggleDialMenu();
    }
  };
  return (
    <div className={classes.container}>
      <div style={{ display: 'inline-block', verticalAlign: 'top', margin: 4 }}>
        <IconButton className={classes.button} onClick={handleLoginToggle}>
          <Avatar
            style={{ height: 56, width: 56 }}
            className={User.loggedIn ? classes.loggedIn : undefined}
          >
            {User.loggedIn ? (
              `${User.firstname!.charAt(0)}${User.lastname!.charAt(0)}`
            ) : (
              <PersonAddIcon />
            )}
          </Avatar>
        </IconButton>
      </div>
      <div style={{ display: 'inline-block', verticalAlign: 'top', margin: 4 }}>
        <SpeedDial
          icon={<SpeedDialIcon />}
          ariaLabel="map actions"
          open={dialOpen}
          onClick={toggleDialMenu}
          direction="down"
        >
          <SpeedDialAction
            icon={<BugReportIcon />}
            tooltipTitle="Add Asset"
            tooltipOpen
            onClick={() => setSubmissionMode('newFeature', undefined)}
          />
          <SpeedDialAction
            onClick={() => setSubmissionMode('issue', 'damage')}
            icon={<BugReportIcon />}
            tooltipTitle="Report Damage"
            tooltipOpen
          />
          <SpeedDialAction
            onClick={() => setSubmissionMode('issue', 'hazard')}
            icon={<BugReportIcon />}
            tooltipTitle="Report Hazard"
            tooltipOpen
          />
        </SpeedDial>
      </div>
    </div>
  );
};

export default CornerMenu;
