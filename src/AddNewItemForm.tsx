import React, {ChangeEvent, KeyboardEvent} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import TextField from '@material-ui/core/TextField';


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
        let classNameForInput = this.state.error ? 'error' : '';

        return (
            <div className="todoList-newTaskForm">
                <TextField
                    type="text"
                    onChange={this.onTitleChanged}
                    onKeyPress={this.onKeyPress}
                    value={this.state.title}
                    label="New item name" variant="outlined" size='small'
                    error={!!this.state.error}
                    helperText={'title is required'}
                />
                <Button onClick={this.onAddItemClick} variant="contained" size="medium" color="primary">Add</Button>
            </div>

        );
    }
}

export default AddNewItemForm;

