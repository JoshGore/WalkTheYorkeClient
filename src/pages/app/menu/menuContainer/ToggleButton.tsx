import React from 'react';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

type MenuStates = 'fullscreen' | 'visible' | 'collapsed';
type MenuModes = 'side' | 'bottom';
interface ToggleButtonProps {
  menuMode: MenuModes;
  menuState: MenuStates;
  setMenuState: (menuStates: MenuStates) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ menuMode, menuState, setMenuState }) => {
  const getTransform = (): 0 | 90 | 180 | 270 => {
    if (menuMode === 'side' && (menuState === 'collapsed' || menuState === 'visible')) {
      return 270;
    }
    if (menuMode === 'side' && menuState === 'fullscreen') {
      return 90;
    }
    if (menuMode === 'bottom' && (menuState === 'visible' || menuState === 'fullscreen')) {
      return 0;
    }
    if (menuMode === 'bottom' && menuState === 'collapsed') {
      return 180;
    }
    return 0;
  };
  const toggleMenu = () => {
    if (menuMode === 'side' && (menuState === 'collapsed' || menuState === 'visible')) {
      setMenuState('fullscreen');
    } else if (menuMode === 'side' && menuState === 'fullscreen') {
      setMenuState('collapsed');
    } else if (menuMode === 'bottom' && (menuState === 'visible' || menuState === 'fullscreen')) {
      setMenuState('collapsed');
    } else if (menuMode === 'bottom' && menuState === 'collapsed') {
      setMenuState('fullscreen');
    }
  };
  return (
    <IconButton
      size="small"
      onClick={toggleMenu}
    >
      <ExpandMore style={{
        transform: `rotate(${getTransform()}deg)`,
        transition: 'transform 0.25s',
      }}
      />
    </IconButton>
  );
};

export default ToggleButton;
