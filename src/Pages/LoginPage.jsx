import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser, signupUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

function LoginPage() {
	const { register, handleSubmit, reset } = useForm();
	const [isSignup, setIsSignup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const onSubmit = async (data) => {
		setError("");
		setLoading(true);

		try {
			let user;

			if (isSignup) {
				user = await signupUser({
					firstName: data.firstName,
					lastName: data.lastName,
					role: data.role,
					email: data.email,
					password: data.password,
				});
			} else {
				user = await loginUser({
					email: data.email,
					password: data.password,
				});
			}

			console.log("user:", user);

			localStorage.setItem("user", JSON.stringify(user));
			if (user.token) {
				localStorage.setItem("token", user.token);
			}

			reset();
			navigate("/");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};
``
	return (
		<div className="min-h-screen w-full relative text-gray-900 flex flex-col font-ubu">
		{/* background image */}
		<div
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
        backgroundSize: "40px 40px",
      }}
    />

		<div className="min-h-screen flex items-center justify-center font-ubu text-2xl">

			<div className=" rounded-xl bg-gray-100 p-8 text-gray-700 shadow-xs  w-1/4">
				<h2 className="text-center text-4xl font-nun">
					{isSignup ? "Create an account" : "Sign In"}
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mt-6 flex flex-col gap-4"
				>
					{isSignup && (
						<div className="flex flex-col gap-4">
							{/* names */}
							<div className="flex w-full gap-2">
								<input
									{...register("firstName")}
									type="text"
									placeholder="First Name"
									required
									className="w-full rounded-md border border-gray-700 bg-white text-black px-4 py-3"
								/>
								<input
									{...register("lastName")}
									type="text"
									placeholder="Last Name"
									required
									className="w-full  rounded-md border border-gray-700 bg-white text-black px-4 py-3"
								/>
							</div>

							{/* roles */}
							<select
								{...register("role", { required: true })}
								className="rounded-md border border-gray-700 bg-white text-black px-4 py-3"
							>
								<option value="">Select...</option>
								<option value="admin">Admin</option>
								<option value="client">Client</option>
							</select>
						</div>
					)}
					{/* email */}
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black/70" size={18} />
						<input
						{...register("email")}
						type="email"
						placeholder="Email"
						required
						className="rounded-md border w-full border-gray-700 bg-white text-black px-4  pl-10 py-3"
					/>
					</div>

					{/* password */}
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black/70" size={18} />
						<input
							{...register("password")}
							type="password"
							placeholder="Password"
							required
							className="rounded-md border w-full border-gray-700 bg-white text-black px-4 pl-10 py-3"
							/>
					</div>


					{error && <p className="text-sm text-red-600 text-center">{error}</p>}
					{/* submit button */}
					<button
						type="submit"
						className="cursor-pointer rounded-md bg-violet-500 py-3 text-white hover:bg-violet-700"
					>
						{isSignup
							? loading
								? "Creating Account..."
								: "Sign up"
							: loading
							? "Signing in..."
							: "Sign In"}
					</button>
				</form>

				{/* --or-- */}
				<div className="my-6 flex items-center gap-3">
					<div className="h-px flex-1 bg-slate-700" />
					<p className="text-xs text-slate-400">or</p>
					<div className="h-px flex-1 bg-slate-700" />
				</div>

				{/* Signup & signin switch */}
				<p className="mt-6 text-center text-base text-slate-700">
					{isSignup ? "Already have an account?" : "Don't have an account?"}
					<button
						onClick={() => setIsSignup(!isSignup)}
						className="ml-1 text-black hover:text-violet-700"
					>
						{isSignup ? "Sign In" : "Sign Up"}
					</button>
				</p>
			</div>
		</div>
  </div>
	);
}

export default LoginPage;