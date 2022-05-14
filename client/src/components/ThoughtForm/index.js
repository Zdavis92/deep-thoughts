import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

const ThoughtForm = () => {
    const [thoughtText, setThoughtText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        // this update is done so that new thoughts can be renderd without a new request to the server.
        update(cache, { data: { addThought } }) { // addThought represents the new thought that was just created
            // could potentially not exist yet, so wrap in a try/catch
            try {
                // update me array's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
                });
            } catch (e) {
                console.warn('First thought insertion by user!')
            }
            try {
                // read what's currently in the QUERY_THOUGHTS cache
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
    
                // prepend the newest thought to the front of the array
                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: { thoughts: [addThought, ...thoughts] }
                });
            } catch (e) {
                console.log(e);
            }
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setThoughtText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add thougth to database
            await addThought({
                variables: { thoughtText }
            });

            // clear form value
            setThoughtText('');
            setCharacterCount(0);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new thought..."
                    value={thoughtText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ThoughtForm;