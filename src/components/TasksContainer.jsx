import TasksCard from "./TasksCard";

function TasksContainer({title, color}) {
	return (
		<div className={`mb-2 px-2 py-2 bg-${color}-100 border rounded-md border-gray-300 w-4/12 flex flex-col`}>
			<h1 className="pb-3 text-lg text-gray-700 ">{title}</h1>
      <div className="flex-1 overflow-y-auto">
        <TasksCard />
      </div>
		</div>
	);
}
export default TasksContainer;
