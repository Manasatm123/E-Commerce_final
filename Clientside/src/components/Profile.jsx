import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
    accType: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    city: '',
    pincode: '',
    district: '',
    country: '',
  });

  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3003/api/getuserData', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(response.data.usr);
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to fetch profile information. Please try again later.');
      navigate('/');
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3003/api/getUserAddresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(response.data.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      alert('Failed to fetch addresses.');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3003/api/updateUser',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert('Profile updated successfully!');
        setProfileData(formData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleAddAddressToggle = () => {
    setShowAddressForm(!showAddressForm);
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3003/api/addAddress',
        newAddress,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        alert('Address added successfully!');
        setNewAddress({ city: '', pincode: '', district: '', country: '' });
        setShowAddressForm(false);
        fetchAddresses();
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to add address. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-left">
        <h2>Profile</h2>
        <div className="profile-info">
          {isEditing ? (
            <>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="accType">Acc Type:</label>
                <input
                  type="text"
                  id="accType"
                  name="accType"
                  value={formData.accType}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Username:</strong> {profileData.username}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Phone:</strong> {profileData.phone}</p>
              <p><strong>Acc Type:</strong> {profileData.accType}</p>
            </>
          )}
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <button className="save-btn" onClick={handleUpdateProfile}>
              Save
            </button>
          ) : (
            <button className="edit-btn" onClick={handleEditToggle}>
              Edit
            </button>
          )}
          <button className="logout-btn" onClick={() => navigate('/login')}>
            Logout
          </button>
          <button className="delete-btn" onClick={() => alert('Account deletion is not implemented yet!')}>
            Delete Account
          </button>
        </div>
      </div>

      <div className="profile-right">
        <div className="profile-buttons">
          <button className="cart-btn" onClick={() => navigate('/Cart')}>My Cart</button>
          <button className="wishlist-btn" onClick={() => navigate('/Wishlist')}>Wishlist</button>
          <button className="orders-btn" onClick={() => navigate('/MyOrder')}>My Orders</button>
          {profileData.accType === 'Seller' && (
            <Link to="/sellerprofile">
              <button className="seller-btn">Seller Dashboard </button>
            </Link>
          )}
        </div>
        <div className="address-section">
          <h3>Addresses</h3>
          {addresses.map((address) => (
            <p key={address._id}>
              {address.city}, {address.district}, {address.pincode}, {address.country}
            </p>
          ))}
          {showAddressForm ? (
            <div className="add-address-form">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleAddressInputChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={handleAddressInputChange}
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={newAddress.district}
                onChange={handleAddressInputChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={newAddress.country}
                onChange={handleAddressInputChange}
              />
              <button onClick={handleAddAddress}>Add Address</button>
              <button onClick={handleAddAddressToggle}>Cancel</button>
            </div>
          ) : (
            <button className="add-address-btn" onClick={handleAddAddressToggle}>
              + Add Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// // import ProfileInfo from "./ProfileInfo";
// // import Cart from "./Cart";
// // import Wishlist from "./Wishlist";
// // import MyOrder from "./MyOrder";
// import "./Profile.scss";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     accType: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(profileData);
//   const [addresses, setAddresses] = useState([]);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     city: "",
//     pincode: "",
//     district: "",
//     country: "",
//   });
//   const [activeSection, setActiveSection] = useState("profile");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     setFormData(profileData);
//   }, [profileData]);

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get("http://localhost:3003/api/getuserData", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProfileData(response.data.usr);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       alert("Failed to fetch profile information. Please try again later.");
//       navigate("/");
//     }
//   };

//   const fetchAddresses = async () => {
//     try {
//       const response = await axios.get("http://localhost:3003/api/getUserAddresses", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAddresses(response.data.data);
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//       alert("Failed to fetch addresses.");
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//     fetchAddresses();
//   }, []);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const response = await axios.put(
//         "http://localhost:3003/api/updateUser",
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 200) {
//         alert("Profile updated successfully!");
//         setProfileData(formData);
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile. Please try again.");
//     }
//   };

//   const handleAddAddressToggle = () => {
//     setShowAddressForm(!showAddressForm);
//   };

//   const handleAddressInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddAddress = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3003/api/addAddress",
//         newAddress,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 201) {
//         alert("Address added successfully!");
//         setNewAddress({ city: "", pincode: "", district: "", country: "" });
//         setShowAddressForm(false);
//         fetchAddresses();
//       }
//     } catch (error) {
//       console.error("Error adding address:", error);
//       alert("Failed to add address. Please try again.");
//     }
//   };

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//   };

//   const handleLogout = () => {
//     const confirmDelete = window.confirm("Are you sure you want to Logout?");
//     if (!confirmDelete) return;
//     localStorage.removeItem("token");
//     alert("Successfully logged out!");
//     navigate("/login");
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-left">
//         <h2>Profile</h2>
//         <ul>
//           <li onClick={() => handleSectionChange("profile")}>Profile Info</li>
//           {profileData.accType === "Buyer" && (
//             <>
//               <li onClick={() => handleSectionChange("cart")}>My Cart</li>
//               <li onClick={() => handleSectionChange("wishlist")}>Wishlist</li>
//               <li onClick={() => handleSectionChange("orders")}>My Orders</li>
//             </>
//           )}
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </div>

//       <div className="profile-content">
//         {activeSection === "profile" && (
//           <>
//             <div className="profile-info">
//               {isEditing ? (
//                 <>
//                   <div>
//                     <label htmlFor="username">Username:</label>
//                     <input
//                       type="text"
//                       id="username"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email">Email:</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone">Phone:</label>
//                     <input
//                       type="text"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p>
//                     <strong>Username:</strong> {profileData.username}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {profileData.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {profileData.phone}
//                   </p>
//                 </>
//               )}
//             </div>
//             <div className="profile-actions">
//               {isEditing ? (
//                 <button className="save-btn" onClick={handleUpdateProfile}>
//                   Save
//                 </button>
//               ) : (
//                 <button className="edit-btn" onClick={handleEditToggle}>
//                   Edit
//                 </button>
//               )}
//               <button className="delete-btn" onClick={() => alert("Account deletion is not implemented yet!")}>
//                 Delete Account
//               </button>
//             </div>
//           </>
//         )}
//         {activeSection === "cart" && profileData.accType === "Buyer" && <Cart />}
//         {activeSection === "wishlist" && profileData.accType === "Buyer" && <Wishlist />}
//         {activeSection === "orders" && profileData.accType === "Buyer" && <MyOrder />}
//       </div>

//       <div className="profile-right">
//         <h3>Addresses</h3>
//         {addresses.map((address) => (
//           <p key={address._id}>
//             {address.city}, {address.district}, {address.pincode}, {address.country}
//           </p>
//         ))}
//         {showAddressForm ? (
//           <div className="add-address-form">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={newAddress.city}
//               onChange={handleAddressInputChange}
//             />
//             <input
//               type="text"
//               name="pincode"
//               placeholder="Pincode"
//               value={newAddress.pincode}
//               onChange={handleAddressInputChange}
//             />
//             <input
//               type="text"
//               name="district"
//               placeholder="District"
//               value={newAddress.district}
//               onChange={handleAddressInputChange}
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={newAddress.country}
//               onChange={handleAddressInputChange}
//             />
//             <button onClick={handleAddAddress}>Add Address</button>
//             <button onClick={handleAddAddressToggle}>Cancel</button>
//           </div>
//         ) : (
//           <button className="add-address-btn" onClick={handleAddAddressToggle}>
//             + Add Address
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
