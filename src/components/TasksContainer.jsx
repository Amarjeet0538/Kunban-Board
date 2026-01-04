import TasksCard from "./TasksCard";

function TasksContainer({ title, status, tasks, color }) {
  const bgColorMap = {
    blue: "bg-blue-100 border-blue-300",
    gray: "bg-gray-100 border-gray-300",
    red: "bg-red-100 border-red-300",
    lime: "bg-lime-100 border-lime-300",
  };

  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  return (
    <div
      className={`w-4/12 px-2 py-2 rounded-md border flex flex-col ${bgColorMap[color]}`}
    >
      <h1 className="pb-3 text-lg font-semibold text-gray-700">
        {title}
      </h1>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3">
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No tasks
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TasksCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}

export default TasksContainer;
