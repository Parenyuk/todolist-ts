import React, {ChangeEvent, KeyboardEvent} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import TextField from '@material-ui/core/TextField';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { IconButton } from '@material-ui/core';


type StateType = {
    error: boolean
    title: string
}

type OwnPropsType = {
    addItem: (title: string) => void
}

type PropsType = OwnPropsType

class AddNewItemForm extends React.Component<PropsType, StateType> {

    state = {
        error: false,
        title: ''
    };

    onAddItemClick = () => {
        debugger
        let newText = this.state.title;
        this.setState({title: ''});

        if (newText === '') {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            // передаём новый текст наружу
            this.props.addItem(newText);
        }
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    };

    render = () => {
        return (
            <div className="todoList-newTaskForm" style={{padding: '10px'}}>
                <TextField
                    type="text"
                    onChange={this.onTitleChanged}
                    onKeyPress={this.onKeyPress}
                    value={this.state.title}
                    label="New item name" variant="outlined" size='small'
                    error={!!this.state.error}
                    helperText={ this.state.error && 'title is required'}
                />
                <IconButton onClick={this.onAddItemClick}  size="medium" color="primary"><AddRoundedIcon /></IconButton>
            </div>

        );
    }
}

export default AddNewItemForm;

