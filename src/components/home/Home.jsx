import React from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Home = () => {
  const location = useLocation();
  const { user } = useAuth();

  console.log("🔍 user:", user);
  console.log("🔍 roles typeof:", typeof user?.roles);
  console.log("🔍 roles exact:", user?.roles);

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  console.log("🔍 isAdmin computed:", isAdmin);

  return (
    <section>
      {location.state?.message && (
        <p className="text-warning px-5">{location.state.message}</p>
      )}

      {user && (
        <h6 className="text-success text-center">
          Logged in as: {user.sub}
        </h6>
      )}

      <MainHeader />

      <div className="text-center mt-3">
        {isAdmin && (
          <Link to="/add-room" className="btn btn-primary">
            Admin: Add Room
          </Link>
        )}

        {!user && (
          <Link to="/login" className="btn btn-outline-info">
            Login to Manage Rooms
          </Link>
        )}
      </div>

      <div className="container">
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <HotelService />
      </div>
    </section>
  );
};

export default Home;
