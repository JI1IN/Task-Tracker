"use client"

import React from "react"

function Settings() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const getUsername = (email) => {
    if (!email) return ""
    return email.split("@")[0]
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>

      {user && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Username:</span> {getUsername(user.email)}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p className="text-gray-600 mb-4">
          Your settings page is currently empty. More options will be available soon.
        </p>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-3">Coming Soon</h3>
          <ul className="list-disc pl-5 text-gray-600">
            <li className="mb-2">Change password</li>
            <li className="mb-2">Update profile information</li>
            <li className="mb-2">Notification preferences</li>
            <li className="mb-2">Theme settings</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings

