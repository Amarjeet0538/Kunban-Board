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


