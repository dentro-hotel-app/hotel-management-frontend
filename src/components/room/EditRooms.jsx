import React, { useEffect, useState } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditRoom = () => {
  const { roomId } = useParams()

  const [room, setRoom] = useState({
    roomType: "",
    roomPrice: ""
  })

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  /* ===================== FETCH ROOM ===================== */

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(roomId)

        setRoom({
          roomType: data.roomType || "",
          roomPrice: data.roomPrice || ""
        })
      } catch (error) {
        setErrorMessage("Failed to load room details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoom()
  }, [roomId])

  /* ===================== INPUT HANDLER ===================== */

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRoom({ ...room, [name]: value })
  }

  /* ===================== SUBMIT ===================== */

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSaving(true)

      await updateRoom(roomId, {
        roomType: room.roomType,
        roomPrice: Number(room.roomPrice)
      })

      setSuccessMessage("Room updated successfully!")
      setErrorMessage("")
    } catch (error) {
      setErrorMessage(error.message || "Error updating room")
    } finally {
      setIsSaving(false)
    }

    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  /* ===================== UI STATES ===================== */

  if (isLoading) {
    return <p className="text-center mt-5">Loading room details...</p>
  }

  /* ===================== UI ===================== */

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-4">Edit Room</h3>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>

            {/* ROOM TYPE */}
            <div className="mb-3">
              <label className="form-label">Room Type</label>
              <input
                type="text"
                className="form-control"
                name="roomType"
                value={room.roomType}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* ROOM PRICE */}
            <div className="mb-3">
              <label className="form-label">Room Price</label>
              <input
                type="number"
                className="form-control"
                name="roomPrice"
                value={room.roomPrice}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>

            {/* ACTIONS */}
            <div className="d-grid gap-2 d-md-flex mt-4">
              <Link to="/existing-rooms" className="btn btn-outline-info">
                Back
              </Link>

              <button
                type="submit"
                className="btn btn-outline-warning"
                disabled={isSaving}
              >
                {isSaving ? "Updating..." : "Update Room"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditRoom
