import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [file, setFile] = useState("")
	const [fileUrl, setFileUrl] = useState("")

	const handleImgChange = (e) => {
		if (e.target.files.length) {
			console.log(e.target.files);
			setFile(e.target.files[0])
		}
		 
	}
	const sendFile = async () => {
		if (!file) {
			alert("Image field is required")
			return false
		}
		try {
			const form = new FormData()
			form.append("img", file)


			//fetch to upload the img in the backend
			const response = await fetch(`${process.env.BACKEND_URL}/api/img`, {
				method: "POST",
				body: form
			})
			console.log(response);
			
			const data = await response.json()
			console.log(data);
			setFileUrl(data.img)
			
		} catch (error) {
			
		}
	}
	console.log(fileUrl);
	

	return (
		<div className="row m-5 bg-secondary bg-opacity-10 p-2">
			<div className="col-12 mb-3">
				<h4 className="m-2">
					Cloudinary
				</h4>
				<input 
					type="file" 
					className="form-control mb-2" 
					accept="image/jpeg"
					onChange={e => handleImgChange(e)}
				/>
				<button className="btn btn-primary" onClick={sendFile}>Send</button>

			</div>
				{
					fileUrl !== ""
					?
					<div className="col-4">
						<img src={fileUrl} className="w-100 h-100"/>
					</div>
					:
					null
				}

		</div>
	);
};
