import React from "react"

const RoomCarousel = ({ photos = [], carouselId }) => {
  // Always work with a clean array
  const safePhotos = Array.isArray(photos)
    ? photos.filter(p => typeof p === "string" && p.trim().length > 0)
    : []

  if (safePhotos.length === 0) {
    return (
      <div className="text-center text-muted py-3">
        No room photos available
      </div>
    )
  }

  // Unique carousel ID (prevents conflicts)
  const id =
    carouselId || `room-carousel-${Math.random().toString(36).slice(2)}`

  return (
    <div
      id={id}
      className="carousel slide mb-3"
      data-bs-ride="carousel"
    >
      {/* ===================== INDICATORS ===================== */}
      {safePhotos.length > 1 && (
        <div className="carousel-indicators">
          {safePhotos.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* ===================== SLIDES ===================== */}
      <div className="carousel-inner rounded">
        {safePhotos.map((photo, index) => {
          const src = photo.startsWith("http")
            ? photo
            : `data:image/jpeg;base64,${photo}`

          return (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={src}
                className="d-block w-100"
                alt={`Room ${index + 1}`}
                loading="lazy"
                style={{
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />
            </div>
          )
        })}
      </div>

      {/* ===================== CONTROLS ===================== */}
      {safePhotos.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </>
      )}
    </div>
  )
}

export default RoomCarousel
