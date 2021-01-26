module.exports = `

type Post {
  _id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  date: Dates
}

type Dates {
  published: String
  updated: String
}

type RootQuery {
  post(_id: ID!): Post!
  posts: [Post!]!
}

type RootMutation {
  createPost(post: CreatePostInput): Post!
}

type RootSubscription {
  post: PostSubscriptionPayload!
}

type PostSubscriptionPayload {
  mutation: MutationType!
  post: Post!
}

input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
  author: ID!
  date: DatesInput
}

input DatesInput {
  published: String
  updated: String
}

enum MutationType {
  CREATED
  DELETED
  UPDATED
}

schema {
  query: RootQuery
  mutation: RootMutation
  subscription: RootSubscription
}

`