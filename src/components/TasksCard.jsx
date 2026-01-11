import { User } from "lucide-react";

function TasksCard({ task }) {
return (
		<div className="bg-white border border-gray-200 rounded-md p-4 hover:shadow-md hover:border-gray-400 cursor-pointer" draggable="true">
			<h2 className="text-xl text-wrap">{task.title}</h2>

			{task.important &&
					<div className='bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium inline-block'>
					#Important
				</div>}

			<p className="text-sm pt-2">
				{" "}
				Start: {new Date(task.startTime).toLocaleString()}
			</p>

			<div className="flex pt-2">
				<User className="border border-gray-300 rounded-full p-1 bg-gray-100" />

				<span className="pl-2 ">{task.assignedTo.firstName}</span>
			</div>
		</div>
	);
}
export default TasksCard;
