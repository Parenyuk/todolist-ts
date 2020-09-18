import React, {ChangeEvent} from 'react';
import './App.css';
import {TextField} from '@material-ui/core';

type StateType = {
    title: string
    editMode: boolean
}

type OwnPropsType = {
    title: string
    updateTitle: (title: string) => void
}

class TodoListTitle extends React.Component<OwnPropsType, StateType> {

    state = {
        editMode: false,
        title: this.props.title
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateTitle(this.state.title);
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    render = () => {
        return (
            <>
                {
                    this.state.editMode
                        ? <TextField value={this.state.title}
                                     autoFocus={true}
                                     onBlur={this.deactivateEditMode}
                                     onChange={this.onTitleChanged}
                                     label="New item name" variant="outlined" size='small'

                        />
                        : <h3 className="todoList-header__title" onClick={this.activateEditMode}>{this.props.title}</h3>
                }
            </>
        );
    }
}

export default TodoListTitle;

