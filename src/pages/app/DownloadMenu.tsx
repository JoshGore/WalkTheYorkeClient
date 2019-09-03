import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

interface File {
  file: {
    id: number,
    name: string,
    link: string,
  }
}

interface DownloadMenuProps {
  links: File []
}

const DownloadMenu: React.FC<DownloadMenuProps> = ({ links }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {!!links.length && (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="outlined"
          size="small"
          onClick={handleClick}
        >
          Downloads
        </Button>
      )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {links.map(({ file }: File) => (
          <MenuItem key={file.link} onClick={handleClose} component="a" href={file.link}>
            {file.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DownloadMenu;
