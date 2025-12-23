import React from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import RoomCarousel from "../common/RoomCarousel"

const RoomCard = ({ room }) => {
  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="shadow-sm h-100">

        {/* Photos */}
        <RoomCarousel photos={room.photos} />

        <Card.Body>
          <Card.Title className="hotel-color">
            {room.roomType}
          </Card.Title>

          <span className="badge bg-success mb-2">
            10% off for long medical stays
          </span>

          <Card.Text className="mt-2">
            💰 {room.roomPrice} / night
          </Card.Text>

          <Card.Text className="text-muted">
            👥 Caregivers allowed: Up to 2
          </Card.Text>

          <Card.Text className="text-muted">
            🏥 Near major hospitals
          </Card.Text>

          <Link
            to={`/book-room/${room.id}`}
            className="btn btn-hotel btn-sm mt-2 w-100"
          >
            Book Medical Stay
          </Link>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default RoomCard
