import React from 'react';
import { Breadcrumbs, Typography, Link } from '@material-ui/core';
import { TrailEntityProps } from '../../contexts/TrailContext';

/*
interface BreadcrumbProps {
  trailSection: TrailEntityProps;
  handleHomeLinkClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
}
 */
interface BreadcrumbProps {
  currentSelectionIfNotHome: string | undefined;
  handleHomeLinkClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
}
// trailSection.type === 'trail' || trailSection.type === undefined ?
const MenuBreadcrumbs: React.FC<BreadcrumbProps> = ({
  currentSelectionIfNotHome,
  handleHomeLinkClick,
}) =>
  currentSelectionIfNotHome === undefined ? (
    <Breadcrumbs style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <Typography color="textPrimary">Home</Typography>
    </Breadcrumbs>
  ) : (
    <Breadcrumbs style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <Link href="/" onClick={handleHomeLinkClick}>
        Home
      </Link>
      <Typography color="textPrimary">{currentSelectionIfNotHome}</Typography>
    </Breadcrumbs>
  );
/*
  trailSection.type === 'trail' || trailSection.type === undefined ? (
    <Breadcrumbs style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <Typography color="textPrimary">Home</Typography>
    </Breadcrumbs>
  ) : (
    <Breadcrumbs style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <Link href="/" onClick={handleHomeLinkClick}>
        Home
      </Link>
      <Typography color="textPrimary">{trailSection.shortName}</Typography>
    </Breadcrumbs>
  );
   */

export default MenuBreadcrumbs;
