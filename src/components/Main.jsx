import TasksContainer from "./TasksContainer";
import { useEffect, useState } from "react";
import { fetchTasks,updateTasks } from "../api/tasks.api";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import TasksCard from "./TasksCard"; // Import Card for Overlay


function Main() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [tasks, setTasks] = useState([]);
	const [activeTask,setActiveTask] = useState(null);

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
								task.assignedTo?.id === user.id;
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

	const handleDragStart = (e) => {
		const task = tasks?.find((t) => t.id === e.active.id)
		console.log(activeTask)
		setActiveTask(task)
	}

	const handleDragEnd = async (e) => {
    const { active, over } = e;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const draggedTask = tasks[taskIndex];

    if (draggedTask.status !== newStatus) {
      const previousTasks = [...tasks];
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...draggedTask, status: newStatus };
      setTasks(updatedTasks);

      setActiveTask(null);

      try {
        await updateTasks(taskId, { status: newStatus });
        console.log("Task updated successfully on server");
      } catch (err) {
        console.error("API Error:", err);
        setTasks(previousTasks);
      }
    } else {
       setActiveTask(null);
    }
  };

	return (
		<div className="pb-4 flex gap-4 px-4 h-[calc(100vh-6rem)]">
			<DndContext collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}>
			<TasksContainer
			 title="TO DO"
			 status="todo"
			 tasks={tasks}
			 setTasks = {setTasks}
			 color="blue" />
			<TasksContainer
				title="IN PROGRESS"
				status="in_progress"
				tasks={tasks}
				setTasks = {setTasks}
				color="gray"
			/>
			<TasksContainer
				title="IN REVIEW"
				status="in_review"
				setTasks = {setTasks}
				tasks={tasks}
				color="red"
			/>
			<TasksContainer
				title="COMPLETED"
				status="completed"
				tasks={tasks}
				setTasks = {setTasks}
				color="lime"
			/>
			<DragOverlay>
				{activeTask? <TasksCard task={activeTask} isOverlay /> : null}
			</DragOverlay>
		</DndContext>
		</div>
	);
}
export default Main;
