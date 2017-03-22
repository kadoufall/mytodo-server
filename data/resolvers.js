import {Todo,db} from './connectors';

const resolvers = {
    Query: {
        todo(root, args){
            return Todo.findOne({
                where:{
                    id : args.id
                }
            });
        },
        todos(){
            return Todo.findAll();
        }
    },
    Mutation: {
        changeCompleted(_, {isCompleted, todoId}) {
            const results = Todo.findOne({
                attributes: [[db.fn('MAX', db.col('id')), 'max_id']],
                where:{
                    isCompleted : false
                }

            }).then(function (result) {
                let max_id = result.get("max_id");
                //console.log("here "+todoId+"--"+max_id);
                if(todoId != max_id){
                    return Todo.findOne({
                        where:{
                            id : todoId
                        }
                    });
                }else{
                    let insertDate = new Date();
                    Todo.update({
                            isCompleted: isCompleted,
                            finishDate:insertDate.toLocaleString()
                        }, {where: {id: todoId}}
                    );
                    return Todo.findOne({
                        where:{
                            id : todoId
                        }
                    });
                }
            });

            return results;
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

            return Todo.findOne({
                where:{
                    id : todoId
                }
            });
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

export default resolvers