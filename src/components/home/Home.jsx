import React from "react"
import MainHeader from "../layout/MainHeader"
import HotelService from "../common/HotelService"
import Parallax from "../common/Parallax"
import RoomSearch from "../common/RoomSearch"
import { useLocation, Link } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

const Home = () => {
  const location = useLocation()
  const { user } = useAuth()

  const isAdmin = user?.roles?.includes("ROLE_ADMIN")

  return (
    <section>
      {/* ================= SYSTEM MESSAGE ================= */}
      {location.state?.message && (
        <p className="text-warning px-5">{location.state.message}</p>
      )}

      {/* ================= LOGIN INFO ================= */}
      {user && (
        <h6 className="text-success text-center mt-2">
          Logged in as: {user.sub}
        </h6>
      )}

      {/* ================= HERO HEADER ================= */}
      <MainHeader />

      {/* Medical Banner */}
      <div className="alert alert-info text-center mb-4 rounded-0">
        🚑 <strong>Medical Support Available:</strong>
        Ambulance pickup from Airport & Major Hospitals |
        Caregiver-friendly rooms |
        Long-stay discounts available
      </div>

      {/* ================= ADMIN / LOGIN CTA ================= */}
      <div className="text-center mt-4">
        {isAdmin && (
          <Link to="/add-room" className="btn btn-primary mx-2">
            Admin: Add Medical Stay
          </Link>
        )}

        {!user && (
          <Link to="/login" className="btn btn-outline-info mx-2">
            Login
          </Link>
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="container">

        {/* ================= MEDICAL SEARCH ================= */}
        <RoomSearch />

        {/* ================= TRUST / MEDICAL INFO ================= */}
        <div className="row text-center my-5">
          <div className="col-md-4 mb-3">
            <h5>🧼 Hygienic & Safe</h5>
            <p className="text-muted">
              Cleaned daily with hospital-grade hygiene standards
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>👨‍👩‍👧 Caregiver Friendly</h5>
            <p className="text-muted">
              Designed for patients, families & long medical stays
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>🏥 Near Hospitals</h5>
            <p className="text-muted">
              Located close to major hospitals & clinics
            </p>
          </div>
        </div>

        {/* ================= PARALLAX SECTION ================= */}
        <Parallax />

        {/* ================= SERVICES ================= */}
        <HotelService />
      </div>
    </section>
  )
}

export default Home
