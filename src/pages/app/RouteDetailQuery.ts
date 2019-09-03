import gql from 'graphql-tag';
import { TrailEntityTypes } from '../../contexts/TrailContext';

interface Multimedium {
  multimedium: {
    id: number;
    name: string;
    link: string;
  };
}

interface File {
  file: {
    id: number;
    name: string;
    link: string;
  };
}

export interface RouteDetailQueryData {
  routes_by_pk: {
    id: number;
    short_title: string;
    title: string;
    body: string;
    typeByType: {
      name: TrailEntityTypes;
    };
    route_multimedia: Multimedium[];
    route_files: File[];
  };
  reviews_aggregate: {
    aggregate: {
      avg: {
        rating: number;
      };
      count: number;
    };
  };
}

export interface RouteDetailQueryVars {
  id: number;
}

const RouteDetailQuery = gql`
  query($id: Int!) {
    routes_by_pk(id: $id) {
      id
      short_title
      title
      body
      typeByType {
        name
      }
      route_multimedia {
        multimedium {
          id
          name
          link
        }
      }
      route_files {
        file {
          id
          name
          link
        }
      }
    }
    reviews_aggregate(where: { route_review: { route_id: { _eq: $id } } }) {
      aggregate {
        avg {
          rating
        }
        count
      }
    }
  }
`;

export default RouteDetailQuery;
