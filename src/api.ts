import axios from "axios";
import {TaskType, TodoType} from './types';

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    // меняем API-KEY на собственный
    headers: {"API-KEY": "9f30f44f-419b-4bf8-bd04-721891f6ba94"}
});

type TodolistsResponseType = {
    data: {
        items: TodoType
    }
}

type TaskResponseType = {

        items: Array<TaskType>

}

export const api = {
    getTodolists() {
        return instance.get<Array<TodoType>>("");
    },
    createTodolist(title: string) {
        return instance.post<TodolistsResponseType>("", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistsResponseType>(`/${todolistId}` )
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<TodolistsResponseType>(`/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<TaskResponseType>(`/${todolistId}/tasks`)
    },
    createTask(newTaskTitle: string, todolistId: string) {
        return instance.post<any>(`/${todolistId}/tasks`, {title: newTaskTitle});
    },
    updateTask(taskId: string, todolistId: string, task: TaskType) {
        return instance.put<any>(`/${todolistId}/tasks/${taskId}`,  task);
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<any>(`/${todolistId}/tasks/${taskId}`)
    }
};




