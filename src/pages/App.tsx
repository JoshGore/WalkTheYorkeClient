import React, { useState } from 'react';
import {
  Grid, makeStyles, createStyles, Theme,
} from '@material-ui/core';
import Map from './app/Map';
import Menu from './app/Menu';
import { TrailSectionProps, TrailObjectProps } from './types';

const WTY_TRAIL_ID = 15;
const WTY_NAME = 'Walk the Yorke';
const WTY_SHORT_NAME = 'Home';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    overflow: 'hidden',
  },
  portrait: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
  },
  landscape: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [portrait, setPortrait] = useState(true);
  const [trailSection, setTrailSection] = useState<TrailSectionProps>({
    name: WTY_NAME, shortName: WTY_SHORT_NAME, id: WTY_TRAIL_ID, type: 'trail',
  });
  const [trailObject, setTrailObject] = useState<TrailObjectProps>({
    name: undefined, id: undefined, type: undefined,
  });
  return (
    <Grid container className={`${classes.root} ${portrait ? classes.portrait : classes.landscape}`}>
      <Map
        trailSection={trailSection}
        setTrailSection={setTrailSection}
        trailObject={trailObject}
        setTrailObject={setTrailObject}
      />
      <Menu menuMode={portrait ? 'bottom' : 'side'} />
    </Grid>
  );
};

export default App;
