import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useNavigate } from 'react-router';

const Donations = () => {
  const [donationItems, setDonationItems] = useState([
    { name: "Garlands for Durga Puja", price: 200, slots: 5, sponsors: [] },
    { name: "Flowers for Durga Puja", price: 100, slots: 5, sponsors: [] },
    { name: "Sweets for Durga Puja bhog each time", price: 100, slots: 5, sponsors: [] },
    { name: "Saree for Durga Puja", price: 100, slots: 4, sponsors: [] },
    { name: "Dhoti for Durga Puja", price: 100, slots: 2, sponsors: [] },
    { name: "Fruits for Durga Puja", price: 100, slots: 5, sponsors: [] },
    { name: "Tea for Durga Puja", price: 50, slots: 5, sponsors: [] },
    { name: "Water for Durga Puja", price: 50, slots: 5, sponsors: [] },
    { name: "Maha-Shashthi Night Balak/Balika Bhojan (Pizza for Kids)", price: 150, slots: 1, sponsors: [] },
    { name: "Maha-Ashtami Night Balak/Balika Bhojan (Pizza for Kids)", price: 200, slots: 1, sponsors: [] },
    { name: "Durga Puja Samogri", price: 100, slots: 3, sponsors: [] },
    { name: "Garlands for Kali Puja", price: 200, slots: 1, sponsors: [] },
    { name: "Flowers for Kali Puja", price: 100, slots: 4, sponsors: [] },
    { name: "Sweets for Kali Puja bhog", price: 100, slots: 1, sponsors: [] },
    { name: "Saree for Kali Puja", price: 100, slots: 1, sponsors: [] },
    { name: "Fruits for Kali Puja", price: 100, slots: 1, sponsors: [] },
    { name: "Tea for Kali Puja", price: 50, slots: 1, sponsors: [] },
    { name: "Water for Kali Puja", price: 50, slots: 1, sponsors: [] },
    { name: "Kali Pujo Night Balak/Balika Bhojan (Pizza for Kids)", price: 150, slots: 1, sponsors: [] },
    { name: "Kali Puja Samogri", price: 100, slots: 1, sponsors: [] },
  ]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const updatedItems = [...donationItems];
      for (const item of updatedItems) {
        const q = query(collection(db, "donations"), where("donationName", "==", item.name));
        const querySnapshot = await getDocs(q);
        item.sponsors = []; // Initialize sponsors array for each item
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const sponsorName = doc.data().formData.name;
            item.sponsors.push(sponsorName); // Add sponsor name to the array
          });
        }
      }
      setDonationItems(updatedItems); // Update state with the fetched data
    };

    fetchSponsors(); // Call the async function
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 relative text-white p-6 flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_red,_transparent)] opacity-40"></div>
      <div className="flex flex-row justify-center gap-3 items-center mb-12">
        <img src="https://sdkkm.org/wp-content/uploads/2023/03/output-onlinepngtools-2.png?w=600" alt="SDKKM Logo" className="w-24 h-24" />
        <h1 className="text-5xl font-extrabold text-center text-white drop-shadow-lg relative z-10">
          Durga Puja 2025 Registration
        </h1>
      </div>
      <div className="flex flex-col gap-12 items-center">
        {donationItems.map((donationData) => (
          <ItemCard key={donationData.name} donationData={donationData} />
        ))}
      </div>
    </div>
  );
};

export default Donations;

const ItemCard = ({ donationData }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        transformStyle: "preserve-3d",
      }}
      className="flex flex-col justify-between relative p-8 rounded-xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 w-full"
    >
      <div>
        <h2 className="text-3xl font-bold text-white relative z-10">
          {donationData.name}
        </h2>
        <h3 className="text-xl text-gray-300 mt-2 italic">${donationData.price} - {donationData.slots - donationData.sponsors.length !== 0 ? `${donationData.slots - donationData.sponsors.length} slot${donationData.slots - donationData.sponsors.length == 1 ? "" : "s"} remaining` : "All slots filled"}</h3>
        {donationData.sponsors.length > 0 && <h3 className="text-xl text-gray-300 mt-2 italic">Thank you to our sponsors:</h3>}
        <ul
          className="mt-4 space-y-2 relative z-10 mb-4"
          style={{ transform: "translateZ(75px)" }}
        >
          {donationData.sponsors.length > 0 ? (
            donationData.sponsors.map((sponsorName) => (
              <li
                key={sponsorName}
                className="flex items-center space-x-2 text-gray-300"
              >
                <span className="text-xl">•</span>
                <span>{sponsorName}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-300 italic text-xl">No sponsors yet</li>
          )}
        </ul>
      </div>
      {donationData.slots - donationData.sponsors.length !== 0 ? <button
        className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
        onClick={() => { navigate("/donationForm", { state: { selectedItem: donationData } }) }}
      >
        Sponsor This Item
      </button> : <button
        className="w-full p-4 bg-gray-500 rounded-lg text-white font-bold text-lg shadow-lg transform"
        disabled
        onClick={() => { navigate("/donationForm", { state: { selectedItem: donationData } }) }}
      >
        Sold Out! Sponsorship for this item is now closed
      </button>}
    </div>
  );
};