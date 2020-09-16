import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';
import {connect} from 'react-redux';
import {ActionsType, addTodolistTC, setTodolistsTC} from './reducer';
import {TodoType} from './types';
import {AppStateType} from './store';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

type MapStatePropsType = {
    todolists: Array<TodoType>
}
type MapDispatchPropsType = {
    setTodolists: () => void
    addTodolist: (newTodolist: string) => void
}


class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTodolists();
    };

    addTodoList = (title: string) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.reducer.todolists
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>): MapDispatchPropsType => {
    return {
        setTodolists() {
            dispatch(setTodolistsTC())
        },
        addTodolist(newTodolist: string) {
            dispatch(addTodolistTC(newTodolist))
        }
    }
};

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
