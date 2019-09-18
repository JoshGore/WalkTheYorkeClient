import gql from 'graphql-tag';
import { TrailEntityTypes } from '../contexts/TrailContext';

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
    short_name: string;
    name: string;
    description: string;
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

export const RouteDetailQuery = gql`
  query($id: Int!) {
    routes_by_pk(id: $id) {
      id
      short_name
      name
      description
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

export interface PointDetailQueryVars {
  id: number;
}

export interface PointDetailQueryData {
  points_by_pk: {
    id: number;
    name: string;
    description: string;
    types: {
      type: {
        name: TrailEntityTypes;
      };
    }[];
    point_multimedia: Multimedium[];
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

export const PointDetailQuery = gql`
  query($id: Int!) {
    points_by_pk(id: $id) {
      id
      name
      description
      types {
        type {
          name
        }
      }
      point_multimedia {
        multimedium {
          id
          name
          link
        }
      }
    }
    reviews_aggregate(where: { point_reviews: { point_id: { _eq: $id } } }) {
      aggregate {
        avg {
          rating
        }
        count
      }
    }
  }
`;
