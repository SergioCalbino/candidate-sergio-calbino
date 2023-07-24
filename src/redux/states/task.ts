import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Itask } from "../../types/taskInterface";

// const initialState = {
//     title: '',
//     description: '',
//     image: '',
//     startDate: null,
//     endDate: null
// }

// Define la interfaz para el estado de las tareas
interface TaskState {
    tasks: Itask[];
  }
  
  const initialState: TaskState = {
    tasks: [],
  };

const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}
const getLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: getLocalStorage('task') ? JSON.parse(getLocalStorage('task') as string) : initialState,
    reducers: {
        addNewTask: (state, action: PayloadAction<Itask>) => {
            setLocalStorage('task', state);
            const task = action.payload;
            state.tasks.push({
              ...task,
              startDate: task.startDate?.toString() || null,
              endDate: task.endDate?.toString() || null,
                
            })
            setLocalStorage("task", state);
        },
        startEditTask: (state, action: PayloadAction<Itask>) => {
            const { id, title, description, image, startDate, endDate } = action.payload;
            // console.log(action.payload)
            const taskIndex = state.tasks.findIndex((task:Itask) => task.id === id);
            if (taskIndex !== -1) {
              state.tasks[taskIndex] = {
                id,
                title,
                description,
                image,
                startDate,
                endDate,
              };
            }
            setLocalStorage('task', state)
          },
          startDeleteTask: (state, action) => {
            const deleteTaskId = action.payload.id;
            state.tasks = state.tasks.filter((task: Itask) => task.id !== deleteTaskId);
            setLocalStorage('task', state);
        },

    }
})

export const { addNewTask, startEditTask, startDeleteTask } = taskSlice.actions