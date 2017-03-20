import {Todo} from './connectors';


const resolvers = {
    Query: {
        todo(root, args){
            return Todo.find({id: args.id});
        },
        todos(){
            return Todo.findAll();
        }
    },
    Mutation: {
        changeCompleted(_, {isCompleted, todoId}) {
            let insertDate = new Date();
            Todo.update({
                    isCompleted: isCompleted,
                    finishDate:insertDate.toLocaleString()
                }, {where: {id: todoId}}
            );
            return Todo.find({id: todoId});
        },
        changeCompletedAll(_, {isCompleted}){
            Todo.update({
                isCompleted: isCompleted
            }, {
                where: {
                    '$or': [
                        {'isCompleted': false},
                        {'isCompleted': true}
                    ]
                }
            });
            return Todo.findAll();
        },
        changeText(_, {todoId, changedText}){
            Todo.update({
                    todoText: changedText
                }, {where: {id: todoId}}
            );

            return Todo.find({id: todoId});
        },
        insertTodo(_, {newTest}){
            let insertDate = new Date();
            Todo.create({
                todoDate: insertDate.toLocaleString(),
                finishDate : "null",
                todoText: newTest,
                isCompleted: false,
            });

            return Todo.findAll();
        },
        deleteTodo(_, {todoId}){
            Todo.destroy({where: {id: todoId}});

            return Todo.findAll();
        },
    }

};


export default resolvers;