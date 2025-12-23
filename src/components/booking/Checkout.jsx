import React, { useEffect, useState } from "react"
import BookingForm from "./BookingForm"
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt
} from "react-icons/fa"
import { useParams } from "react-router-dom"
import { getRoomById } from "../utils/ApiFunctions"
import RoomCarousel from "../common/RoomCarousel"

const Checkout = () => {
  const { roomId } = useParams()

  const [roomInfo, setRoomInfo] = useState({
    roomType: "",
    roomPrice: "",
    photos: []
  })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  /* ===================== FETCH ROOM ===================== */

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(roomId)

        setRoomInfo({
          roomType: data.roomType,
          roomPrice: data.roomPrice,
          photos: Array.isArray(data.photos) ? data.photos : []
        })
      } catch (err) {
        setError(err.message || "Failed to load room details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoom()
  }, [roomId])

  /* ===================== UI STATES ===================== */

  if (isLoading) {
    return <p className="text-center mt-5">Loading room information...</p>
  }

  if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>
  }

  /* ===================== UI ===================== */

  return (
    <div>
      <section className="container mt-5">
        <div className="row">

          {/* ===================== LEFT: ROOM INFO ===================== */}
          <div className="col-md-4 mb-5">
            <div className="room-info">

              {/* PHOTO CAROUSEL */}
              <RoomCarousel photos={roomInfo.photos} />

              <table className="table table-bordered mt-3">
                <tbody>
                  <tr>
                    <th>Room Type</th>
                    <td>{roomInfo.roomType}</td>
                  </tr>
                  <tr>
                    <th>Price per night</th>
                    <td>₹{roomInfo.roomPrice}</td>
                  </tr>
                  <tr>
                    <th>Room Services</th>
                    <td>
                      <ul className="list-unstyled mb-0">
                        <li><FaWifi /> Wifi</li>
                        <li><FaTv /> Netflix Premium</li>
                        <li><FaUtensils /> Breakfast</li>
                        <li><FaWineGlassAlt /> Mini Bar</li>
                        <li><FaCar /> Car Service</li>
                        <li><FaParking /> Parking</li>
                        <li><FaTshirt /> Laundry</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

          {/* ===================== RIGHT: BOOKING FORM ===================== */}
          <div className="col-md-8">
            <BookingForm roomPrice={roomInfo.roomPrice} />
          </div>

        </div>
      </section>
    </div>
  )
}

export default Checkout
