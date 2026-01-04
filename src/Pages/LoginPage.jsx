import { useForm } from "react-hook-form";
import { useState } from "react";
import { onSubmit } from "../utils/loginFunctions";

function LoginPage() {
	const { register, handleSubmit } = useForm();
	const [isSignup, setIsSignup] = useState(false);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className=" rounded-xl bg-gray-100 p-4 text-gray-600 shadow-xs">
				<h2 className="text-center text-4xl font-semibold">
					{isSignup ? "Create an account" : "Sign In"}
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mt-6 flex flex-col gap-4"
				>
					{isSignup && (
						<div className="flex w-full gap-2">
							<input
								{...register("text")}
								type="text"
								placeholder="First Name"
								required
								className="flex-1 rounded-md border border-gray-700 bg-white text-black px-4 py-3"
							/>
							<input
								{...register("text")}
								type="text"
								placeholder="Last Name"
								required
								className="flex-1 rounded-md border border-gray-700 bg-white text-black px-4 py-3"
							/>
						</div>
					)}

					<select
						{...register("category", { required: true })}
						className="rounded-md border border-gray-700 bg-white text-black px-4 py-3"
					>
						<option value="">Select...</option>
						<option value="A">Admin</option>
						<option value="B">Clients</option>
					</select>

					<input
						{...register("email")}
						type="email"
						placeholder="Email"
						required
						className="rounded-md border border-gray-700 bg-white text-black px-4 py-3"
					/>

					<input
						{...register("password")}
						type="password"
						placeholder="Password"
						required
						className="rounded-md border border-gray-700 bg-white text-black px-4 py-3"
					/>

					<button
						type="submit"
						className="cursor-pointer rounded-md bg-violet-400 py-3  text-slate-900"
					>
						{isSignup ? "Sign Up" : "Sign In"}
					</button>
				</form>

				<div className="my-6 flex items-center gap-3">
					<div className="h-px flex-1 bg-slate-700" />
					<p className="text-xs text-slate-400">or</p>
					<div className="h-px flex-1 bg-slate-700" />
				</div>

				<p className="mt-6 text-center text-xs text-slate-700">
					{isSignup ? "Already have an account?" : "Don't have an account?"}
					<button
						onClick={() => setIsSignup(!isSignup)}
						className="ml-1 text-black hover:text-violet-400"
					>
						{isSignup ? "Sign In" : "Sign Up"}
					</button>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
