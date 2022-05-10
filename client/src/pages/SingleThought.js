import React from 'react';
// the 'useParams' function allows us to destructure the params form the url
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  // gets the param id from the url and saves it to the variable 'thoughtId'
  const { id: thoughtId } = useParams();
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: {id: thoughtId} // This sets the thoughtId to the id argument to be passed in the query
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
