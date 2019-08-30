import React, {
  useState, useEffect, useLayoutEffect, cloneElement,
} from 'react';
import { useSpring, animated } from 'react-spring';
import {
  Grid, makeStyles, createStyles, Theme,
} from '@material-ui/core';
import Measure, { ContentRect } from 'react-measure';
import Scrollbars from 'react-custom-scrollbars';
import useWindowSize from '../../../utils/WindowSize';
import ToggleButton from './menuContainer/ToggleButton';

type MenuStates = 'fullscreen' | 'visible' | 'collapsed';
type MenuModes = 'side' | 'bottom';

interface MenuProps {
  header: JSX.Element;
  body: JSX.Element;
  mode: MenuModes;
  mainContent: JSX.Element;
}

interface SizePosition {
  offsetTop: number;
  offsetLeft: number;
  height: number;
  width: number;
}
interface Position {
  top: number;
  left: number;
}
interface Dimensions {
  height: number;
  width: number;
}

type PositionDimensions = Position & Dimensions;

const useStyles = makeStyles((theme: Theme) => createStyles({
  content: {
    position: 'absolute',
    maxWidth: '100vw',
    zIndex: 999,
    boxShadow: '0px 0px 30px 10px rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    display: 'flex',
    flexFlow: 'column',
  },
  placeholder: {
    position: 'relative',
  },
  placeholderBottom: {
    order: 15,
  },
  placeholderSide: {
    order: 5,
  },
  header: {
    padding: theme.spacing(1, 2),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
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

const VISIBLE_OFFSET = 500;

const MenuContainer: React.FunctionComponent<MenuProps> = ({
  // header, body, mainContent, mode,
  header, body, mainContent,
}) => {
  const [mode, setMode] = useState<MenuModes>(window.innerHeight > window.innerWidth ? 'bottom' : 'side');
  const [animationDisabled, setAnimationDisabled] = useState(false);
  useLayoutEffect(() => {
    windowSize.innerHeight > windowSize.innerWidth ? setMode('bottom') : setMode('side');
  });
  const classes = useStyles();
  const [menuState, setMenuState] = useState<MenuStates>('collapsed');
  const windowSize = useWindowSize();
  const [headerSize, setHeaderSize] = useState({ width: -1, height: -1 });
  const [offset, setOffset] = useState(VISIBLE_OFFSET);
  const contentLeft = 0;
  const contentBottom = 0;
  const contentRightVisible = ():number => (mode === 'side' ? windowSize.innerWidth - offset : 0);
  const contentRightFullscreen = 0;
  const contentTopCollapsed = ():number => (mode === 'bottom' ? windowSize.innerHeight - headerSize.height : 0);
  const contentTopVisible = ():number => (mode === 'bottom' ? windowSize.innerHeight - offset : 0);
  const contentTopFullscreen = 0;
  // const [contentTopRight, setContentTopRight] = useSpring(() => ({ top: contentTopCollapsed(), right: contentRightVisible(), immediate: animationDisabled }));
  const [contentTopRight, setContentTopRight] = useSpring(() => ({
    top: contentTopCollapsed(), right: contentRightVisible(),
  }));
  useEffect(() => {
    setContentTopRight({
      top: menuState === 'collapsed' ? contentTopCollapsed() : menuState === 'visible' ? contentTopVisible() : contentTopFullscreen,
      right: menuState === 'fullscreen' ? contentRightFullscreen : contentRightVisible(),
    });
  });
  const placeholderWidth = (): number | string => (mode === 'side' ? offset : windowSize.innerWidth);
  const placeholderHeightCollapsed = ():number => (mode === 'side' ? windowSize.innerHeight : headerSize.height);
  const placeholderHeightVisible = ():number => (mode === 'side' ? windowSize.innerHeight : offset);
  const [placeholderHeight, setPlaceholderHeight] = useSpring(() => ({ height: placeholderHeightCollapsed(), immediate: animationDisabled }));
  useEffect(() => {
    setPlaceholderHeight({
      height: menuState === 'collapsed' ? placeholderHeightCollapsed() : placeholderHeightVisible(),
    });
  });

  return (
    <Grid container className={`${classes.root} ${mode === 'bottom' ? classes.portrait : classes.landscape}`}>
      <animated.div
        className={`${classes.placeholder} ${mode === 'bottom' ? classes.placeholderBottom : classes.placeholderSide} `}
        style={{
          width: placeholderWidth(),
          ...placeholderHeight,
        }}
      />
      <animated.div
        style={{
          ...contentTopRight,
          left: contentLeft,
          bottom: contentBottom,
        }}
        className={classes.content}
      >
        <Measure bounds onResize={contentRect => setHeaderSize({ width: contentRect.bounds!.width, height: contentRect.bounds!.height })}>
          {
            ({ measureRef }) => (
              <div ref={measureRef} style={{ width: '100%', flex: '0 1 auto' }}>
                <Grid container className={classes.header}>
                  <Grid item>
                    {header}
                  </Grid>
                  <Grid item style={{ marginLeft: 'auto' }}>
                    <ToggleButton mode={mode} menuState={menuState} setMenuState={setMenuState} />
                  </Grid>
                </Grid>
              </div>
            )
          }
        </Measure>
        <Scrollbars style={{ flex: '1 1 auto' }}>{body}</Scrollbars>
      </animated.div>
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          flexGrow: 1,
          order: 10,
          minWidth: 0,
          minHeight: 0,
        }}
      >
        {mainContent}
      </div>
    </Grid>
  );
};

export default MenuContainer;
