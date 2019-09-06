import gql from 'graphql-tag';

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

export const ROUTE_MESSAGE_SUBSCRIPTION_QUERY = gql`
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

export const ROUTE_MESSAGE_INSERT_QUERY = gql`
  mutation($route: Int!, $user: Int!, $body: String) {
    insert_route_comment(
      objects: {
        route_id: $route
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

export interface ROUTE_MESSAGE_SUBSCRIPTION_QUERY_TYPES {
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

export const TRAIL_GEOMETRY_QUERY = gql`
  query TrailGeometryQuery($trailId: Int!) {
    routes_by_pk(id: $trailId) {
      point_routes {
        point {
          title
          id
          geom
          point_types {
            type {
              name
            }
          }
        }
      }
      line_routes {
        line {
          id
          geom
          line_types {
            type {
              name
            }
          }
          line_routes(
            where: { route: { typeByType: { name: { _eq: "stage" } } } }
          ) {
            route_id
          }
        }
      }
    }
  }
`;

export interface TrailGeometryQueryData {
  routes_by_pk: {
    point_routes: {
      point: {
        title: string;
        id: number;
        geom: any;
        point_types: {
          type: {
            name: string;
          };
        };
      };
    };
    line_routes: {
      line: {
        id: number;
        geom: any;
        line_types: {
          type: {
            name: 'walk' | 'bike' | 'shared';
          };
        }[];
        line_routes: {
          route_id: number;
        }[];
      };
    }[];
  };
}

export interface TrailGeometryQueryVars {
  trailId: number;
}
