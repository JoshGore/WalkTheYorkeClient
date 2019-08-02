//@format
import React from 'react';
import Input from '@material-ui/core/Input';

interface MenuProps {
  portrait: boolean;
  selection: object;
  setSelection: object;
}

const Menu: React.FC<MenuProps> = ({portrait}) => {
  return (
    <div
      style={{
        width: portrait ? '' : '33vw',
        height: portrait ? '33%' : '',
        order: portrait ? 15 : 5,
        background: 'rgba(255,0,0,0.2)',
        boxShadow: '0px 0px 3px 3px rgba(0,0,0,0.2)',
        zIndex: 10,
      }}></div>
  );
};

export default Menu;
