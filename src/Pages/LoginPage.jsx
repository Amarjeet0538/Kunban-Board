import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser,signupUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

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
						<div className="flex flex-col gap-4">
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
								<select
								{...register("category", { required: true })}
								className="rounded-md border border-gray-700 bg-white text-black px-4 py-3"
							>
								<option value="">Select...</option>
								<option value="A">Admin</option>
								<option value="B">Client</option>
							</select>

						</div>
					)}

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

					{error && <p className="text-sm text-red-600 text-center">{error}</p>}

					<button
						type="submit"
						className="cursor-pointer rounded-md bg-violet-400 py-3  text-slate-900"
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
