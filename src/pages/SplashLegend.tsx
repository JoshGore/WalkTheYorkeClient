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
        <Typography variant="h6">Offline Usage</Typography>
        <Typography variant="body2" gutterBottom>
          GPX Files of the entire trail and of each stage are available from the
          downloads menu. These can be used in a number of hiking apps.
          Topographic maps can also be purchased from&nbsp;
          <Link
            href="https://www.visityorkepeninsula.com.au/walk-the-yorke"
            target="_blank"
          >
            Yorke Peninsula Council
          </Link>
          &nbsp;offices in Maitland, Minlaton and Yorketown.
        </Typography>
        <Typography variant="h6">The Research Project</Typography>
        <Typography variant="body2">
          We have been developing a web map of the Walk the Yorke Trail and
          would love your feedback! Our map is intended to be useful and usable
          for all trail users. It also includes functions allowing you to add
          comments, reviews, and share points with other trail users and for the
          benefit of trail managers. We would appreciate your feedback on how
          easy the map is to use and how effectively the design and
          functionality of the map meets your needs. The map is still at the
          prototype stage so please accept that there will be a few bugs, and
          that trail information is incomplete.
        </Typography>
        <Typography variant="body2">
          <Link href="https://www.surveymonkey.com/r/RZ293MC" target="_blank">
            The survey (opens in new tab)
          </Link>
          &nbsp;contains several short tasks exploring the various features of
          this map. After exploring the map click the (i) icon to return to this
          screen and complete the survey.
        </Typography>
        <Typography variant="body2">Thanks for your input!</Typography>
        <Typography variant="h6">Information Sources</Typography>
        <Typography variant="body2">
          Trail descriptions and images have been sourced from&nbsp;
          <Link
            href="https://yorkepeninsula.com.au/walk-the-yorke"
            target="_blank"
          >
            the Yorke Peninsula Tourism site
          </Link>
          .&nbsp;Trail Data has been provided by the&nbsp;
          <Link href="https://yorke.sa.gov.au/" target="_blank">
            Yorke Peninsula Council
          </Link>
          .&nbsp;For more information about the trail, trail rules, and for
          paper maps please visit&nbsp;
          <Link
            href="https://www.visityorkepeninsula.com.au/walk-the-yorke"
            target="_blank"
          >
            www.visityorkepeninsula.com.au/walk-the-yorke
          </Link>
          .
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default SplashLegend;
