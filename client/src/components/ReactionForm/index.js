import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setReactionBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  // First define a function for the mutation to be assigned to. The {error} object as initially undefined, it is given a value if an error occurs in the mutation.
  // It can there for be use to conditionally render error messages in the JSX
  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setReactionBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addReaction({
        variables: { thoughtId, reactionBody }
      });

      setReactionBody('');
      setCharacterCount(0);

    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div>
      <p className={`m-0`}>
        Character Count: {characterCount}/280
      </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Leave a reaction to this thought..."
          value={reactionBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      {error && <span className='ml-2'>Something went wrong...</span>}
    </div>
  );
};

export default ReactionForm;