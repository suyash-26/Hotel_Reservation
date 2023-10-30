import "./updateHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { hotelInputs } from "../../formSource";

const UpdateHotel = () => {
  // let { match } = useRouteMatch();
  // console.log(match);
  // const hotelId = match.hotelId; // Assuming you receive the hotel ID as a parameter

  // const location = useLocation();

  // Access location properties
  // const { pathname, search, state } = location;

  // For example, you might want to extract specific query parameters from the URL
  // const searchParams = new URLSearchParams(search);
  // const hotelId = searchParams.get('hotelId');
  // console.log(hotelId);

  // You can also access state if it's provided during navigation
  // const myState = state;

  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // Split the pathname by '/'
  const hotelId = pathSegments[pathSegments.length - 1]; 
  console.log(hotelId);
  
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [existingHotel, setExistingHotel] = useState({}); // State to hold the existing hotel data

  const { data, loading, error } = useFetch(`/rooms`); // Fetch available rooms

  useEffect(() => {
    // Fetch the existing hotel data by ID when the component mounts
    const fetchExistingHotel = async () => {
      try {
        const response = await axios.get(`/hotels/find/${hotelId}`); // Adjust the API endpoint accordingly
        console.log(response.data);
        setExistingHotel(response.data); // Set existing hotel data
        setRooms(response.data.rooms || []); // Set existing rooms associated with the hotel
        // Set other existing data into 'info' state if needed
      } catch (error) {
        console.log(error);
      }
    };
    fetchExistingHotel();
  }, [hotelId]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Logic to update hotel information (similar to NewHotel component's handleClick function)
      // Use PUT request instead of POST to update the existing hotel
      // Include logic to update the 'existingHotel' with modified information
      // ============================================

      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dek4rngw9/image/upload",
            data
          );
            
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.put(`/hotels/${hotelId}`, newhotel);


// ====================================================

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Hotel</h1>
        </div>
        <div className="bottom">
        <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
          {/* Similar form structure to NewHotel */}
          {/* Pre-fill the form inputs with 'existingHotel' data */}
          {/* Enable user to update the information */}
        </div>
      </div>
    </div>
  );
};

export default UpdateHotel;
