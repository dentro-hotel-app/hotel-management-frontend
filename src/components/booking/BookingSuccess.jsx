import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Header from "../common/Header"

const BookingSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const success = location.state?.success
  const message = location.state?.message
  const confirmationCode = location.state?.confirmationCode

  return (
    <div className="container">
      <Header title={success ? "Booking Success" : "Booking Failed"} />

      <div className="mt-5 text-center">
        {success ? (
          <>
            <h3 className="text-success">Booking Successful!</h3>
            <p>{message}</p>

            {confirmationCode && (
              <p>
                <strong>Confirmation Code:</strong> {confirmationCode}
              </p>
            )}

            <Link to="/browse-all-rooms" className="btn btn-hotel mt-3">
              Browse More Rooms
            </Link>
          </>
        ) : (
          <>
            <h3 className="text-danger">Booking Failed</h3>
            <p>{message}</p>

            <div className="mt-4">
              <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)}>
                Try Again
              </button>

              <Link to="/browse-all-rooms" className="btn btn-hotel mx-2">
                Browse Rooms
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BookingSuccess
