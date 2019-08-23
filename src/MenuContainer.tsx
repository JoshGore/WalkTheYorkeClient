import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    breadcrumbs: {
      padding: theme.spacing(1, 2),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
);

interface MenuContainerProps {
  portrait: boolean;
  links: Array<{ name: string; link: string }>;
  children: any;
  newSelection: boolean;
}

const MenuContainer: React.FC<MenuContainerProps> = ({
  portrait,
  links,
  children,
  newSelection,
}) => {
  const classes = useStyles();
  // store retrieved current description text
  const [selection, setNewSelection] = useState(false);
  const [menuShown, setMenuShown] = useState(2);
  const handleMenuToggle = () => {
    menuShown === 0
      ? setMenuShown(1)
      : !portrait && menuShown === 2
        ? setMenuShown(1)
        : setMenuShown(0);
  };
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<
  MenuContainerProps['links']
  >([]);
  const [breadcrumbCurrent, setBreadcrumbCurent] = useState<
  undefined | { name: string; link: string }
  >();
  useEffect(() => {
    const templinks = links;
    setBreadcrumbCurent(templinks.pop());
    setBreadcrumbLinks(templinks);
  }, [links]);
  useEffect(() => {
    if (newSelection) {
      setNewSelection(false);
      menuShown === 0 && setMenuShown(2);
    }
  }, [newSelection]);
  return (
    <div
      style={{
        transition: 'width 0.25s, height 0.25s',
        width: portrait ? '100vw' : menuShown === 1 ? '100vw' : '33vw',
        height: portrait
          ? menuShown === 0
            ? 'fit-content'
            : menuShown === 1
              ? '100%'
              : '33%'
          : '100%',
        order: window.innerWidth < window.innerHeight ? 15 : 5,
        boxShadow: '0px 0px 30px 10px rgba(0,0,0,0.2)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100%' }}>
        <Paper elevation={0} className={classes.breadcrumbs}>
          <Breadcrumbs
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          >
            {breadcrumbLinks.map((templink: any) => (
              <Link
                key={templink.link}
                component={RouterLink}
                to={templink.link}
              >
                {templink.name}
              </Link>
            ))}
            {breadcrumbCurrent !== undefined && (
              <Typography color="textPrimary">
                {breadcrumbCurrent.name}
              </Typography>
            )}
          </Breadcrumbs>
          <IconButton
            size="small"
            onClick={handleMenuToggle}
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              float: 'right',
              transform: `rotate(${
                portrait
                  ? menuShown === 0
                    ? 180
                    : 0
                  : menuShown === 0 || menuShown === 2
                    ? 270
                    : 90
              }deg)`,
              transition: 'transform 0.25s',
            }}
          >
            <ExpandMore />
          </IconButton>
        </Paper>
      </div>
      <Scrollbars
        onScroll={() => portrait && menuShown !== 1 && setMenuShown(1)}
      >
        {children}
      </Scrollbars>
    </div>
  );
};

export default MenuContainer;
