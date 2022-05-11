import React from 'react';
// import the useQuery hook form Apollo client. This will allow us to make request to the GraphQl server we connected to
import { useQuery } from '@apollo/client';
// import QUERY_THOUGHTS to use with the imported Hook functionality
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendsList';

const Home = () => {
  // use useQuery hook to make query request
  // Apollo's @apollo/client library provides a loading property to indicate that the request isn't done yet.
  // When we have the data returned from the server, it is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use object destructuring to extract 'data' from the 'useQuery' hook's response and rename it 'userData' to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || []; // '?.' is called optional chaining. It negates the need to check if an object even exist before accessing its properties
  // in this case, no data exist until the query is finished. If data exist store it in the thoughts constant
  // if data is undefined, save an empty arrary to the thoughts component.
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className='col-12 col-lg-3 mb-3'>
            <FriendList
            username={userData.me.username}
            friendCount={userData.me.friendCount}
            friends={userData.me.friends}
            />
            </div>
        ) : null }
      </div>
    </main>
  );
};

export default Home;
