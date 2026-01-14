import { User } from "lucide-react";
import VisualIndicator from "./VisualIndicator";
import { X } from "lucide-react";
import { useState } from "react";

function TasksCard({ task, handleDelete }) {
	const [isMouseOver, setIsMouseOver] = useState(false);

	return (
		<>
			<div
				className="bg-white border border-gray-200 rounded-md p-4 hover:shadow-md hover:border-gray-400 cursor-pointer relative "
				draggable="true"
				onMouseEnter={() => {
					setIsMouseOver(true);
				}}
				onMouseLeave={() => {
					setIsMouseOver(false);
				}}
			>
				{isMouseOver && (
					<button className="absolute right-2 top-2 hover:bg-red-300 rounded-md cursor-pointer p-1 ">
						<X
							size={25}
							onClick={() => {
								handleDelete(task.id);
							}}
						/>
					</button>
				)}

				<h2 className="text-xl text-wrap">{task.title}</h2>

				{task.important && (
					<div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium inline-block">
						#Important
					</div>
				)}

				<p className="text-sm pt-2">
					{" "}
					Start: {new Date(task.startTime).toLocaleString()}
				</p>

				<div className="flex pt-2">
					<User className="border border-gray-300 rounded-full p-1 bg-gray-100" />

					<span className="pl-2 ">{task.assignedTo.firstName}</span>
				</div>
			</div>
			<VisualIndicator />
			<div />
		</>
	);
}
export default TasksCard;
