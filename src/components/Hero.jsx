export default function Hero() {
	return (
		<div className=" items-center flex justify-around align-middle relative flex-wrap ">
			<div className="max-w-lg relative">
				<h1 className=" text-7xl max-w-md text-left uppercase text-bold">
					Kokuyo <span className="text-violet-800">Kunban</span> Board
				</h1>
				<p className="text-xl text-left">The Best KunBun Board on the Globe.</p>
			</div>

			<div className="py-6 sm:py-0">
				<img
					width="500"
					height="500"
					alt="bg-image"
					src="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1651418249/new-nft_tlfisy.png"
				/>
			</div>
		</div>
	);
}
