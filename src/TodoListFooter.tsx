import React from 'react';
import '../src/App.css';
import Button from '@material-ui/core/Button';


type StateType = {
    isHidden: boolean
}

type OwnPropsType = {
    changeFilter: (newFilterValue: string) => void
    filterValue: string
}
    class TodoListFooter extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        isHidden: false
    };

    onAllFilterClick = () => { this.props.changeFilter("All"); };
    onCompletedFilterClick = () => { this.props.changeFilter("Completed"); };
    onActiveFilterClick = () => { this.props.changeFilter("Active"); };
    onShowFiltersClick = () => { this.setState({isHidden: true}) };
    onHideFiltersClick = () => { this.setState({isHidden: false}) }



    render = () => {

        return (
            <div className="todoList-footer">
                { !this.state.isHidden && <div>
                    <Button onClick={ this.onAllFilterClick } variant={this.props.filterValue === "All" ? "contained" : "text"} size="small" color="primary" >All</Button>
                    <Button onClick={ this.onCompletedFilterClick } variant={this.props.filterValue === "Completed" ? "contained" : "text"} size="small" color="secondary" >Completed</Button>
                    <Button onClick={ this.onActiveFilterClick } variant={this.props.filterValue === "Active" ? "contained" : "text"} size="small" color="inherit" >Active</Button>
                  </div>
                }
                { !this.state.isHidden && <Button onClick={ this.onShowFiltersClick } >hide</Button> }
                { this.state.isHidden && <Button onClick={ this.onHideFiltersClick }>show</Button> }
            </div>
        );
    }
}

export default TodoListFooter;


