import { Plus } from "lucide-react";
import TasksCard from "./TasksCard";
import { useState } from "react";
import { deleteTasks } from "../api/tasks.api";
import CreateTaskPopup  from "./CreateTaskPopup";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableTask = ({ task, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1, 
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <TasksCard task={task} handleDelete={handleDelete} />
    </div>
  );
};


function TasksContainer({ title, status, setTasks, tasks, color }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const { setNodeRef } = useDroppable({
    id: status,
  });

	const bgColorMap = {
		blue: "bg-blue-100 border-blue-300",
		gray: "bg-gray-100 border-gray-300",
		red: "bg-red-100 border-red-300",
		lime: "bg-lime-100 border-lime-300",
	};

	const filteredTasks = tasks.filter((task) => task.status === status);
	const user = JSON.parse(localStorage.getItem("user"));

	const handleDelete = async (taskId) => {
		try {
			await deleteTasks(taskId);
			setTasks(tasks.filter((task) => task.id !== taskId));
		} catch (err) {
			console.error("Failed to delete task:", err);
		}
	};

	return (
		<div
			ref={setNodeRef}
			className={`relative w-4/12 px-2 py-2 rounded-md border flex flex-col  ${bgColorMap[color]}`}
		>
			<h1 className="pb-3 text-lg font-semibold text-gray-700">{title}</h1>
			<div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
				{filteredTasks.length === 0 ? (
					<p className="text-sm text-gray-500 text-center">No tasks</p>
				) : (
					filteredTasks.map((task) => (
						<DraggableTask key={task.id} task={task} handleDelete={handleDelete} />
					))
				)}

				{user.role === "admin" && title === "TO DO" && (
					<div
						className="flex gap-2 items-center justify-center  border rounded-md p-2 bg-white text-black border-gray-300 cursor-pointer "
						onClick={() => {setIsPopupOpen(!isPopupOpen)}}
					>
						<Plus size={25} />
						Create
					</div>
				)}

			</div>
      {isPopupOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs ">
           <CreateTaskPopup onClose={() => setIsPopupOpen(false)} tasks={tasks} setTasks={setTasks} />
        </div>}
		</div>
	);
}

export default TasksContainer;
