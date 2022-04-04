import { useRef, useEffect, useState } from 'react';

const Main = () => {
	const fileRef = useRef();
	const [file, setFile] = useState();
	const [objectURL, setObjectURL] = useState();

	useEffect(() => {
		const createObjURL = () => {
			setObjectURL(URL.createObjectURL(file));

			// free memory when ever this component is unmounted
			return () => URL.revokeObjectURL(objectURL);
		};
		console.log(file);
		if (file) {
			createObjURL();
		}
	}, [file]);

	const handleChange = (e) => {
		setFile(e.target.files[0]);
		console.log(file);
	};

	const handleUpload = () => {
		const data = new FormData();
		data.append('file', file);
		console.log(data);

		fetch(process.env.REACT_APP_API_ENDPOINT, {
			method: 'POST',
			body: data,
		})
			.then((res) => res.blob())
			.then((imageBlob) => {
				const convertedImageObjectURL = URL.createObjectURL(imageBlob);

				// use this object url to download it
				console.log(convertedImageObjectURL);
			})
			.catch((err) => console.log(err));
	};

	return (
		// TODO: Optimize for all screens
		<div className="p-2">
			<div>
				<div className="border border-dashed rounded flex flex-col p-2 justify-around items-center border-blue-400">
					<h1 className="text-2xl font-bold uppercase mb-5">
						Upload your image here
					</h1>

					{objectURL && <img src={objectURL} alt="img-to-upload" />}

					{typeof file === 'undefined' || file === null ? (
						<button
							className="p-2 bg-blue-400 text-white rounded-md cursor-pointer my-3"
							onClick={() => fileRef.current.click()}
						>
							Select File
						</button>
					) : (
						<div>
							<button
								className="p-2 bg-blue-400 text-white rounded-md cursor-pointer my-3"
								onClick={handleUpload}
							>
								Upload File
							</button>
							<button
								className="p-2 bg--400 text-white bg-red-500 rounded-md cursor-pointer mx-3"
								onClick={() => {
									setFile(null);
									setObjectURL(null);
								}}
							>
								Delete File
							</button>
						</div>
					)}

					<input
						ref={fileRef}
						onChange={handleChange}
						multiple={false}
						type="file"
						accept="image/*"
						hidden
					/>
				</div>
			</div>
			{/* <div>
				<div></div>
			</div> */}
		</div>
	);
};

export default Main;
