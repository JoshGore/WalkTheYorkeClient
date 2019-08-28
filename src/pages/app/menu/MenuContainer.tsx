import React, { useState, useEffect, cloneElement } from 'react';
import {
  Grid, makeStyles, createStyles, Theme,
} from '@material-ui/core';
import Measure, { ContentRect } from 'react-measure';
import useWindowSize from '../../../utils/WindowSize';
import ToggleButton from './menuContainer/ToggleButton';

type MenuStates = 'fullscreen' | 'visible' | 'collapsed';
type MenuModes = 'side' | 'bottom';

interface MenuProps {
  header: JSX.Element;
  body: JSX.Element;
  mode: MenuModes;
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
    zIndex: 10,
    boxShadow: '0px 0px 30px 10px rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
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
}));

const VISIBLE_OFFSET = 100;

const MenuContainer: React.FunctionComponent<MenuProps> = ({ header, body, mode }) => {
  const classes = useStyles();
  const [placeholderSizePosition, setPlaceholderSizePosition] = useState<SizePosition>({
    width: -1, height: -1, offsetTop: -1, offsetLeft: -1,
  });
  const [menuState, setMenuState] = useState<MenuStates>('collapsed');
  const [headerSize, setHeaderSize] = useState({ width: -1, height: -1 });
  const windowSize = useWindowSize();

  const handlePlaceholderSizePositionChange = (contentRect: ContentRect) => {
    setPlaceholderSizePosition({
      width: contentRect.bounds!.width,
      height: contentRect.bounds!.height,
      offsetTop: contentRect.offset!.top,
      offsetLeft: contentRect.offset!.left,
    });
  };
  const handleHeaderSizeChange = (contentRect: ContentRect) => {
    setHeaderSize({
      width: contentRect.bounds!.width,
      height: contentRect.bounds!.height,
    });
  };

  const getMenuHeight = ():number => {
    if (mode === 'bottom' && menuState === 'collapsed') {
      return headerSize.height;
    }
    if (mode === 'bottom' && menuState === 'visible') {
      return headerSize.height + VISIBLE_OFFSET;
    }
    return windowSize.innerHeight;
  };

  const getMenuWidth = ():number => {
    if (mode === 'side' && (menuState === 'collapsed' || menuState === 'visible')) {
      return VISIBLE_OFFSET;
    }
    return windowSize.innerWidth;
  };

  const getMenuTop = ():number => {
    if (mode === 'bottom' && (menuState === 'collapsed' || menuState === 'visible')) {
      return placeholderSizePosition.offsetTop;
    }
    return 0;
  };

  const getMenuLeft = ():number => placeholderSizePosition.offsetLeft;

  const getMenuPositionDimensions = ():PositionDimensions => ({
    top: getMenuTop(),
    left: getMenuLeft(),
    height: getMenuHeight(),
    width: getMenuWidth(),
  });

  const getPlaceholderHeight = ():number => {
    if (mode === 'bottom' && menuState === 'collapsed') {
      return headerSize.height;
    }
    if (mode === 'bottom' && (menuState === 'visible' || menuState === 'fullscreen')) {
      return headerSize.height + VISIBLE_OFFSET;
    }
    return windowSize.innerHeight;
  };

  const getPlaceholderWidth = ():number => {
    if (mode === 'side') {
      return VISIBLE_OFFSET;
    }
    return windowSize.innerWidth;
  };

  const getPlaceholderDimensions = ():Dimensions => ({
    height: getPlaceholderHeight(),
    width: getPlaceholderWidth(),
  });

  return (
    <>
      <Measure
        bounds
        offset
        onResize={contentRect => handlePlaceholderSizePositionChange(contentRect)}
      >
        {
          ({ measureRef }) => (
            <Grid
              className={`${classes.placeholder} ${mode === 'bottom' ? classes.placeholderBottom : classes.placeholderSide} `}
              style={{ ...getPlaceholderDimensions() }}
              ref={measureRef}
            />
          )
        }
      </Measure>
      <div
        style={{
          ...getMenuPositionDimensions(),
        }}
        className={classes.content}
      >
        <Measure bounds onResize={contentRect => handleHeaderSizeChange(contentRect)}>
          {
            ({ measureRef }) => (
              <div ref={measureRef} style={{ background: 'cream', width: '100%' }}>
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
        <div>{body}</div>
      </div>
    </>
  );
};

export default MenuContainer;
