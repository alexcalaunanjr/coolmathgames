import React, { useState, useEffect } from "react";
import REAHeader from "../components/REAHeader";
import Footer from "../components/Footer";
import { UserContextProvider } from "../hooks/UseModalContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PLTabs from "../components/TabsPropertyListing";
import Button from "../components/Button";
import READeletePLUI from "../components/READeleteListingUI";
import REAViewFavoriteCountUI from "../components/REAViewFavoriteCountUI";
import REAViewViews from "../components/REAViewViewCountUI";

// Images
import house2 from "../assets/house2.jpg";
import bg from "../assets/bg3.jpeg";

function REAViewListingUI(props) {
  const [Ptoken, setPToken] = useState("");
  const id = localStorage.getItem("id");

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [unitFeatures, setUnitFeatures] = useState("");
  const [facilities, setFacilities] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [views, setViews] = useState("");
  const [favorites, setFavorites] = useState("");

  // Handle pop up for delete confirmation
  const [deletePopUp, setDeletePopUp] = useState(false);
  // Check if property is sold
  const [isSold, setIsSold] = useState("");
  // Pop up for favorites
  const [favoritesPopUp, setFavoritesPopUp] = useState(false);
  // Pop up for views
  const [viewsPopUp, setViewsPopUp] = useState(false);

  let { propertyName } = useParams();

  useEffect(() => {
    document.title = "View Property Listing";

    axios
      .get(`http://127.0.0.1:5000/REAViewListing/${propertyName}`, {
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPToken(props.token);
        if (response) {
          const data = response.data;
          setData(data);
          localStorage.setItem("clickedProperty", response.data.propertyName);
        }
      })
      .catch((error) => {
        console.error("Error fetching property listing:", error);
      });
  }, []);

  function setData(data){
    setTitle(data.propertyName);
    setImage(data.propertyImage);
    setLocation(data.location);
    setPrice(data.price);
    setBedrooms(data.noOfBedrooms);
    setBathrooms(data.noOfBathrooms);
    setSize(data.area);
    setDescription(data.aboutProperty);
    setUnitFeatures(data.unitFeatures);
    setFacilities(data.facilities);
    setIsSold(data.sold);
    setSellerName(data.ownerSeller)
  }

  // Function to handle insights pop up
  const handleFavorites = () => {
    setFavoritesPopUp(true);
  };

  const handleViews = () => {
    setViewsPopUp(true);
  };

  const handleReopenPopUp = () => {
    setFavoritesPopUp(false);
    setViewsPopUp(false);
  };

  // Function to handle delete button
  const handleDelete = () => {
    setDeletePopUp(true);
  };

  const handleReopenDelPopUp = () => {
    setDeletePopUp(false);
  };

  // Function to handle update button
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/REAUpdateListingUI/${title}`);
  };

  function displayPropertyListingUI() {
    return (
      <>
        <UserContextProvider>
          <REAHeader />
        </UserContextProvider>

        <div
          className="bg-cover bg-center min-h-screen justify-center object-fit p-10 lg:px-14"
          style={{
            backgroundImage: `linear-gradient(rgba(225, 225, 225, 0.9), rgba(225, 225, 225, 0.9)), url(${bg})`,
            backgroundSize: "cover",
          }}
        >
          <div className="relative">
            <div>
              <img
                src={`data:image/jpeg;base64, ${image}`}
                alt="House"
                className="object-contain w-full h-64 sm:h-64 xl:h-[600px]"
              />
            </div>
            {/* If property sold */}
            {isSold && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-4xl font-bold">
                Sold
              </div>
            )}
          </div>
          <div className="flex pb-10">
            <div className="w-1/3 pt-10">
              {/* Property Name */}
              <div className="flex">
                <p className="lg:text-3xl md:text-md font-bold">{title}</p>
              </div>
              <div className="flex pt-1">
                {/* Location */}
                <svg
                  className="w-6 h-6 text-black dark:text-black mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                  />
                </svg>
                <p className="text-md">{location}</p>
              </div>
              {/* seller name */}
              <div className="pt-3">
                <p className="text-gray-600">Property Owned By {sellerName}</p>
              </div>
              {/* Bedroom, Bathroom, Area */}
              <div className="flex pt-5">
                {/* Bedroom */}
                <div className="lg:w-1/4">
                  <div className="w-10">
                    <svg
                      className="w-10 h-10 text-black dark:text-black" // Set the desired width and height here
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 6a1 1 0 0 1 .993.883L4 7v6h6V8a1 1 0 0 1 .883-.993L11 7h8a3 3 0 0 1 2.995 2.824L22 10v8a1 1 0 0 1-1.993.117L20 18v-3H4v3a1 1 0 0 1-1.993.117L2 18V7a1 1 0 0 1 1-1" />
                      <path d="M7 8a2 2 0 1 1-1.995 2.15L5 10l.005-.15A2 2 0 0 1 7 8"></path>
                    </svg>
                    <p className="pt-2 text-md text-center">{bedrooms}</p>
                  </div>
                </div>
                {/* Bathroom */}
                <div className="lg:w-1/4">
                  <div className="w-10">
                    <svg
                      className="w-10 h-10 text-black dark:text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -4 24 28"
                    >
                      <path
                        fill="currentColor"
                        d="M3.5 4.135a1.635 1.635 0 0 1 3.153-.607l.144.358a4.09 4.09 0 0 0-1.38 1.774a4.179 4.179 0 0 0-.02 3.107a.75.75 0 0 0 .995.413l5.96-2.566a.75.75 0 0 0 .402-.963a3.973 3.973 0 0 0-2.132-2.213a3.843 3.843 0 0 0-2.466-.192l-.11-.275A3.135 3.135 0 0 0 2 4.135V11h-.25a.75.75 0 0 0 0 1.5H2v.355c0 .375 0 .595.016.84c.142 2.237 1.35 4.302 3.102 5.652a.745.745 0 0 0-.039.068l-1 2a.75.75 0 0 0 1.342.67l.968-1.935a7.358 7.358 0 0 0 2.58.765c.245.025.394.03.648.04h.007c.74.028 1.464.045 2.126.045c.662 0 1.386-.017 2.126-.045h.007c.254-.01.404-.015.648-.04a7.358 7.358 0 0 0 2.58-.765l.968 1.936a.75.75 0 0 0 1.342-.671l-1-2a.796.796 0 0 0-.038-.068c1.751-1.35 2.96-3.416 3.102-5.652c.015-.245.015-.465.015-.84v-.038c0-.06 0-.123-.004-.18a1.752 1.752 0 0 0-.014-.137h.268a.75.75 0 0 0 0-1.5H3.5z"
                      ></path>
                    </svg>
                    <p className="pt-2 text-md text-center">{bathrooms}</p>
                  </div>
                </div>
                {/* Area */}
                <div className="lg-1/4">
                  <div>
                    <svg
                      className="w-10 h-10 text-black dark:text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M3 5v16h6v-1.5H7V18h2v-1.5H5V15h4v-1.5H7V12h2v-1.5H5V9h4V5h1.5v4H12V7h1.5v2H15V5h1.5v4H18V7h1.5v2H21V3H5a2 2 0 0 0-2 2m3 2a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1a1 1 0 0 1-1 1"
                      ></path>
                    </svg>
                    <p className="pt-2 text-md text-left">{size} sqft</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Middle */}
            <div className="w-1/3 pt-10">
            </div>
            {/* Right */}
            <div className="w-1/3 pt-10">
              <p className="lg:text-3xl md:text-md font-bold text-end">
                ${price}
              </p>
              <div className="flex justify-end space-x-4 pt-5">
                {/* Favoties */}
                <button
                  className="flex items-center justify-center bg-transparent text-black p-3 border border-black rounded-lg hover:bg-white lg:w-1/3 w-1/2"
                  onClick={handleFavorites}
                >
                  <svg
                    class="w-[24px] h-[24px] text-red-500 dark:text-white mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>
                  Favorites
                </button>
                {/* Pop up for favorotes */}
                {favoritesPopUp && (
                  <REAViewFavoriteCountUI
                    propertyName={title}
                    openModal={favoritesPopUp}
                    onClose={handleReopenPopUp}
                    token={Ptoken}
                  />
                )}
                {/* Views */}
                <button
                  className="flex items-center justify-center bg-transparent text-black p-3 border border-black rounded-lg hover:bg-white lg:w-1/3 w-1/2"
                  onClick={handleViews}
                >
                  <svg
                    class="w-[24px] h-[24px] text-gray-800 dark:text-white mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Views
                </button>
                {/* Pop up for insights */}
                {viewsPopUp && (
                  <REAViewViews
                    propertyName={title}
                    openModal={viewsPopUp}
                    onClose={handleReopenPopUp}
                    token={Ptoken}
                  />
                )}
              </div>
            </div>
          </div>
          {/* A straight line */}
          <div className="w-2/3 pb-10">
            <hr className="border-t-1 border-black" />
          </div>
          {/* Description */}
          <div className="w-2/3 pb-10">
            <p className="lg:text-2xl md:text-md font-bold pb-5">
              About This Property
            </p>
            <p className="text-md">{description}</p>
          </div>
          {/* A straight line */}
          <div className="w-2/3 pb-10">
            <hr className="border-t-1 border-black" />
          </div>
          {/* Tabs */}
          <div className="pb-10">
            <p className="lg:text-2xl md:text-md font-bold pb-5">Amenities</p>
            <PLTabs facilities={facilities} unitFeatures={unitFeatures} />
          </div>
          {/* Button */}
          <div className="flex justify-center space-x-4 pt-14">
            <div className="w-40">
              <Button
                color="bg-blue-500 text-md"
                text="Update"
                onClick={handleUpdate}
              />
            </div>
            <div className="w-40">
              <Button
                color="bg-red-700 text-black text-md"
                text="Delete"
                onClick={handleDelete}
              />
            </div>
            {/* Pop up for delete confirmation */}
            {deletePopUp && (
              <READeletePLUI
                openModal={READeletePLUI}
                onClose={handleReopenDelPopUp}
                text="Are you sure to delete this property listing?"
                token={Ptoken}
              />
            )}
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </>
    );
  }
  return displayPropertyListingUI();
}

export default REAViewListingUI;
