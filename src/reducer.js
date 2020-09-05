import {api} from "./api";

export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const UPDATE_TODOLIST_TITLE = "TodoList/Reducer/UPDATE_TODOLIST_TITLE";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET_TODOLISTS";




const initialState = {
    todolists: []
};





const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            };
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists]
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };
        case UPDATE_TODOLIST_TITLE:
            debugger;
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) return tl;
                    else return {...tl, title: action.title}
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            };
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [action.newTask, ...tl.tasks]}
                    } else {
                        return tl
                    }
                })
            };
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            };

        default:
            return state
    }
};

export default reducer;

// Action creators

// export const updateTaskAC = (taskId, obj, todolistId) => ({type: UPDATE_TASK, taskId, obj, todolistId});
// export const deleteTodolistAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId: todolistId});
// export const deleteTaskAC = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
// export const updateTodolistTitleAC = (todolistId, title) => ({type: UPDATE_TODOLIST_TITLE, todolistId, title});
// export const addTaskAC = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId});
// export const setTasksAC = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
// export const addTodolistAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist: newTodolist});
// export const setTodolistsAC = (todolists) => ({type: SET_TODOLISTS, todolists: todolists});

//Actions for typing reducer with infer

const actions = {
     updateTaskAC: (taskId, obj, todolistId) => ({type: UPDATE_TASK, taskId, obj, todolistId}),
 deleteTodolistAC: (todolistId) => ({type: DELETE_TODOLIST, todolistId: todolistId}),
 deleteTaskAC: (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId}),
 updateTodolistTitleAC: (todolistId, title) => ({type: UPDATE_TODOLIST_TITLE, todolistId, title}),
 addTaskAC: (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId}),
 setTasksAC: (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId}),
 addTodolistAC:(newTodolist) => ({type: ADD_TODOLIST, newTodolist: newTodolist}),
 setTodolistsAC: (todolists) => ({type: SET_TODOLISTS, todolists: todolists})
}


//Redux Thunk


export const updateTaskTC = (taskId, todoId, task, obj) => (dispatch) => {
   api.updateTask(taskId, todoId, task )
        .then(res => {
            dispatch(actions.updateTaskAC(taskId, obj, todoId))
        })
}
export const deleteTodolistTC = (todolistId) => (dispatch) => {
      api.deleteTodolist(todolistId)
        .then(res => {
            dispatch(actions.deleteTodolistAC(todolistId))
        });
}

export const addTaskTC = (newText, todolistId) => (dispatch, getState) => {
    api.createTask(newText, todolistId).then(res => {
        let newTask = res.data.data.item;
        // dispatch(addTaskAC(newTask, todolistId))
        dispatch(actions.addTaskAC(newTask, todolistId))
    });
}

export const updateTitleTC = (title, todolistId) => (dispatch) => {
    debugger;
  api.updateTodolistTitle(todolistId, title)
        .then(res => {
            dispatch(actions.updateTodolistTitleAC( todolistId, title))
        });

}

export const deleteTaskTC = (todolistId, taskId) => (dispatch) => {
    debugger
    api.deleteTask(taskId, todolistId)
        .then(res => {
            dispatch(actions.deleteTaskAC(todolistId, taskId))
        });
}


export const addTodolistTC = (title) => (dispatch) => {
    api.createTodolist(title)
        .then(res => {
            dispatch(actions.addTodolistAC(res.data.data.item))
        });

}

// export const setTasksTC = (todolistId) => (dispatch) => {
//     debugger
//     return  api.getTasks(todolistId)
//         .then(res => {
//             let allTasks = res.data.items;
//             dispatch(allTasks, todolistId)
//
//         });
// }
export const getTasksTC = (todolistId) => (dispatch, getState) => {
     api.getTasks(todolistId)
        .then(res => {
            let allTasks = res.data.items;
            dispatch(actions.setTasksAC(allTasks, todolistId))
        });
}
export const setTodolistsTC = (todolists) => (dispatch) => {
       api.getTodolists().then(res => {
        dispatch(actions.setTodolistsAC(res.data))
       });
}


// export const addTaskTC = (newText, todolistId) => {
//     return (dispatch) => {
//         api.createTask(newText, todolistId).then(res => {
//             let newTask = res.data.data.item;
//             dispatch(addTaskAC(newTask, todolistId))
//         });
//     }
// }
