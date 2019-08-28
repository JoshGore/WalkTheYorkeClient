import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
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

interface AppProps {
  RouteProps: RouteComponentProps<{id: string, type: string}>;
}

const App: React.FC<AppProps> = ({ RouteProps }) => {
  const classes = useStyles();
  const [portrait, setPortrait] = useState(true);
  const [trailSection, setTrailSection] = useState<TrailSectionProps>({
    name: WTY_NAME, shortName: WTY_SHORT_NAME, id: WTY_TRAIL_ID, type: 'trail',
  });
  const [trailObject, setTrailObject] = useState<TrailObjectProps>({
    name: undefined, id: undefined, type: undefined,
  });
  const [trailId, setTrailId] = useState(WTY_TRAIL_ID);
  useEffect(() => {
    console.log('should be blinkin mounted');
    RouteProps.history.listen(() => {
      if (RouteProps.match.params.id !== undefined) {
        setTrailSection({ ...trailSection, id: parseInt(RouteProps.match.params.id, 10) });
      } else {
        setTrailSection({ ...trailSection, id: trailId });
      }
      console.log(`Trail Section is :${trailSection.id}`);
    });
  }, []);
  return (
    <Grid container className={`${classes.root} ${portrait ? classes.portrait : classes.landscape}`}>
      <Map
        trailSection={trailSection}
        setTrailSection={setTrailSection}
        trailObject={trailObject}
        setTrailObject={setTrailObject}
        trailId={trailId}
      />
      <Menu
        menuMode={portrait ? 'bottom' : 'side'}
        trailSection={trailSection}
        setTrailSection={setTrailSection}
        trailObject={trailObject}
        setTrailObject={setTrailObject}
        trailId={trailId}
      />
    </Grid>
  );
};

export default App;
