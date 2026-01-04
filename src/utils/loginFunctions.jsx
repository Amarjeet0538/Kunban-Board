
export const onSubmit = async (data) => {
		try {
			if (isSignup) {
				await createUserWithEmailAndPassword(auth, data.email, data.password);
			} else {
				await signInWithEmailAndPassword(auth, data.email, data.password);
			}

			navigate("/");
		} catch (error) {
			console.error(error.message);
		}
	};

	// const onSubmit = (data) => {
	// 	const payload = isSignup
	// 		? {
	// 				firstName: data.firstName,
	// 				lastName: data.lastName,
	// 				email: data.email,
	// 				password: data.password,
	// 				role: data.role,
	// 		  }
	// 		: {
	// 				email: data.email,
	// 				password: data.password,
	// 		  };

	// 	console.log("Submitting:", payload);
	// 	// call login or signup API here
	// };



