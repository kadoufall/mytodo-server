import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('todos', null, null, {
    dialect: 'sqlite',
    storage: './todos.sqlite',
});

const TodoModel = db.define('todo', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,},
    todoDate: {type: Sequelize.STRING},
    finishDate: {type: Sequelize.STRING},
    todoText: {type: Sequelize.STRING},
    isCompleted: {type: Sequelize.BOOLEAN},
});

casual.seed(123);
db.sync({force: true}).then(() => {
    _.times(10, () => {
        let tem = new Date();
        return TodoModel.create({
            todoDate: tem.toLocaleString(),
            finishDate: "null",
            todoText: casual.text,
            isCompleted: false,
        });
    });
});

const Todo = db.models.todo;

export {Todo};