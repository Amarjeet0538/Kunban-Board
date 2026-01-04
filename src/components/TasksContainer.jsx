import TasksCard from "./TasksCard";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function TasksContainer({ title, color }) {
	const bgColors = {
		blue: "bg-blue-100 border-blue-300",
		gray: "bg-gray-100 border-gray-300",
		red: "bg-red-100 border-red-300",
		lime: "bg-lime-100 border-lime-300",
	};

	return (
		<div
			className={twMerge(
				"mb-2 px-2 py-2  border rounded-md border-gray-300 w-4/12 flex flex-col",
				bgColors[color]
			)}
		>
			<h1 className="pb-3 text-lg text-gray-700 ">{title}</h1>
			<div className="flex-1 overflow-y-auto">
				<TasksCard />
			</div>
		</div>
	);
}
export default TasksContainer;
