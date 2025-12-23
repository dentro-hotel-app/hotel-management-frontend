import React, { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import { getAvailableRooms } from "../utils/ApiFunctions"
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"

const RoomSearch = () => {

  /* ===================== SEARCH STATE ===================== */
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
    hospitalName: ""
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [availableRooms, setAvailableRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  /* ===================== HANDLERS ===================== */

  const handleSearch = (e) => {
    e.preventDefault()

    const checkInMoment = moment(searchQuery.checkInDate)
    const checkOutMoment = moment(searchQuery.checkOutDate)

    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
      setErrorMessage("Please select valid admission and discharge dates")
      return
    }

    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      setErrorMessage("Discharge date must be after admission date")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
      // hospitalName will be passed later when backend supports it
    )
      .then((response) => {
        setAvailableRooms(response.data || [])
      })
      .catch(() => {
        setErrorMessage("Unable to fetch rooms. Please try again.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchQuery(prev => ({ ...prev, [name]: value }))
    setErrorMessage("")
  }

  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
      hospitalName: ""
    })
    setAvailableRooms([])
    setErrorMessage("")
  }

  /* ===================== UI ===================== */

  return (
    <Container className="shadow mt-n5 mb-5 py-5 rounded">

      <Form onSubmit={handleSearch}>
        <Row className="justify-content-center g-3">

          {/* ================= Admission Date ================= */}
          <Col xs={12} md={3}>
            <Form.Group controlId="checkInDate">
              <Form.Label>Admission Date</Form.Label>
              <Form.Control
                type="date"
                name="checkInDate"
                value={searchQuery.checkInDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
                required
              />
            </Form.Group>
          </Col>

          {/* ================= Discharge Date ================= */}
          <Col xs={12} md={3}>
            <Form.Group controlId="checkOutDate">
              <Form.Label>Expected Discharge Date</Form.Label>
              <Form.Control
                type="date"
                name="checkOutDate"
                value={searchQuery.checkOutDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
                required
              />
            </Form.Group>
          </Col>

          {/* ================= Hospital Name ================= */}
          <Col xs={12} md={3}>
            <Form.Group controlId="hospitalName">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                name="hospitalName"
                placeholder="e.g. Apollo, AIIMS, Fortis"
                value={searchQuery.hospitalName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          {/* ================= Stay Type ================= */}
          <Col xs={12} md={3}>
            <Form.Group controlId="roomType">
              <Form.Label>Stay Type</Form.Label>
              <div className="d-flex">
                <RoomTypeSelector
                  handleRoomInputChange={handleInputChange}
                  newRoom={searchQuery}
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="ms-2"
                >
                  Find Medical Stay
                </Button>
              </div>
            </Form.Group>
          </Col>

        </Row>
      </Form>

      {/* ================= RESULTS ================= */}
      {isLoading && (
        <p className="mt-4 text-center">
          Finding suitable medical stays...
        </p>
      )}

      {!isLoading && availableRooms.length > 0 && (
        <RoomSearchResults
          results={availableRooms}
          onClearSearch={handleClearSearch}
        />
      )}

      {!isLoading && availableRooms.length === 0 && searchQuery.checkInDate && (
        <p className="mt-4 text-center text-muted">
          No rooms available for selected dates.
        </p>
      )}

      {errorMessage && (
        <p className="text-danger text-center mt-3">
          {errorMessage}
        </p>
      )}
    </Container>
  )
}

export default RoomSearch
