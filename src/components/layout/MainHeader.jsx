import React from "react"

const MainHeader = () => {
  return (
    <header className="header-banner">
      <div className="overlay"></div>
      <div className="animated-texts overlay-content text-center">
        <h1>
          Healing Stays at <span className="hotel-color">Dentro Hills</span>
        </h1>

        <h4 className="mt-3">
          Comfortable, hygienic stays for patients & families near hospitals
        </h4>

        <p className="mt-3">
          Designed for medical travelers • Long stays • Caregiver friendly
        </p>
      </div>
    </header>
  )
}

export default MainHeader
