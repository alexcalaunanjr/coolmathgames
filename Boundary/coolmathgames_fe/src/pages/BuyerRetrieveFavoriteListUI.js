import React from "react";
import { useEffect, useState } from "react";
import CardProperty from "../components/CardProperty";
import { UserContextProvider } from "../hooks/UseModalContext";
import BuyerHeader from "../components/BuyerHeader";
import Footer from "../components/Footer";
import axios from "axios";

// assets
// background image
import BG from "../assets/bg1-30.jpg";

function BuyerRetrieveFavoriteListUI(props) {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // Check if property is sold
  const [isSold, setIsSold] = useState(props.isSold);
  const [isFavorite, setIsFavorite] = useState(true);

  useEffect(() => {
    document.title = "Buyer Retrieve Favorite Property Listing";
    axios
      .post(
        `http://127.0.0.1:5000/BuyerRetrieveFavoriteList`,
        {
          username: localStorage.getItem("username"),
        },
        {
          headers: {
            Authorization: "Bearer " + props.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response) {
          const updatedFavoriteProperties = response.data.properties.map(
            (property) => ({
              ...property,
              propertyLink: `/BuyerViewFavoriteListingUI/${property.propertyName}`,
            })
          );
          setFavoriteProperties(updatedFavoriteProperties);
        }
      })
      .catch((error) => {
        console.error("Error fetching new property list", error);
      });
  }, []);

  function displayBuyerRetrieveFavoriteListUI() {
    return (
      // return container with background image that is slightly transparent
      <>
        {/* Seller header component */}
        <UserContextProvider>
          <BuyerHeader />
        </UserContextProvider>

        <div
          className="bg-cover bg-center min-h-screen justify-center"
          style={{ backgroundImage: `url(${BG})` }}
        >
          {/* Title: New Properties */}
          <h1 class="pt-10 px-20 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-[28pt]">
            Favorites Properties
          </h1>

          {/* Cards of properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 items-center px-20 justify-between">
            {favoriteProperties.map((property) => (
              <div key={property.id} className="relative">
                <CardProperty property={property} />
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </>
    );
  }
  return displayBuyerRetrieveFavoriteListUI();
}

export default BuyerRetrieveFavoriteListUI;
