import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

import "./styles.css";

export default function App() {
  const [file, setfile] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Upload Image");

  const uploadPhotoHandler = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "khjzbzvb");

    try {
      setLoading(true);
      setMessage("Uploading");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/djd6tbkpg/upload",
        formData
      );
      console.log(res.data.url);
      setImg(res?.data?.url);
      setLoading(false);
      setMessage("Image Uploaded");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <img src="url(https://www.pinterest.com/pin/674977062881162179/)"></img>
      </div>
      <div className="page_cont">
        <label for="tag" className="message">
          <FaUpload></FaUpload>
          <div>{message}</div>
          <input
            id="tag"
            onChange={(e) => setfile(e.target.files[0])}
            type="file"
            placeholder="Upload Image"
          />
        </label>
        <button onClick={() => uploadPhotoHandler()}>Upload</button>
        {loading ? (
          <div class="loader"></div>
        ) : (
          <div styles="width: 40px; height: 40px"></div>
        )}
        {img ? <img src={img} alt="uploaded_img" /> : null}
      </div>
    </>
  );
}
