import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, fetchTasks } from "../api/tasks.api";

function CreateTaskPopup({ onClose, users, tasks, setTasks }) {

	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		document.addEventListener("keydown", handleEsc);
	}, [onClose]);

	const { register, handleSubmit } = useForm();
	const user = localStorage.getItem("user");

	const onSubmit = async (data) => {
		try {
			const task = await createTask({
				title: data.title,
				important: data.important,
				status: data.status,
				assignedTo: data.assignedUser,
				createdBy: JSON.parse(user).id,
				description: data.description,
			});
			const updatedTasks = await fetchTasks();
			setTasks(updatedTasks);

			onClose();
		} catch (err) {
			console.log(err, "Error in creating task ");
		}
	};

	return (
		<div className="bg-white w-250 h-150 rounded-md border border-gray-200 shadow-sm px-12 py-15 relative ">
			<X
				className="absolute top-5 right-5 cursor-pointer hover:text-red-500"
				size={30}
				onClick={() => {
					onClose();
				}}
			/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-3 h-full"
			>
				<input
					type="text"
					{...register("title")}
					placeholder="Title"
					className="text-5xl p-2 border-none rounded-sm focus:outline-none  "
				/>
				<textarea
					{...register("description")}
					placeholder="Description"
					className="flex-1 resize-none text-xl p-2 rounded-sm border-2 focus:outline-none  border-gray-300  align-top"
				/>
				<div className="flex justify-between">
					<label>
						<input
							type="checkbox"
							{...register("important")}
							className="scale-130"
						/>
						<span className="text-lg pl-4">Important</span>
					</label>

					<select {...register("status")} defaultValue="todo">
						<option value="todo">todo</option>
						<option value="in_progress">in_progress</option>
						<option value="in_review">in_review</option>
						<option value="completed">completed</option>
					</select>
				</div>
				<select {...register("assignedUser")} className="p-2 border rounded">
					<option value="">Assign to...</option>
					{Array.isArray(users) && users.map((u) => (
						<option key={u.id} value={u.id}>
							{u.firstName} {u.lastName}
						</option>
					))}
				</select>

				<button
					type="submit"
					className="w-full bg-violet-600 hover:bg-violet-800 text-white rounded-md py-2 cursor-pointer mt-3 text-lg"
				>
					Add Task
				</button>
			</form>
		</div>
	);
}

export default CreateTaskPopup;
