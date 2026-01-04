import TasksContainer from "./TasksContainer"

function Main() {
  return (
    <div className="flex-1 flex gap-4 px-4 ">
      <TasksContainer title={"TO DO"} color={`blue`}/>
      <TasksContainer title={"In Progress"} color={`gray`}/>
      <TasksContainer title={"In Review"} color={`red`}/>
      <TasksContainer title={"Completed"} color={`lime`}/>
    </div>
  )
}
export default Main