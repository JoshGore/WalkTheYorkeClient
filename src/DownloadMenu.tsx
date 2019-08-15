import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

const DownloadMenu: React.FC<any> = ({ links }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        variant='outlined'
        size='small'
        onClick={handleClick}
      >
        Downloads
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {links.map((link: any) => (
          <MenuItem
            key={link.link}
            onClick={handleClose}
            component='a'
            href={link.link}
          >
            {link.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DownloadMenu;
