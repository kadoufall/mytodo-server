const schema = `

type Todo {
    id : Int!
    todoDate : String
    finishDate : String
    todoText : String
    isCompleted : Boolean
}

# the schema allows the following query:
type Query {
  todos: [Todo]
  todo(id: Int!): Todo
}

# this schema allows the following mutation:
type Mutation {
  insertTodo(
    newTest : String!
  ):[Todo]
  
  deleteTodo(
    todoId: Int!
  ):[Todo]
  
  changeCompleted (
    isCompleted : Boolean!
    todoId: Int!
  ): Todo
  
  changeCompletedAll (
    isCompleted : Boolean!
  ):[Todo]
  
  changeText (
    todoId: Int!
    changedText : String!
  ): Todo
}

schema {
  query: Query
  mutation: Mutation
}

`;

export default [schema];
