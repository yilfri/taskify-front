import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import axiosClient from '../../config/axios';
import {
	TASKS_PROJECT,
	ADD_TASK,
	DELETE_TASK,
	VALIDATE_TASK,
	ACTUAL_TASK,
	UPDATE_TASK,
	CLEAN_TASK
} from '../../types';

const TaskState = (props) => {
	const initialState = {
		tasksproject: [],
		errortask: false,
		taskselected: null
	};

	// Reducer
	const [state, dispatch] = useReducer(TaskReducer, initialState);

	// Functions CRUD
	const getTasks = async (project) => {
		try {
			const response = await axiosClient.get('/api/tasks', { params: { project } });

			dispatch({
				type: TASKS_PROJECT,
				payload: response.data.tasks
			});
		} catch (error) {
			/* console.log(error); */
		}
	};

	const addTask = async (task) => {
		console.log(task);
		try {
			const response = await axiosClient.post('/api/tasks', task);
			console.log(response);

			dispatch({
				type: ADD_TASK,
				payload: task
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	const validateTask = () => {
		dispatch({
			type: VALIDATE_TASK
		});
	};

	const deleteTask = async (id, project) => {
		try {
			await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });
			dispatch({
				type: DELETE_TASK,
				payload: id
			});
		} catch (error) {
			console.log(error);
		}
	};

	const updateTask = async (task) => {
		try {
			const response = await axiosClient.put(`api/tasks/${task._id}`, task);

			dispatch({
				type: UPDATE_TASK,
				payload: response.data.task
			});
		} catch (error) {
			console.log(error);
		}
	};

	const saveActualTask = (task) => {
		dispatch({
			type: ACTUAL_TASK,
			payload: task
		});
	};

	const cleanTask = () => {
		dispatch({
			type: CLEAN_TASK
		});
	};
	return (
		<TaskContext.Provider
			value={{
				tasksproject: state.tasksproject,
				errortask: state.errortask,
				taskselected: state.taskselected,
				getTasks,
				addTask,
				validateTask,
				deleteTask,
				saveActualTask,
				updateTask,
				cleanTask
			}}
		>
			{props.children}
		</TaskContext.Provider>
	);
};

export default TaskState;
