module.exports = `

type User {
  _id: String!
  name: String!
  email: String!
  password: String!
  posts: [Post!]!
}

type RootQuery {
  user(_id: ID!): User!
  users: [User!]!
}

type RootMutation {
  createUser(user:CreateUserInput): User!
  loginUser(email: String!, password: String!): User!
}

input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

input LoginUserInput {
  email: String!
  password: String!
}

type RootSubscription {
  user: User!
}

schema {
  query: RootQuery
  mutation: RootMutation
  subscription: RootSubscription
}

`