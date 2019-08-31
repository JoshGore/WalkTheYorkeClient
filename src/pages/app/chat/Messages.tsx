import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import Message from './Message';

const MESSAGE_SUBSCRIPTION_QUERY = gql`
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
}`;

const Messages: React.FC = () => (
  <>
    <Message
      fromUser={false}
      message="test message 1"
      user={{ firstName: 'Brian', lastName: 'Cumin' }}
    />
    <Message
      fromUser
      message="test message 2 from me"
      user={{ firstName: 'Archibald', lastName: 'Northbottom' }}
    />
    <Message
      fromUser={false}
      user={{ firstName: 'Hans', lastName: 'Down' }}
      message="Molestie a iaculis at erat pellentesque adipiscing commodo elit. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et."
    />
    <Message
      fromUser
      user={{ firstName: 'Archibald', lastName: 'Northbottom' }}
      message="Arcu vitae elementum curabitur vitae nunc. Nunc sed id semper risus in hendrerit gravida rutrum. Id venenatis a condimentum vitae. Neque ornare aenean euismod elementum. Habitant morbi tristique senectus et netus et malesuada. Senectus et netus et malesuada fames ac turpis egestas maecenas. Luctus venenatis lectus magna fringilla urna."
    />
  </>
);

export default Messages;
