import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";
import {ObjTaskType, TaskType} from './types';

type OwnPropsType = {
    changeStatus: (taskId: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    deleteTask: (id: string) => void
    tasks: Array<TaskType>

}

class TodoListTasks extends React.Component<OwnPropsType> {
    render = () => {

        let tasksElements = this.props.tasks.map(task => {
            return <TodoListTask task={task}
                                 key={task.id}
                                 changeStatus={this.props.changeStatus}
                                 changeTitle={this.props.changeTitle}
                                 deleteTask={this.props.deleteTask}
            />
        });

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

