import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import { addTodolistTC, setTodolistsTC} from "./reducer";


class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTodolists();
        // api.getTodolists().then(res => {
        //     this.props.setTodolists(res.data);
        // });
    };

    addTodoList = (title) => {
        this.props.addTodolist(title)

    };

    render = () => {
        const todolists = this.props.todolists.map(tl => {
            return <TodoList key={tl.id}
                             id={tl.id}
                             title={tl.title}
                             tasks={tl.tasks}/>
        });

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.reducer.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        setTodolists(todolists) {
            dispatch(setTodolistsTC(todolists))
        },
        addTodolist(newTodolist) {
            dispatch(addTodolistTC(newTodolist))
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
