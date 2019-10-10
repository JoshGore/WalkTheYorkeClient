import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Link,
} from '@material-ui/core';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import InfoIcon from '@material-ui/icons/Info';
import TouchAppIcon from '@material-ui/icons/TouchApp';

import shelterTeardrop from './app/map/icons/shelter_teardrop.png';
import walkTrailUse from './app/map/icons/trail-walking - legend.png';
import sharedTrailUse from './app/map/icons/shared - legend.png';
import rideTrailUse from './app/map/icons/bicycling - legend.png';
import marker from './app/map/icons/marker - legend.png';
import toilet from './app/map/icons/Toilet - legend.png';
import seat from './app/map/icons/Bench - legend.png';
import infoSign from './app/map/icons/info_sign - legend.png';
import userPoint from './app/map/icons/user_point_teardrop.png';
import userIssue from './app/map/icons/user_issue_teardrop.png';

const LegendEntry: React.FC<{
  interactive?: boolean;
  symbol: any;
  description: string;
}> = ({ interactive = false, symbol, description }) => (
  <div>
    <div
      style={{
        height: '20px',
        width: '20px',
        padding: '2px',
        overflow: 'hidden',
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'middle',
      }}
    >
      {interactive && (
        <TouchAppIcon
          style={{
            display: 'block',
            height: '100%',
            width: '100%',
          }}
        />
      )}
    </div>
    <div
      style={{
        height: '20px',
        width: '20px',
        padding: '2px',
        overflow: 'hidden',
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'middle',
      }}
    >
      <img
        src={symbol}
        alt=""
        style={{
          display: 'block',
          height: '100%',
          width: '100%',
        }}
      />
    </div>
    <Typography
      display="inline"
      style={{ verticalAlign: 'middle' }}
      variant="subtitle2"
    >
      &nbsp;{description}
    </Typography>
  </div>
);

const SplashLegend: React.FC<{
  open: boolean;
  setOpen: any;
}> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Avatar
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 10,
            height: '56px',
            width: '56px',
          }}
        >
          <InfoIcon />
        </Avatar>
      </DialogTitle>
      <DialogContent>
        <div>
          <TouchAppIcon style={{ verticalAlign: 'middle' }} />
          <Typography
            variant="body2"
            display="inline"
            style={{ verticalAlign: 'middle' }}
          >
            <i>&nbsp;tap features to interact</i>
          </Typography>
        </div>
        <div>
          <PersonAddIcon style={{ verticalAlign: 'middle' }} />
          <Typography
            variant="body2"
            display="inline"
            style={{ verticalAlign: 'middle' }}
          >
            <i>&nbsp;login to comment, review and add points</i>
          </Typography>
        </div>
        <div>
          <EditLocationIcon style={{ verticalAlign: 'middle' }} />
          <Typography
            variant="body2"
            display="inline"
            style={{ verticalAlign: 'middle' }}
          >
            <i>&nbsp;help by adding hazards, issues, and new features</i>
          </Typography>
        </div>
        <Typography variant="h6" display="inline">
          Legend
        </Typography>
        <LegendEntry
          symbol={sharedTrailUse}
          interactive
          description="Shared Use"
        />
        <LegendEntry
          symbol={rideTrailUse}
          interactive
          description="Bike Route"
        />
        <LegendEntry
          symbol={walkTrailUse}
          interactive
          description="Foot Route"
        />
        <LegendEntry
          symbol={shelterTeardrop}
          interactive
          description="Shelter"
        />
        <LegendEntry
          symbol={userPoint}
          interactive
          description="Features Submitted by Users"
        />
        <LegendEntry
          symbol={userIssue}
          interactive
          description="Problems Shared by Users"
        />
        <LegendEntry symbol={toilet} description="Toilet" />
        <LegendEntry symbol={seat} description="Seat" />
        <LegendEntry symbol={infoSign} description="Info Sign" />
        <LegendEntry symbol={marker} description="Marker" />
        <Typography variant="h6">The Research Project</Typography>
        <Typography variant="body2" gutterBottom>
          We are researching effective cartography for tourism-focused
          participatory applications and would love your input! The aim of this
          project is to create a highly usable web map suitable for a range of
          trail users, whilst also providing participatory functionality
          allowing users to share otherwise-inaccessible information with both
          other users and trail mangers. We would appreciate your feedback on
          the design and interaction decisions we have made and your opinion on
          suitability of this map. The map is still at the prototype stage so
          there will be a few bugs.
        </Typography>
        <Typography variant="body2">
          <Link href="https://www.surveymonkey.com/r/RQVKLBT" target="_blank">
            The survey (opens in new tab)
          </Link>
          &nbsp;contains several short tasks exploring the various features of
          this map. After exploring the map click the (i) icon to return to this
          screen and complete the survey. Thanks for your input!
        </Typography>
        <Typography variant="h6">Information Sources</Typography>
        <Typography variant="body2">
          Trail descriptions and images have been sourced from&nbsp;
          <Link href="https://yorkepeninsula.com.au/walk-the-yorke" target="_blank">
            the Yorke Peninsula Tourism site
          </Link>
          .&nbsp;Trail Data has been provided by the&nbsp;
          <Link href="https://yorke.sa.gov.au/" target="_blank">
            Yorke Peninsula Council 
          </Link>
          .&nbsp; For more information about the trail, trail rules, and for paper maps please visit 
          <Link href="https://www.visityorkepeninsula.com.au/walk-the-yorke" target="_blank">
            https://www.visityorkepeninsula.com.au/walk-the-yorke
          </Link>.
         </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default SplashLegend;
