import { doc, setDoc } from 'firebase/firestore';
import React, { use, useEffect, useState } from 'react'
import { db } from './firebase';
import { useLocation, useNavigate } from 'react-router';

const DonationForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const location = useLocation();

  const { selectedItem } = location.state || {};

  const [selectedDonation, setSelectedDonation] = useState(selectedItem);

  const [loading, setLoading] = useState(false);
  const [boxChecked, setBoxChecked] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.phone || boxChecked === false) {
      setLoading(false);
      alert("Please fill out all fields.");
      return;
    }

    const price = selectedDonation.price;
    const donationString = selectedDonation.name;

    await setDoc(doc(db, "donations", formData.name), { formData, paid: false, donationAmount: price, donationName: donationString });

    const payload = {
      name: "SDKKM Puja Registration",
      action: "payment",
      token: "sdkkm.pujo.houston@gmail.com",
      amount: price.toString()
    };

    const encoded = btoa(JSON.stringify(payload));
    const zelleLink = `https://enroll.zellepay.com/qr-codes?data=${encoded}`;

    window.open(zelleLink, "_blank");
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "donationString") {
      setSelectedDonation(e.target.value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 relative text-white p-6 flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_red,_transparent)] opacity-40"></div>
      <div className="max-w-lg mx-auto mt-16 backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-xl shadow-2xl relative z-10 before:absolute before:inset-0 before:bg-noise-texture before:opacity-10 before:pointer-events-none">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Donate Now
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 bg-black/40 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 bg-black/40 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-4 bg-black/40 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <div className='flex flex-row gap-3 items-start'>
            <input
              type='checkbox'
              value={boxChecked}
              className='mt-2'
              onChange={() => {
                setBoxChecked(!boxChecked);
              }}
            />
            <label className="text-white">{`I’m in! I’ll proudly sponsor $${selectedDonation.price} towards the ${selectedDonation.name}!`}</label>
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
            onSubmit={handleSubmit}
          >
            Sponsor Using Zelle
          </button>
          <button
            className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
            onClick={() => { navigate("/donations") }}
            disabled={loading}
          >
            Back To Donations
          </button>
        </form>
      </div>
    </div>
  )
}

export default DonationForm