import { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`https://dummyjson.com/users/${user.id}`);
      const data = await res.json();
      setUserData(data);
    }
    fetchUser();
  }, [user.id]);

  return (
    <div className="vh-100 d-flex flex-column me-0">
      <h2>Profile</h2>
      {userData ? 
      (
        <div className="card w-100 p-3">
          <p><b>Name:</b> {userData.firstName} {userData.lastName}</p>
          <p><b>Email:</b> {userData.email}</p>
          <p><b>Username:</b> {userData.username}</p>
        </div>
      ) 
      : 
      (
        <p>Loading...</p>
      )}
    </div>
  );
}
