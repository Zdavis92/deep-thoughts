import React from 'react';
// import the useQuery hook form Apollo client. This will allow us to make request to the GraphQl server we connected to
import { useQuery } from '@apollo/client';
// import QUERY_THOUGHTS to use with the imported Hook functionality
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request
  // Apollo's @apollo/client library provides a loading property to indicate that the request isn't done yet.
  // When we have the data returned from the server, it is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const thoughts = data?.thoughts || []; // '?.' is called optional chaining. It negates the need to check if an object even exist before accessing its properties
  // in this case, no data exist until the query is finished. If data exist store it in the thoughts constant
  // if data is undefined, save an empty arrary to the thoughts component.
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
