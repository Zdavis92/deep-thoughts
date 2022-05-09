// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// GraphQL accesses out api through queries and mutations.
// To define a query use the 'type Query{}' data type.
// Define different types of queries by naming them. We created a query named 'helloWorld'
// We also need to explicitly specify the type of data to be returned by the query, in this case 'String'

// const typeDefs = gql`
//     type Query {
//         helloWorld: String
//     }
// `;

// We are instructing our query to return an array by using '[]' around the returning data
// 'ID' essentially same as 'String' except that it looks for a unique identifier
// 'INT' sort for integer

// const typeDefs = gql`
// type Thought {
//     _id: ID
//     thoughtText: String
//     createdAt: String
//     username: String
//     reactionCount: Int
// }

// type Query {
//     thoughts: [Thought]
// }
// `;

// by adding () in the query it can now recieve parameter if we wanted
// in this case the parameter would be indentified as 'username' and would have a 'String' data type

// const typeDefs = gql`
// type Thought {
//     _id: ID
//     thoughtText: String
//     createdAt: String
//     username: String
//     reactionCount: Int
// }

// type Query {
//     thoughts(username: String): [Thought]
// }
// `;

// updatd our Thought type definition to include a nested array of reactions

// const typeDefs = gql`

//   type Thought {
//     _id: ID
//     thoughtText: String
//     createdAt: String
//     username: String
//     reactionCount: Int
//     reactions: [Reaction]
//   }

//   type Reaction {
//     _id: ID
//     reactionBody: String
//     createdAt: String
//     username: String
//   }

//   type Query {
//     thoughts(username: String): [Thought]
//   }
// `;

// create queries to retrieve a single thought by its _id value, all users, and a single user by their username.
// Adding the ! to the query param indicates that for that query to be carried out, the data must exist.
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;

// export the typeDefs
module.exports = typeDefs;