import React from "react"

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919880685836?text=Hello%20I%20need%20medical%20stay%20details"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        zIndex: 1000,
        textDecoration: "none"
      }}
    >
      💬
    </a>
  )
}

export default WhatsAppButton
