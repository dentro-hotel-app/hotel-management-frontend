import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { Form, FormControl } from "react-bootstrap"
import BookingSummary from "./BookingSummary"
import { bookRoom, getBookedDates } from "../utils/ApiFunctions"

const BookingForm = ({ roomPrice }) => {
  const { roomId } = useParams()
  const navigate = useNavigate()

  const [validated, setValidated] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [bookedRanges, setBookedRanges] = useState([])

  const currentUser = localStorage.getItem("userId")

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: currentUser,
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: ""
  })

  // Fetch Booked Dates
  useEffect(() => {
    if (!roomId) return

    console.log("Fetching booked dates for room:", roomId)
    getBookedDates(roomId)
      .then(data => {
        console.log("Booked dates response:", data)
        const formatted = data.map(range => ({
          start: new Date(range.start),
          end: new Date(range.end)
        }))
        setBookedRanges(formatted)
      })
      .catch(err => console.log("Error fetching booked dates:", err))
  }, [roomId])

  // Disable unavailable dates
  const isDateDisabled = (date) =>
    bookedRanges.some(range => date >= range.start && date <= range.end)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBooking({ ...booking, [name]: value })
    setErrorMessage("")
  }

  const calculatePayment = () => {
    const checkIn = moment(booking.checkInDate)
    const checkOut = moment(booking.checkOutDate)
    const diff = checkOut.diff(checkIn, "days")
    return diff * (roomPrice || 0)
  }

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults) || 0
    if (adultCount < 1) {
      setErrorMessage("At least 1 adult is required.")
      return false
    }
    return true
  }

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isAfter(moment(booking.checkInDate))) {
      setErrorMessage("Check-out date must be after check-in date")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity() || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation()
      return
    }
    setIsSubmitted(true)
    setValidated(true)
  }

  const handleFormSubmit = async () => {
    try {
      const response = await bookRoom(roomId, booking)
      navigate("/booking-success", {
        state: {
          success: response.success,
          message: response.message,
          confirmationCode: response.confirmationCode,
          bookingId: response.bookingId
        }
      })
    } catch (error) {
      navigate("/booking-success", {
        state: {
          success: false,
          message: error.message
        }
      })
    }
  }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5">
            <h4 className="card-title">Reserve Room</h4>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Full name</Form.Label>
                <FormControl
                  required
                  type="text"
                  name="guestFullName"
                  value={booking.guestFullName}
                  placeholder="Enter your fullname"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <FormControl
                  required
                  type="email"
                  name="guestEmail"
                  value={booking.guestEmail}
                  disabled
                />
              </Form.Group>

              <fieldset>
                <legend>Lodging Period</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label>Check-in Date</Form.Label>
                    <DatePicker
                      selected={booking.checkInDate ? new Date(booking.checkInDate) : null}
                      onChange={(date) =>
                        setBooking({ ...booking, checkInDate: moment(date).format("YYYY-MM-DD") })
                      }
                      filterDate={(date) => !isDateDisabled(date)}
                      className="form-control"
                      minDate={new Date()}
                    />
                  </div>

                  <div className="col-6">
                    <Form.Label>Check-out Date</Form.Label>
                    <DatePicker
                      selected={booking.checkOutDate ? new Date(booking.checkOutDate) : null}
                      onChange={(date) =>
                        setBooking({ ...booking, checkOutDate: moment(date).format("YYYY-MM-DD") })
                      }
                      filterDate={(date) => !isDateDisabled(date)}
                      className="form-control"
                      minDate={booking.checkInDate ? new Date(booking.checkInDate) : new Date()}
                    />
                  </div>

                  {errorMessage && <p className="text-danger mt-1">{errorMessage}</p>}
                </div>
              </fieldset>

              <fieldset>
                <legend>Number of Guests</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label>Adults</Form.Label>
                    <FormControl
                      required
                      type="number"
                      name="numOfAdults"
                      value={booking.numOfAdults}
                      min={1}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-6">
                    <Form.Label>Children</Form.Label>
                    <FormControl
                      type="number"
                      name="numOfChildren"
                      value={booking.numOfChildren}
                      min={0}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </fieldset>

              <button type="submit" className="btn btn-hotel mt-3">
                Continue
              </button>
            </Form>
          </div>
        </div>

        <div className="col-md-4">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleFormSubmit}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingForm
