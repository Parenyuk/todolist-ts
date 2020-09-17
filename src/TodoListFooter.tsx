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
    onHideFiltersClick = () => { this.setState({isHidden: false}) };

    render = () => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div className="todoList-footer">
                { !this.state.isHidden && <div>
                     {/*<button onClick={ this.onAllFilterClick } className={classForAll}>All</button>*/}
                     {/*<button onClick={ this.onCompletedFilterClick } className={classForCompleted}>Completed</button>*/}
                     {/*<button onClick={ this.onActiveFilterClick } className={classForActive}>Active</button>*/}

                    <Button onClick={ this.onAllFilterClick } variant="contained" size="small"  className={classForAll}>All</Button>
                    <Button onClick={ this.onCompletedFilterClick } variant="contained" size="small" color="primary" className={classForCompleted}>Completed</Button>
                    <Button onClick={ this.onActiveFilterClick } variant="contained" size="small" color="primary" className={classForActive}>Active</Button>
                  </div>
                }
                { !this.state.isHidden && <span onClick={ this.onShowFiltersClick }>hide</span> }
                { this.state.isHidden && <span onClick={ this.onHideFiltersClick }>show</span> }
            </div>
        );
    }
}

export default TodoListFooter;

