import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const getHeader = () => {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`
  }
}

/* ===================== ROOMS ===================== */

/* ADD ROOM (MULTIPLE PHOTOS) */
export async function addRoom(photos, roomType, roomPrice) {
  const formData = new FormData()

  photos.forEach(photo => {
    formData.append("photo", photo) // MUST be "photo"
  })

  formData.append("roomType", roomType)
  formData.append("roomPrice", roomPrice)

  const response = await api.post(
    "/rooms/add/new-room",
    formData,
    { headers: getHeader() }
  )

  return response.data
}

/* GET ROOM TYPES */
export async function getRoomTypes() {
  const response = await api.get("/rooms/room/types")
  return response.data
}

/* GET ALL ROOMS */
export async function getAllRooms() {
  const response = await api.get("/rooms/all-rooms")
  return response.data
}

/* DELETE ROOM */
export async function deleteRoom(roomId) {
  const response = await api.delete(
    `/rooms/delete/room/${roomId}`,
    { headers: getHeader() }
  )
  return response.data
}

/* UPDATE ROOM (NO PHOTOS HERE) */
export async function updateRoom(roomId, roomData) {
  const formData = new FormData()

  if (roomData.roomType) {
    formData.append("roomType", roomData.roomType)
  }

  if (roomData.roomPrice) {
    formData.append("roomPrice", roomData.roomPrice)
  }

  const response = await api.put(
    `/rooms/update/${roomId}`,
    formData,
    { headers: getHeader() }
  )

  return response.data
}

/* GET ROOM BY ID */
export async function getRoomById(roomId) {
  const response = await api.get(`/rooms/room/${roomId}`)
  return response.data
}

/* GET AVAILABLE ROOMS */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const response = await api.get(
    `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  )
  return response.data
}

/* ===================== BOOKINGS ===================== */

export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking
    )
    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}

export async function getAllBookings() {
  const response = await api.get(
    "/bookings/all-bookings",
    { headers: getHeader() }
  )
  return response.data
}

export async function getBookingByConfirmationCode(code) {
  const response = await api.get(
    `/bookings/confirmation/${code}`
  )
  return response.data
}

export async function cancelBooking(bookingId) {
  const response = await api.delete(
    `/bookings/booking/${bookingId}/delete`
  )
  return response.data
}

export async function getBookedDates(roomId) {
  const response = await api.get(
    `/bookings/room/${roomId}/booked-dates`
  )
  return response.data
}

/* ===================== USERS ===================== */

export async function registerUser(registration) {
  const response = await api.post(
    "/auth/register-user",
    registration
  )
  return response.data
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login)
    return response.data
  } catch {
    return null
  }
}

export async function getUser(userId) {
  const response = await api.get(
    `/users/${userId}`,
    { headers: getHeader() }
  )
  return response.data
}

export async function deleteUser(userId) {
  const response = await api.delete(
    `/users/delete/${userId}`,
    { headers: getHeader() }
  )
  return response.data
}

export async function getBookingsByUserId(userId) {
  const response = await api.get(
    `/bookings/user/${userId}/bookings`,
    { headers: getHeader() }
  )
  return response.data
}