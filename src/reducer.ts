import {api} from "./api";
import {AppStateType, InferActionTypes} from './store';
import {TaskType, TodoType} from './types';
import {Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';



const initialState = {
    todolists: [] as Array<TodoType>
};


type InitialStateType = typeof initialState;


export const TodoListReducer = (state:InitialStateType  = initialState, action: ActionsType) => {
    switch (action.type) {
        case "TodoList/Reducer/SET_TASKS":
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
        case "TodoList/Reducer/SET_TODOLISTS":
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };
        case "TodoList/Reducer/ADD-TODOLIST":
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists]
            };
        case "TodoList/Reducer/DELETE-TODOLIST":
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };
        case "TodoList/Reducer/UPDATE_TODOLIST_TITLE":
            debugger;
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) return tl;
                    else return {...tl, title: action.title}
                })
            };
        case "TodoList/Reducer/DELETE-TASK":
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
        case "TodoList/Reducer/ADD-TASK":
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
        case "TodoList/Reducer/UPDATE-TASK":
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



// Action creators



//Actions for typing reducer with infer

const actions = {
     updateTaskAC: (taskId: string, obj:any, todolistId: string) => ({type:"TodoList/Reducer/UPDATE-TASK", taskId, obj, todolistId} as const),
 deleteTodolistAC: (todolistId: string) => ({type: "TodoList/Reducer/DELETE-TODOLIST", todolistId: todolistId} as const),
 deleteTaskAC: (todolistId: string, taskId: string) => ({type: "TodoList/Reducer/DELETE-TASK", todolistId, taskId} as const),
 updateTodolistTitleAC: (todolistId: string, title: string) => ({type: "TodoList/Reducer/UPDATE_TODOLIST_TITLE", todolistId, title} as const),
 addTaskAC: (newTask: TaskType, todolistId: string) => ({type: "TodoList/Reducer/ADD-TASK", newTask, todolistId} as const),
 setTasksAC: (tasks: Array<TaskType>, todolistId: string) => ({type: "TodoList/Reducer/SET_TASKS", tasks, todolistId} as const),
 addTodolistAC:(newTodolist: TodoType) => ({type: "TodoList/Reducer/ADD-TODOLIST", newTodolist: newTodolist} as const),
 setTodolistsAC: (todolists: Array<TodoType>) => ({type: "TodoList/Reducer/SET_TODOLISTS", todolists: todolists} as const)
}

type ActionsType = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;
//Redux Thunk


export const updateTaskTC = (taskId: string, todoId: string, task: TaskType, obj: any): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
   api.updateTask(taskId, todoId, task )
        .then(res => {
            dispatch(actions.updateTaskAC(taskId, obj, todoId))
        })
}
export const deleteTodolistTC = (todolistId: string): ThunkType => (dispatch:  ThunkDispatch<AppStateType, unknown, ActionsType>) => {
      api.deleteTodolist(todolistId)
        .then(res => {
            dispatch(actions.deleteTodolistAC(todolistId))
        });
}

export const addTaskTC = (newText: string, todolistId: string): ThunkType => (dispatch:  ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    api.createTask(newText, todolistId).then(res => {
        let newTask = res.data.data.item;
        dispatch(actions.addTaskAC(newTask, todolistId))
    });
}

export const updateTitleTC = (title: string, todolistId: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    debugger;
  api.updateTodolistTitle(todolistId, title)
        .then(res => {
            dispatch(actions.updateTodolistTitleAC( todolistId, title))
        });

}

export const deleteTaskTC = (todolistId: string, taskId: string): ThunkType => (dispatch:  ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    debugger
    api.deleteTask(taskId, todolistId)
        .then(res => {
            dispatch(actions.deleteTaskAC(todolistId, taskId))
        });
}


export const addTodolistTC = (title: string): ThunkType => (dispatch:  ThunkDispatch<AppStateType, unknown, ActionsType>) => {
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
export const getTasksTC = (todolistId: string): ThunkType =>  (dispatch:  ThunkDispatch<AppStateType, unknown, ActionsType>) => {
     api.getTasks(todolistId)
        .then(res => {
            let allTasks = res.data.items;
            dispatch(actions.setTasksAC(allTasks, todolistId))
        });
}
export const setTodolistsTC = (todolists: Array<TodoType>): ThunkType => (dispatch:  ThunkDispatch<AppStateType, unknown, ActionsType>) => {
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
