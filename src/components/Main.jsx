import TasksContainer from "./TasksContainer";
import { useEffect, useState } from "react";
import { fetchTasks, updateTasks } from "../api/tasks.api";

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
						:allTasks.filter((task) => task.assignedTo?.id === user.id);

				setTasks(visibleTasks);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		if (user) loadTasks();
	}, []);

	const handleDropTask = async(taskId, newStatus) => {
		setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task
    )
  );

	try {
    await updateTasks(taskId, { status: newStatus });
  } catch (err) {
    console.error("Failed to persist task move:", err);
  }
	}

	if (loading) return <p className="px-4">Loading tasks...</p>;
	if (error) return <p className="px-4 text-red-500">{error}</p>;

	return (
		<div className="pb-4 flex gap-4 px-4 h-[calc(100vh-6rem)]"

		>
				<TasksContainer
					title="TO DO"
					status="todo"
					tasks={tasks}
					setTasks={setTasks}
					onDropTask={handleDropTask}
					color="blue"
				/>
				<TasksContainer
					title="IN PROGRESS"
					status="in_progress"
					tasks={tasks}
					setTasks={setTasks}
					onDropTask={handleDropTask}
					color="gray"
				/>
				<TasksContainer
					title="IN REVIEW"
					status="in_review"
					setTasks={setTasks}
					tasks={tasks}
					onDropTask={handleDropTask}
					color="red"
				/>
				<TasksContainer
					title="COMPLETED"
					status="completed"
					tasks={tasks}
					setTasks={setTasks}
					onDropTask={handleDropTask}
					color="lime"
				/>

		</div>
	);
}

export default Main;
