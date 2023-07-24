import { configureStore } from "@reduxjs/toolkit";
import { Itask } from "../types/taskInterface";
import { taskSlice } from "./states/task";

export interface AppSotre {
    task: Itask
}

export default configureStore<AppSotre>({
    reducer: {
        task: taskSlice.reducer
    }
})