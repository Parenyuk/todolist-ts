import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskTC,
     deleteTaskTC,
    deleteTodolistTC, getTasksTC,
     updateTaskTC, updateTitleTC,
} from "./reducer";
import {api} from "./api";

class TodoList extends React.Component {

    state = {
        filterValue: "All"
    };

    componentDidMount() {
        this.props.getTasks(this.props.id);
    }

    // restoreState = () => {
    //     debugger
    //     this.props.setTasks(allTasks, this.props.id)
    //     // api.getTasks(this.props.id)
    //     //     .then(res => {
    //     //         let allTasks = res.data.items;
    //     //         this.props.setTasks(allTasks, this.props.id);
    //     //     });
    // };

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)
        // api.createTask(newText, this.props.id).then(res => {
        //     let newTask = res.data.data.item;
        //     this.props.addTask(newTask, this.props.id);
        // });
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (taskId, obj,  todolistId) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};
        this.props.updateTask(taskId, this.props.id, task, obj)
        // api.updateTask(taskId, this.props.id, task)
        //     .then(res => {
        //         this.props.updateTask(taskId, obj, this.props.id)
        //     })
    };

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
        // api.deleteTodolist(this.props.id)
        //     .then(res => {
        //         this.props.deleteTodolist(this.props.id);
        //     });
    };

    deleteTask = (taskId) => {
        debugger
        this.props.deleteTask(this.props.id, taskId)
    };

    updateTitle = (title) => {
        debugger
        this.props.updateTodolistTitle(title, this.props.id)
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <div className="wrapper">
                        <TodoListTitle title={this.props.title} updateTitle={this.updateTitle}/>
                        <button onClick={this.deleteTodolist}>X</button>
                    </div>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.status === 2;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        addTask(newTask, todolistId) {
            const thunk = addTaskTC(newTask, todolistId)
            dispatch(thunk)

        },
        updateTask(taskId, todoId, task, obj) {
            dispatch(updateTaskTC(taskId, todoId, task, obj))
        },


        deleteTodolist(todolistId)  {
            dispatch(deleteTodolistTC(todolistId))
         },

        deleteTask(todolistId, taskId) {
           dispatch(deleteTaskTC(todolistId, taskId))
    },

        updateTodolistTitle: ( title, todolistId) => {
            debugger
            dispatch(updateTitleTC(title, todolistId))

        },
        getTasks: (todolistId) => {
            const thunk = getTasksTC(todolistId)
            dispatch(thunk)
        },
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodolist;

