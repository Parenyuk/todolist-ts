import axios from "axios";
import {TaskType, TodoType} from './types';

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    // меняем API-KEY на собственный
    headers: {"API-KEY": "9f30f44f-419b-4bf8-bd04-721891f6ba94"}
});


type TaskResponseType = {
        items: Array<TaskType>
}



type TodoResponseType<T> = {
    data: {
        item: T
    }
}

export const api = {
    getTodolists() {
        return instance.get<Array<TodoType>>("");
    },
    createTodolist(title: string) {
        return instance.post<TodoResponseType<TodoType>>("", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodoResponseType<TodoType>>(`/${todolistId}` )
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<TodoResponseType<TodoType>>(`/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<TaskResponseType>(`/${todolistId}/tasks`)
    },
    createTask(newTaskTitle: string, todolistId: string) {
        return instance.post<TodoResponseType<TaskType>>(`/${todolistId}/tasks`, {title: newTaskTitle});
    },
    updateTask(taskId: string, todolistId: string, task: TaskType) {
        return instance.put<TodoResponseType<TaskType>>(`/${todolistId}/tasks/${taskId}`,  task);
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<TodoResponseType<TaskType>>(`/${todolistId}/tasks/${taskId}`)
    }
};




