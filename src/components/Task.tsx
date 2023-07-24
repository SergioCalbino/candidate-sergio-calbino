import React from 'react'
import { ItaskProps } from '../types/taskInterface'



const Task: React.FC<ItaskProps> = ({ task, onEdit, onDelete }: ItaskProps ) => {
	const startDate = task.startDate ? new Date(task.startDate) : null;
  	// const endDate = task.endDate ? new Date(task.endDate) : null;
  return (
    <>
    	<div className='w-96 mx-auto flex flex-col items-start'>
			<div className='flex justify-between w-full'>
				<div className='w-60'>
					<p className='text-left my-2'>Titulo: {task.title}</p>
					<p className='text-left my-2'>Descripcion: {task.description}</p>
					<p className='text-left my-2'> Date: {startDate ? startDate.toDateString() : ''}</p>
				</div>
				<div className='relative top-0'>
					<img src={task.image} alt={task.title} className='w-20 h-20' />
				</div>
			</div>

			<div className='flex mb-3'>
				<button
					onClick={onEdit} 
					className='self-start mr-2 bg-gray-600 text-white rounded p-3 md:w-auto lg:w-48 hover:cursor-pointer'>
					Edit
				</button>

				<button 
					onClick={onDelete}
					className='self-start bg-red-600 text-white rounded p-3 md:w-auto lg:w-48 hover:cursor-pointer'>
					Delete
				</button>
			</div>
      </div>
    </>
  )
}

export default Task