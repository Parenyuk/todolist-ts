import React, {ChangeEvent} from 'react';
import './App.css';
import {ObjTaskType, TaskType} from './types';
import {IconButton, FormControlLabel, Checkbox, TextField} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

type StateType = {
    editMode: boolean
    title: string


}
type OwnPropsType = {
    changeStatus: (taskId: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    deleteTask: (id: string) => void
    task: TaskType

}
type PropsType = OwnPropsType
class TodoListTask extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status);
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value});
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode= () => {
        this.props.changeTitle(this.props.task.id, this.state.title);
        this.setState({editMode: false});
    };
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };
    render = () => {
        let containerCssClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";
        let priorityTitle = "";
        switch (this.props.task.priority) {
            case 0: priorityTitle = "Low"; break;
            case 1: priorityTitle = "Middle"; break;
            case 2: priorityTitle = "High"; break;
            case 3: priorityTitle = "Urgently"; break;
            case 4: priorityTitle = "Later"; break;
        }
        return (
                <div className={containerCssClass}>
                            <Checkbox
                                checked={this.props.task.status === 2}
                                onChange={this.onIsDoneChanged}
                                name="checkedB"
                                color="primary"
                                size='small'
                            />
                    { this.state.editMode
                        // ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                        //          value={this.state.title} />
                        // : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                   ? <TextField
                        type="text"
                        onBlur={this.deactivateEditMode}
                        onChange={this.onTitleChanged}
                        autoFocus={true}
                        value={this.state.title}
                        label="New item name" variant="outlined" size='small'
                        />
                    :     <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                    }, priority: {priorityTitle}
                    <IconButton aria-label="delete"  size="small"  onClick={this.onDeleteTask} >
                        <DeleteIcon fontSize="small"> </DeleteIcon>
                    </IconButton>
                </div>
        );
    }
}

export default TodoListTask;

