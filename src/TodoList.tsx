import React from 'react';
import './App.css';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm';
import {connect} from 'react-redux';
import {
    ActionsType,
    addTaskTC,
    deleteTaskTC,
    deleteTodolistTC, getTasksTC,
    updateTaskTC, updateTitleTC,
} from './reducer';
import {ObjTaskType, TaskType} from './types';
import {ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './store';

type StateType = {
    filterValue: string
    // changeStatus: (id: string, status: number) => void
    // changeFilter: (newFilterValue: string) => void
    // id: string
    // title: string
    // changeTask: (id: string, param: ObjTaskType) => void
    // deleteTodolist: (id: string) => void
    // deleteTask: (id: string, idparam: string) => void
    // updateTodolistTitle: (id: string, idparam: string) => void
    //
    // updateTask: (taskId: string, id: string, task: TaskType, obj: any) => void
    // getTasks: (id: string) => void
    // addTask: (newTask: string, todolistId: string) => void


}

type OwnPropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    // updateTask: (taskId: string, id: string, task: TaskType, obj: any) => void
    // getTasks: (id: string) => void
    // addTask: (newTask: string, todolistId: string) => void
    // updateTodolistTitle: (id: string, propsId: string) => void
    // deleteTask: (id: string, propsId: string) => void
    // deleteTodolist: (id: string) => void
}
type MapDispatchPropsType = {
    addTask: (newTask: string, todolistId: string) => void
    updateTask: (taskId: string, todoId: string, task: TaskType, obj: any ) => void
    deleteTodolist: (todolistId: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    updateTodolistTitle: (title: string, todolistId: string) => void
    getTasks: (todolistId: string) => void
}

class TodoList extends React.Component<OwnPropsType & StateType & MapDispatchPropsType> {

    state: StateType = {
        filterValue: 'All'
    };

    componentDidMount() {
        this.props.getTasks(this.props.id);
    }

    addTask = (newText: string) => {
        this.props.addTask(newText, this.props.id)
    };

    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (taskId: string, obj: any, /*todolistId: string*/) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};
        this.props.updateTask(taskId, this.props.id, task, obj)
    };

    changeStatus = (taskId: string, status: string) => {
        this.changeTask(taskId, {status: status});
    };

    changeTitle = (taskId: string, title: string) => {
        this.changeTask(taskId, {title: title});
    };

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    };

    deleteTask = (taskId: string) => {
        this.props.deleteTask(this.props.id, taskId)
    };

    updateTitle = (title: string) => {
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
                                   if (this.state.filterValue === 'All') {
                                       return true;
                                   }
                                   if (this.state.filterValue === 'Active') {
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === 'Completed') {
                                       return t.status === 2;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>): MapDispatchPropsType => {
    return {
        addTask(newTask: string, todolistId: string) {
            const thunk = addTaskTC(newTask, todolistId)
            dispatch(thunk)
        },
        updateTask(taskId: string, todoId: string, task: TaskType, obj: any) {
            dispatch(updateTaskTC(taskId, todoId, task, obj))
        },
        deleteTodolist(todolistId: string) {
            dispatch(deleteTodolistTC(todolistId))
        },

        deleteTask(todolistId: string, taskId: string) {
            dispatch(deleteTaskTC(todolistId, taskId))
        },
        updateTodolistTitle: (title: string, todolistId: string) => {
            debugger
            dispatch(updateTitleTC(title, todolistId))

        },
        getTasks: (todolistId: string) => {
            const thunk = getTasksTC(todolistId)
            dispatch(thunk)
        },
    }
};

const ConnectedTodolist = connect<{}, MapDispatchPropsType, OwnPropsType, AppStateType>(null, mapDispatchToProps)(TodoList);
export default ConnectedTodolist;

