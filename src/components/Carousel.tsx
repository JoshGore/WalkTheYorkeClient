import React, { useState, useEffect } from 'react';
import {
  makeStyles, createStyles, Theme,
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

type MenuModes = 'side' | 'bottom';

interface Multimedium {
  multimedium: {
    id: number;
    name: string;
    link: string;
  }
}

interface MultimediaCarouselProps {
  multimedia: Multimedium[] | undefined;
  loading: boolean;
}

const Carousel: React.FC<MultimediaCarouselProps> = ({ multimedia, loading }) => (
  <div style={{ width: '100%' }}>
    {!loading ? (!!multimedia && !!multimedia.length && (
      <img
        alt=""
        className="d-block w-100"
        style={{ width: '100%' }}
        src={multimedia![0].multimedium.link}
      />
    )
    ) : (
      <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ maxWidth: 'calc(90vh * 9 / 16)' }}>
          <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
            }}
            >
              <Skeleton variant="rect" width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Carousel;
