import React, { useState } from "react"
import { addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link } from "react-router-dom"

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photos: [],
    roomType: "",
    roomPrice: ""
  })

  const [imagePreviews, setImagePreviews] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* ===================== INPUT HANDLERS ===================== */

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target
    setNewRoom(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])

    if (files.length === 0) return

    setNewRoom(prev => ({
      ...prev,
      photos: files
    }))

    // create preview URLs
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  /* ===================== SUBMIT ===================== */

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newRoom.roomType || !newRoom.roomPrice || newRoom.photos.length === 0) {
      setErrorMessage("All fields including photos are required")
      return
    }

    try {
      setIsSubmitting(true)
      await addRoom(newRoom.photos, newRoom.roomType, newRoom.roomPrice)

      setSuccessMessage("✅ Room added successfully!")
      setErrorMessage("")

      // reset
      setNewRoom({ photos: [], roomType: "", roomPrice: "" })
      setImagePreviews([])
    } catch (error) {
      setErrorMessage(error.message || "Error adding room")
    } finally {
      setIsSubmitting(false)
    }

    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  /* ===================== UI ===================== */

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <h2 className="mt-5 mb-3">Add a New Room</h2>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">

            {/* ===================== ROOM TYPE ===================== */}
            <div className="mb-3">
              <label className="form-label">Room Type</label>
              <RoomTypeSelector
                handleRoomInputChange={handleRoomInputChange}
                newRoom={newRoom}
              />
            </div>

            {/* ===================== ROOM PRICE ===================== */}
            <div className="mb-3">
              <label className="form-label">Room Price</label>
              <input
                required
                type="number"
                className="form-control"
                name="roomPrice"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
              />
            </div>

            {/* ===================== PHOTOS ===================== */}
            <div className="mb-3">
              <label className="form-label">Room Photos</label>
              <input
                required
                type="file"
                className="form-control"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* ===================== PREVIEWS ===================== */}
            {imagePreviews.length > 0 && (
              <div className="mb-3 d-flex flex-wrap">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      marginRight: "10px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd"
                    }}
                  />
                ))}
              </div>
            )}

            {/* ===================== ACTIONS ===================== */}
            <div className="d-grid gap-2 d-md-flex mt-3">
              <Link to="/existing-rooms" className="btn btn-outline-info">
                Existing Rooms
              </Link>

              <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Room"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

export default AddRoom
