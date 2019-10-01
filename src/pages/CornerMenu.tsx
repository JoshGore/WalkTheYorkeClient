import React, { useState, useContext } from 'react';
import {
  makeStyles,
  createStyles,
  IconButton,
  Avatar,
  Button,
  Tooltip,
  ClickAwayListener,
} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import BugReportIcon from '@material-ui/icons/BugReport';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import UserContext, { UserContextProps } from '../contexts/UserContext';
import TrailContext, { TrailContextProps } from '../contexts/TrailContext';
import SplashLegend from './SplashLegend';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    button: {
      boxShadow: '4px 4px 10px -5px rgba(0,0,0,0.75)',
      padding: 0,
      zIndex: 99,
    },
    loggedIn: {
      backgroundColor: '#3f51b5',
    },
    speedDial: {
      '& .MuiButtonBase-root': {
        zIndex: 99,
      },
      '& .MuiSpeedDialAction-button': {
        zIndex: 999,
      },
    },
    speedDialDisabled: {
      '& .MuiSpeedDial-fab': {
        backgroundColor: '#bdbdbd',
      },
    },
  }),
);

interface BodyTextProps {
  loading: boolean;
  body: string | undefined;
}

interface CornerMenuProps {
  newPointCategoryTypeIds: {
    parentTypeId: number | undefined;
    typeId: number | undefined;
  };
  setNewPointCategoryTypeIds: (pointTypeId: {
    parentTypeId: number | undefined;
    typeId: number | undefined;
  }) => void;
  userPointTypes: any;
  userPointTypesLoading: any;
}

const CornerMenu: React.FC<CornerMenuProps> = ({
  newPointCategoryTypeIds,
  setNewPointCategoryTypeIds,
  userPointTypes,
  userPointTypesLoading,
}) => {
  const classes = useStyles();
  const User = useContext<UserContextProps>(UserContext);
  const Trail = useContext<TrailContextProps>(TrailContext);
  const handleLoginToggle = () => {
    User.setLoginMenuOpen(!User.loginMenuOpen);
  };
  const [dialOpen, setDialOpen] = useState(false);
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);
  const handleHideLoginTooltip = () => setShowLoginTooltip(false);
  const handleShowLoginTooltip = () => setShowLoginTooltip(true);
  const toggleDialMenu = () => {
    if (User.loggedIn) {
      setDialOpen(!dialOpen);
    } else {
      setDialOpen(false);
      setShowLoginTooltip(true);
    }
  };
  const setSubmissionMode = (type: number, subType: number | undefined) => {
    Trail.setNewTrailPoint({
      ...Trail.newTrailPoint,
      type,
    });
    setNewPointCategoryTypeIds({ parentTypeId: type, typeId: subType });
    toggleDialMenu();
  };
  const [splashLegendOpen, setSplashLegendOpen] = useState(true);
  const openSplashLegend = () => setSplashLegendOpen(true);
  return (
    <div className={classes.container}>
      <div
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          margin: 4,
          height: '56px',
          paddingTop: '10px',
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          style={{ padding: '6px' }}
          href="https://www.surveymonkey.com/r/RQVKLBT"
          target="_blank"
        >
          Survey
        </Button>
      </div>
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
      <SplashLegend open={splashLegendOpen} setOpen={setSplashLegendOpen} />
      <div style={{ display: 'inline-block', verticalAlign: 'top', margin: 4 }}>
        <IconButton className={classes.button} onClick={openSplashLegend}>
          <Avatar
            style={{ height: 56, width: 56, backgroundColor: '#3f51b5' }}
            className={User.loggedIn ? classes.loggedIn : undefined}
          >
            <InfoIcon />
          </Avatar>
        </IconButton>
      </div>
      <div
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          margin: 4,
        }}
      >
        {User.loggedIn ? (
          <SpeedDial
            icon={<EditLocationIcon />}
            ariaLabel="map actions"
            open={dialOpen}
            onClick={toggleDialMenu}
            direction="down"
            className={`${classes.speedDial} ${
              User.loggedIn ? '' : classes.speedDialDisabled
            }`}
          >
            {!userPointTypesLoading &&
              userPointTypes.types_by_pk.types.map((parentType: any) =>
                parentType.types.map((type: any) => (
                  <SpeedDialAction
                    icon={
                      parentType.name === 'issue' ? (
                        <WarningIcon />
                      ) : (
                        <AddLocationIcon />
                      )
                    }
                    tooltipTitle={type.name}
                    tooltipOpen
                    onClick={() => setSubmissionMode(parentType.id, type.id)}
                  />
                )),
              )}
          </SpeedDial>
        ) : (
          <ClickAwayListener onClickAway={handleHideLoginTooltip}>
            <div>
              <Tooltip
                onClose={handleHideLoginTooltip}
                onOpen={handleShowLoginTooltip}
                open={showLoginTooltip}
                title="Login to add points"
              >
                <IconButton
                  className={classes.button}
                  onClick={handleShowLoginTooltip}
                >
                  <Avatar style={{ height: 56, width: 56 }}>
                    <EditLocationIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default CornerMenu;
