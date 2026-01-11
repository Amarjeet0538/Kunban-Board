import TasksContainer from "./TasksContainer";
import { useEffect, useState } from "react";
import { fetchTasks } from "../api/tasks.api";

function Main() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [tasks, setTasks] = useState([]);

	const user = JSON.parse(localStorage.getItem("user"));
	if (user === null) {
		return <div>Hero Section</div>;
	}

	useEffect(() => {
		const loadTasks = async () => {
			try {
				const allTasks = await fetchTasks();

				const visibleTasks =
					user.role === "admin"
						? allTasks
						: allTasks.filter((task) => {
								task.assignedTo === user.id;
						  });

				setTasks(visibleTasks);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		{
			user && loadTasks();
		}
	}, []);

	if (loading) return <p className="px-4">Loading tasks...</p>;
	if (error) return <p className="px-4 text-red-500">{error}</p>;

	return (
		<div className="flex-1 flex gap-4 px-4">
			<TasksContainer title="TO DO" status="todo" tasks={tasks} color="blue" />
			<TasksContainer
				title="IN PROGRESS"
				status="in_progress"
				tasks={tasks}
				color="gray"
			/>
			<TasksContainer
				title="IN REVIEW"
				status="in_review"
				tasks={tasks}
				color="red"
			/>
			<TasksContainer
				title="COMPLETED"
				status="completed"
				tasks={tasks}
				color="lime"
			/>
		</div>
	);
}
export default Main;
