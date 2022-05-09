const { User, Thought } = require('../models');
// The object resolvers hold nested object Query that holds a series of methods.
// Methods get the same name of the query or mutation that they are resolvers for

// const resolvers = {
//     Query: {
//         helloWorld: () => {
//             return 'hello world!';
//         }
//     }
// };

// with no parameters
// const resolvers = {
//     Query: {
//         thoughts: async () => {
//             return Thought.find().sort({ createdAt: -1}) // this shot function returns the thought data in descending order
//         }
//     }
// };

// We pass in the 'parent as more of a placeholder parameter. It won't be used
// We need something in the first params spot so we can access the 'username' argument from the seconded parameter.
// A resolver can accept four arguments in the following order

// 1. parent: This is if we used nested resolvers to handle more complicated actions, as it would hold the reference to the resolver that executed the nested resolver function. We won't need this throughout the project, but we need to include it as the first argument.

// 2. args: This is an object of all of the values passed into a query or mutation request as parameters. In our case, we destructure the username parameter out to be used.

// 3. context: This will come into play later. If we were to need the same data to be accessible by all resolvers, such as a logged-in user's status or API access token, this data will come through this context parameter as an object.

// 4. info: This will contain extra information about an operation's current state. This isn't used as frequently, but it can be implemented for more advanced uses
const resolvers = {
    Query: {
        // get all thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {}; // ? is a Conditional (ternary) operator. condition ? exprIfTrue : exprIfFalse;
            return Thought.find(params).sort({ createdAt: -1 });
        },

        // get thougth by id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },

        // get a user by username
        user: async (perant, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        }
    }
}

module.exports = resolvers;