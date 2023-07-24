
import React from 'react';
import { useState } from 'react';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css'
import { Itask } from '../types/taskInterface';
import Task from './Task';
import useTaskStore from '../hooks/useTaskStore';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

type FormElement = React.FormEvent<HTMLFormElement>
type TaskElement = React.ChangeEvent<HTMLInputElement>

const objTask: Itask = {
	id: '',
	title: '',
	description: '',
	image: '',
	startDate: '' ,
  	endDate: ''
}

function AddTask() {

	const { startTask, startEdit, startDelete } = useTaskStore()
	
	const tasks = useSelector((state: any) => state.task.tasks);

	const [newTask, setNewTask] = useState(objTask);
	const [newTasks, setNewTasks] = useState<Itask[]>([]);
	
	const [startDate, setStartDate] = useState<Date >(new Date());
	const [endDate, setEndDate] = useState<Date >(new Date());
	const [modal, setModal] = useState(true);
	const [isEdit, setIsEdit] = useState(false)
	const [editTask, setEditTask] = useState<Itask | null>(null)


	
	const onChange = (date: Date ) => {
		setStartDate(date);
		setEndDate(date);
	  };
	
	const handleTask = (e: TaskElement) => {
		setNewTask({
			...newTask,
			[e.target.name]: e.target.value,
		})
	};

	const addTask = () => {
		const id = uuidv4()
		const taskWithDates: Itask = {
			...newTask,
			id: id,
			startDate: startDate ? startDate.toISOString() : null,
      		endDate: endDate ? endDate.toISOString() : null
		  };
		  
		  setNewTasks([...newTasks, taskWithDates]);
		  //Envio el arreglo de la tarea agregada al Store
		  startTask(taskWithDates)
		  setNewTask(objTask);
		  setModal(false)
		  setStartDate(new Date());
		  setEndDate(new Date());
	}

	const handleSubmit = (e: FormElement) => {
		e.preventDefault()
		if (newTask.title.trim() !== '' && newTask.description.trim() !== '') {
			addTask()
		} else {
			alert('Los campos son obligatorios')
		}
	};

	const handleModal = () => {
		setModal(!modal)
		setNewTask(objTask);


	};

	const handleEdit = (task: Itask) => {
		setIsEdit(true)
		setEditTask(task)
		setNewTask({ ...task })
		setModal(true)
	}

	const handleUpdateTask  = (e: FormElement) => {
		e.preventDefault()
		if (editTask) {
			const updatedTask = {
			  ...editTask,
			  title: newTask.title,
			  description: newTask.description,
			  image: newTask.image,
			  startDate: startDate.toDateString(),
			  endDate: endDate.toDateString(),
			};
	  
			// Despacha la acción startEditTask con el objeto de tarea actualizado
			startEdit(updatedTask);
	  
			setIsEdit(false);
			setEditTask(null);
			setNewTask(objTask);
			setModal(false);
			setStartDate(new Date());
			setEndDate(new Date());
		  }
		};

	const deleteTask = (tasks:Itask) => {
		startDelete(tasks)
	}

  return (
    <>
     <div className='container sm: w-96  mx-auto sm:w-full  xl:w-4/12 bg-slate-100 flex items-center justify-center mt-3 ' >
		{
			modal && (

			<form className="md:grid grid-cols-1 gap-2 col-auto items-center mt-3"
				onSubmit={ isEdit ? handleUpdateTask : handleSubmit}
			>
				<div>
					<label 
						className='text-black font-bold uppercase block text-xl '>
						Title 
					</label>
					<input
						className='border w-96 p-3 mt-3 bg-gray-50 rounded-xl'
						type='text'
						placeholder='Title'
						name='title'
						onChange={handleTask}
						value={newTask.title}
					/>
				</div>
				
				<div>
					<label 
						className='text-black font-bold uppercase block text-xl '>
						Description 
					</label>
					<input
						className='border w-96 p-3 mt-3 bg-gray-50 rounded-xl'
						type='text'
						placeholder='Description'
						name='description'
						onChange={handleTask}
						value={newTask.description}
					/>

				</div>

				<div>
					<label 
						className='text-black font-bold uppercase block text-xl '>
						Image 
					</label>
					<input
						className='border w-96 p-3 mt-3 bg-gray-50 rounded-xl'
						type='text'
						placeholder='Insert a URL'
						name='image'
						onChange={handleTask}
						value={newTask.image}
					/>
				</div>

				<div className='mt-3' >
					<ReactDatePicker
						selected={startDate}
						onChange={onChange}
						minDate={new Date()}
						maxDate={null}
						startDate={startDate}
						endDate={endDate}
						selectsRange={false}
						inline
						// showDisabledMonthNavigation
						/>
				</div>
				
				<div className='button-container flex justify-stretch mt-3 mb-3'>
				<input
					disabled={newTask.title.trim() === '' || newTask.description.trim() === ''}
					type='submit'
					value={isEdit ? 'Update' : 'Save'} // Cambiar el texto del botón dependiendo de si estamos editando o creando una nueva tarea
					className={`rounded p-3 md:w-auto lg:w-48 ${
					newTask.title.trim() === '' || newTask.description.trim() === ''
						? 'bg-gray-600 text-white cursor-not-allowed'
						: 'bg-black text-white cursor-pointer'
					}`}
				/>

				<button 
						onClick={handleModal} 
						className='ml-3  bg-red-600 text-white rounded p-3 md:w-auto lg:w-48 hover:cursor-pointer '>
					Close
				</button>
				</div>
			</form>
			)
		}  

		{
			!modal && (
				<div className='bg-gray-100 text-center py-4 mt-3'>
					<button
						className='text-xl font-bold bg-slate-800 text-white p-3 rounded'
						onClick={handleModal}
					>
						Add New Task
					</button>
				
				</div>
        	)
		}
	</div>
	
	{ 
		tasks && tasks.map((task: Itask) => (
			
				<div key={task.id}  className='container mx-auto bg-slate-300 mt-3 sm:w-full xl:w-4/12'>
					<Task
						key={task.id}
						task={task}
						onEdit={() => handleEdit(task)}
						onDelete={() => deleteTask(task)}
					/>
				</div>
			
		))
	
	}

    </>
  );
}

export default AddTask;
