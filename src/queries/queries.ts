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

export const ROUTE_DETAIL_QUERY = gql`
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

export const POINT_DETAIL_QUERY = gql`
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

export const USER_POINT_DETAIL_QUERY = gql`
  query($id: Int!) {
    user_points_by_pk(id: $id) {
      id
      name
      description
      type {
        name
      }
    }
  }
`;

export const BASIC_USER_DETAILS_FRAGMENT = gql`
  fragment basic_user_details on users {
    firstname
    lastname
    id
  }
`;

export const COMMENT_DETAILS_FRAGMENT = gql`
  fragment comment_details on comments {
    created_at
    body
    id
    user {
      ...basic_user_details
    }
  }
  ${BASIC_USER_DETAILS_FRAGMENT}
`;

export const ROUTE_COMMENT_SUBSCRIPTION_QUERY = gql`
  subscription($id: Int!) {
    routes_by_pk(id: $id) {
      route_comments(order_by: { comment: { created_at: desc } }) {
        comment {
          ...comment_details
          comments {
            ...comment_details
          }
        }
      }
    }
  }
  ${COMMENT_DETAILS_FRAGMENT}
`;

export const POINT_COMMENT_SUBSCRIPTION_QUERY = gql`
  subscription($id: Int!) {
    points_by_pk(id: $id) {
      point_comments(order_by: { comment: { created_at: desc } }) {
        comment {
          ...comment_details
          comments {
            ...comment_details
          }
        }
      }
    }
  }
  ${COMMENT_DETAILS_FRAGMENT}
`;

export const USER_POINT_COMMENT_SUBSCRIPTION_QUERY = gql`
  subscription($id: Int!) {
    user_points_by_pk(id: $id) {
      user_point_comments(order_by: { comment: { created_at: desc } }) {
        comment {
          ...comment_details
          comments {
            ...comment_details
          }
        }
      }
    }
  }
  ${COMMENT_DETAILS_FRAGMENT}
`;

export const ROUTE_COMMENT_INSERT_QUERY = gql`
  mutation($routeId: Int!, $user: Int!, $body: String) {
    insert_route_comment(
      objects: {
        route_id: $routeId
        comment: { data: { body: $body, user_id: $user } }
      }
    ) {
      returning {
        comment {
          body
        }
      }
    }
  }
`;

export const POINT_COMMENT_INSERT_QUERY = gql`
  mutation($pointId: Int!, $user: Int!, $body: String) {
    insert_point_comment(
      objects: {
        point_id: $pointId
        comment: { data: { body: $body, user_id: $user } }
      }
    ) {
      returning {
        comment {
          body
        }
      }
    }
  }
`;

export const USER_POINT_COMMENT_INSERT_QUERY = gql`
  mutation($pointId: Int!, $user: Int!, $body: String) {
    insert_user_point_comment(
      objects: {
        user_point_id: $pointId
        comment: { data: { body: $body, user_id: $user } }
      }
    ) {
      returning {
        comment {
          body
        }
      }
    }
  }
`;

export const COMMENT_REPLY_INSERT_QUERY = gql`
  mutation insert_comments(
    $commentThreadId: Int!
    $userId: Int!
    $body: String
  ) {
    insert_comments(
      objects: { body: $body, comment_id: $commentThreadId, user_id: $userId }
    ) {
      returning {
        body
        user_id
      }
    }
  }
`;

export interface ROUTE_COMMENT_SUBSCRIPTION_QUERY_TYPES {
  routes_by_pk: {
    route_comments: {
      comment: {
        created_at: string;
        body: string;
        id: number;
        user: {
          firstname: string;
          lastname: string;
          id: number;
        };
        comments: {
          id: number;
          body: string;
          created_at: string;
          user: {
            firstname: string;
            lastname: string;
            id: number;
          };
        }[];
      };
    }[];
  };
}

export interface POINT_COMMENT_SUBSCRIPTION_QUERY_TYPES {
  points_by_pk: {
    point_comments: {
      comment: {
        created_at: string;
        body: string;
        id: number;
        user: {
          firstname: string;
          lastname: string;
          id: number;
        };
        comments: {
          id: number;
          body: string;
          created_at: string;
          user: {
            firstname: string;
            lastname: string;
            id: number;
          };
        }[];
      };
    }[];
  };
}

export interface ReviewProps {
  rating: number;
  body: string;
  id: number;
  created_at: any;
  user: {
    firstname: string;
    lastname: string;
  };
}

export interface ReviewQueryData {
  reviews: ReviewProps[];
}

export interface ReviewQueryVars {
  id: number;
}

export const ROUTE_REVIEWS_QUERY = gql`
  query($id: Int!) {
    reviews(where: { route_review: { route_id: { _eq: $id } } }) {
      rating
      body
      id
      created_at
      user {
        firstname
        lastname
      }
    }
  }
`;

export const POINT_REVIEWS_QUERY = gql`
  query($id: Int!) {
    reviews(where: { point_reviews: { point_id: { _eq: $id } } }) {
      rating
      body
      id
      created_at
      user {
        firstname
        lastname
      }
    }
  }
`;

export const USER_POINT_REVIEWS_QUERY = gql`
  query($id: Int!) {
    reviews(where: { user_point_reviews: { user_point_id: { _eq: $id } } }) {
      rating
      body
      id
      created_at
      user {
        firstname
        lastname
      }
    }
  }
`;

export const ROUTE_REVIEW_INSERT_QUERY = gql`
  mutation($route_id: Int!, $user_id: Int!, $rating: Int!, $review: String!) {
    insert_route_review(
      objects: {
        route_id: $route_id
        review: { data: { body: $review, rating: $rating, user_id: $user_id } }
      }
    ) {
      returning {
        review {
          rating
          body
        }
      }
    }
  }
`;

export const POINT_REVIEW_INSERT_QUERY = gql`
  mutation($point_id: Int!, $user_id: Int!, $rating: Int!, $review: String!) {
    insert_point_review(
      objects: {
        point_id: $point_id
        review: { data: { body: $review, rating: $rating, user_id: $user_id } }
      }
    ) {
      returning {
        review {
          rating
          body
        }
      }
    }
  }
`;

export const USER_POINT_REVIEW_INSERT_QUERY = gql`
  mutation($point_id: Int!, $user_id: Int!, $rating: Int!, $review: String!) {
    insert_user_point_review(
      objects: {
        user_point_id: $point_id
        review: { data: { body: $review, rating: $rating, user_id: $user_id } }
      }
    ) {
      returning {
        review {
          rating
          body
        }
      }
    }
  }
`;

export const TRAIL_GEOMETRY_QUERY = gql`
  query TrailGeometryQuery($trailId: Int!) {
    routes_by_pk(id: $trailId) {
      point_routes {
        point {
          name
          id
          geom
          types {
            type {
              name
            }
          }
          point_routes {
            route_id
          }
        }
      }
      line_routes {
        line {
          id
          geom
          types {
            type {
              name
            }
          }
          line_routes {
            route_id
          }
        }
      }
    }
  }
`;

export type PointTypes = 'shelter' | 'marker' | 'toilet' | 'seat' | 'stile';
export type LineTypes = 'walk' | 'bike' | 'shared';
export interface TrailGeometryQueryPoint {
  id: number;
  name: string;
  geom: any;
  types: {
    type: {
      name: PointTypes;
    };
  }[];
  point_routes: {
    route_id: number;
  };
}

export interface TrailGeometryQueryLine {
  id: number;
  geom: any;
  types: {
    type: {
      name: LineTypes;
    };
  }[];
  line_routes: {
    route_id: number;
  }[];
}

export interface TrailGeometryQueryData {
  routes_by_pk: {
    point_routes: {
      point: TrailGeometryQueryPoint;
    }[];
    line_routes: {
      line: TrailGeometryQueryLine;
    }[];
  };
}

export interface TrailGeometryQueryVars {
  trailId: number;
}
