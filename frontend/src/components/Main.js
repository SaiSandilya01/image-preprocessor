import { useRef, useEffect, useState } from 'react';

const Main = () => {
	const fileRef = useRef();
	const [file, setFile] = useState();
	const [objectURL, setObjectURL] = useState();
	const [convertedImageObjectURL, setConvertedImageObjectURL] = useState();

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
				setConvertedImageObjectURL(convertedImageObjectURL);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="p-2 md:flex flex-col md:w-full justify-around items-start md:flex-row">
			<div className="mx-5 md:w-full">
				<div className="border border-dashed rounded flex flex-col p-2 justify-around items-center border-blue-400">
					<h1 className="text-2xl font-bold uppercase mb-5">Upload Image</h1>

					{objectURL && <img src={objectURL} alt="img-to-upload" />}

					{typeof file === 'undefined' || file === null ? (
						<button
							className="p-2 bg-blue-400 text-white rounded-md cursor-pointer my-3"
							onClick={() => fileRef.current.click()}
						>
							Select Image
						</button>
					) : (
						<div>
							<button
								className="p-2 bg-blue-400 text-white rounded-md cursor-pointer my-3"
								onClick={handleUpload}
							>
								Upload
							</button>
							<button
								className="p-2 bg--400 text-white bg-red-500 rounded-md cursor-pointer mx-3"
								onClick={() => {
									setFile(null);
									setObjectURL(null);
									setConvertedImageObjectURL(null);
								}}
							>
								Delete
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
			{convertedImageObjectURL && (
				<div className="mx-5 md:w-full">
					<div className="border border-dashed rounded flex flex-col p-2 justify-around items-center border-blue-400">
						<h1 className="text-2xl font-bold uppercase mb-5">
							Converted Image
						</h1>
						<img src={convertedImageObjectURL} alt="preprocessed-img" />
						<a href={convertedImageObjectURL} download>
							<button className="p-2 bg-blue-400 text-white rounded-md cursor-pointer my-3">
								Download
							</button>
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default Main;
