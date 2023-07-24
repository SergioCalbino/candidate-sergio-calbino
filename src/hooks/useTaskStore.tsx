import { useDispatch } from 'react-redux';
import { Itask } from '../types/taskInterface';
import { addNewTask, startDeleteTask, startEditTask } from '../redux/states/task';
import { useSelector } from "react-redux";
import { AppSotre } from '../redux/store';

export const useTaskStore = () => {

    const dispatch = useDispatch();
    const tasks = useSelector((state: AppSotre) => state.task)

    const startTask = async (task: Itask) => {
        dispatch(addNewTask(task))
    };

    const startEdit = (task:Itask) => {
        dispatch(startEditTask(task))
    };

    const startDelete = (task: Itask) => {
        dispatch(startDeleteTask(task))
    }

    return {
        startTask,
        tasks,
        startEdit,
        startDelete
    }

}

export default useTaskStore