mutation ($route: Int!, $user: Int!, $body: String) {
  insert_route_comment(objects: {route_id: $route, comment: {data: {body: $body, user_id: $user}}}) {
    returning {
      comment {
        body
      }
    }
  }
}

{
  "route":10,
  "user":3,
  "body":"test"
}

subscription ($id:Int!) {
  routes_by_pk(id: $id) {
    route_comments {
      comment {
        user {
          firstname
          lastname
        }
        created_at
        body
      }
    }
  }
}

{
  "id": 10
}
