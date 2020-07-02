import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
  if (!successMessage && !errorMessage) {
    return null
  }

  if (successMessage) {
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  }
  else if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
}

export default Notification