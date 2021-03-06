import React, { useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
	// Getting form state.
	const projectsContext = useContext(projectContext);

	const { form, errorform, showForm, addProject, showError } = projectsContext;

	// Create state
	const [project, setProject] = useState({
		name: ''
	});

	// Destructuring state value.
	const { name } = project;

	// Handle Event
	const handleChange = (e) => {
		setProject({
			...project,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate project.
		if (name.trim() === '') {
			showError(true);
			return;
		}

		// Add to state.
		addProject(project);

		// Form reset.
		setProject({
			name: ''
		});
	};

	const handleClick = () => {
		showForm(true);
	};
	return (
		<>
			<button type="button" className="btn btn-block btn-primario" onClick={handleClick}>
				New Project
			</button>

			{form ? (
				<form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						className="input-text"
						value={name}
						placeholder="Project Name"
						onChange={handleChange}
					/>

					<input type="submit" value="Add Project" className="btn btn-primario btn-block" />
				</form>
			) : null}

			{errorform ? <p className="mensaje error">Project Name Required</p> : null}
		</>
	);
};

export default NewProject;
