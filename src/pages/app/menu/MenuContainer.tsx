import React, { useState, useEffect, cloneElement } from 'react';
import {
  Grid, makeStyles, createStyles, Theme,
} from '@material-ui/core';
import Measure, { ContentRect } from 'react-measure';
import useWindowSize from '../../../utils/WindowSize';
import ToggleButton from './ToggleButton';

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

const useStyles = makeStyles({
  content: {
    position: 'absolute',
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
});

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
    console.log('getting menu height');
    if (mode === 'bottom' && menuState === 'collapsed') {
      return headerSize.height;
    }
    if (mode === 'bottom' && menuState === 'visible') {
      return headerSize.height + VISIBLE_OFFSET;
    }
    if (mode === 'bottom' && menuState === 'fullscreen') {
      return windowSize.innerHeight;
    }
    if (mode === 'side') {
      return windowSize.innerHeight;
    }
    return 0;
  };

  const getMenuWidth = ():number => {
    if (mode === 'side' && (menuState === 'collapsed' || menuState === 'visible')) {
      return VISIBLE_OFFSET;
    }
    if (mode === 'side' && menuState === 'fullscreen') {
      return windowSize.innerWidth;
    }
    if (mode === 'bottom') {
      return windowSize.innerWidth;
    }
    return 0;
  };

  const getMenuTop = ():number => {
    if (mode === 'bottom' && (menuState === 'collapsed' || menuState === 'visible')) {
      return placeholderSizePosition.offsetTop;
    }
    if (mode === 'bottom' && menuState === 'fullscreen') {
      return windowSize.innerHeight - (placeholderSizePosition.offsetTop + placeholderSizePosition.height);
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
    if (mode === 'side') {
      return windowSize.innerHeight;
    }
    return 0;
  };

  const getPlaceholderWidth = ():number => {
    if (mode === 'bottom') {
      return windowSize.innerWidth;
    }
    if (mode === 'side') {
      return VISIBLE_OFFSET;
    }
    return 0;
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
      <div style={{
        position: 'absolute',
        background: 'pink',
        ...getMenuPositionDimensions(),
      }}
      >
        <Measure bounds onResize={contentRect => handleHeaderSizeChange(contentRect)}>
          {
            ({ measureRef }) => (
              <div ref={measureRef} style={{ background: 'cream', width: '100%' }}>
                {header}
                <ToggleButton mode={mode} menuState={menuState} setMenuState={setMenuState} />
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
