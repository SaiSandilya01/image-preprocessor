import { BsGithub } from 'react-icons/bs';

const Navbar = () => {
	return (
		<div className="flex justify-between items-center p-2 bg-blue-400 text-white text-2xl">
			<h1 className=" font-bold ">Image Preprocessor</h1>

			<a
				href="https://github.com/SaiSandilya01/image-preprocessor"
				target="_blank"
				rel="noreferrer"
			>
				<button className="p-2 bg-transparent rounded flex justify-around items-center">
					<BsGithub className=" cursor-pointer" />
					<span className="hidden sm:block font-bold">&nbsp; GitHub</span>
				</button>
			</a>
		</div>
	);
};

export default Navbar;
