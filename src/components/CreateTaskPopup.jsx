import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask,fetchTasks } from "../api/tasks.api";

function CreateTaskPopup({ onClose,tasks,setTasks }) {
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
				status: "todo",
				assignedTo: {
					id: "u1",
					firstName: "Amit",
					lastName: "Sharma",
					email: "admin@example.com",
					role: "admin",
				},
				createdBy: user,
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
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 h-full">
				<input
					type="text"
					{...register("title")}
					placeholder="Title"
					className="text-5xl p-2 border-none rounded-sm focus:outline-none  "
				/>
				<textarea
					{...register("description")}
					placeholder="Description"
					className="flex-1 resize-none text-xl p-2 rounded-sm border-2 border-gray-300 align-top"
				/>
				<label>
					<input type="checkbox" {...register("important")} className="scale-130" />
					<span className="text-lg pl-4">Important</span>
				</label>
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
