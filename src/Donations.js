import { doc, setDoc } from 'firebase/firestore';
import React, { use, useEffect, useState } from 'react'
import { db } from './firebase';
import { useLocation, useNavigate } from 'react-router';

const Donations = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    donationString: "",
  });

  const location = useLocation();

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const packages = [
    // {
    //   label: "Puja Patron - $1500",
    //   value: "patron",
    //   benefits: [
    //     "Durga Puja - All Meals",
    //     "Kali Puja - All Meals",
    //     "Saraswati Puja - All Meals",
    //     "Bijoya Sanmilani Picnic Included",
    //     "Puja Sankalpa (1 per family)",
    //     "Reserved On-site Parking",
    //     "Exclusive Food Line & Seating for Seniors",
    //     "Participation in Cultural Program",
    //     "Recognition on SDKKM Banner",
    //   ],
    // },
    // {
    //   label: "Puja Membership - Single $300 / Family $500",
    //   value: "membership",
    //   benefits: [
    //     "Durga Puja - All Meals",
    //     "Kali Puja - All Meals",
    //     "Saraswati Puja - All Meals",
    //     "Bijoya Sanmilani Picnic Included",
    //     "Puja Sankalpa (1 per family)",
    //     "Exclusive Food Line & Seating for Seniors",
    //     "Participation in Cultural Program",
    //   ],
    // },
    // {
    //   label: "Puja Package - Single $200 / Family $300",
    //   value: "package",
    //   benefits: [
    //     "Durga Puja - All Meals",
    //     "Kali Puja - All Meals",
    //     "On-site Parking",
    //     "Exclusive Food Line & Seating for Seniors",
    //   ],
    // },
    {
      label: "Puja Donation",
      value: "donation",
      subTitle: `Durga Puja and Kali Puja are not just festivals—they are vibrant expressions of our devotion, our heritage, and our collective soul as a Bengali community. /n

Each garland, each small offering, every saree that adorns our beloved Ma Durga and Ma Kali is more than a ritual—it is a gift of love from you, the devotee. /n

As we prepare for this year’s celebrations, we invite you to be a part of something deeply spiritual and unforgettable.  Sponsor a sacred element of the Puja and offer it in your name or in honor of a loved one.Your support helps bring the Puja to life, and your name will be remembered among those who made this divine celebration possible. /n

Why Donate? /n

Because faith lives through action. /n

Because our children deserve to witness the beauty of our traditions. /n

Because every offering is a prayer answered.  /n

Step into this sacred moment.Let your heart lead the way. /n

Sponsor today.Offer with devotion.Celebrate with pride.`,
      donationAmounts: [
        "Garlands for idols x 5 - $200 each",
        "Flowers x 5 - $100 each",
        "Sweet for bhog each time x 5 - $100 each offering",
        "Saree x4 - $100 each",
        "Dhoti x 2 - $100 each",
        "Fruits x 5 - $100 each offering",
        "Tea x5 - $50",
        "Water x 5 - $50",
        "MahaShashthi Night Balak/Balika Bhojan (Pizza) - $150",
        "Maha-Ashtami Night Balak/Balika Bhojan (Pizza) - $200",
        "Durga Puja Samogri x3 - $100"
      ]
    }
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.donationString) {
      setLoading(false);
      alert("Please fill out all fields.");
      return;
    }

    const price = getPrice(selectedDonation);

    await setDoc(doc(db, "donations", formData.name), { formData, paid: false, donationAmount: price });

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



  // Helper function to get the price based on label
  const getPrice = (label) => {
    const donationObject = {
      "Garlands for idols x 5 - $200 each": 200,
      "Flowers x 5 - $100 each": 100,
      "Sweet for bhog each time x 5 - $100 each offering": 100,
      "Saree x4 - $100 each": 100,
      "Dhoti x 2 - $100 each": 100,
      "Fruits x 5 - $100 each offering": 100,
      "Tea x5 - $50": 50,
      "Water x 5 - $50": 50,
      "MahaShashthi Night Balak/Balika Bhojan (Pizza) - $150": 150,
      "Maha-Ashtami Night Balak/Balika Bhojan (Pizza) - $200": 200,
      "Durga Puja Samogri x3 - $100": 100
    }
    return donationObject[label] || 0;
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
          <select
            name="donationString"
            value={formData.donationString}
            onChange={handleChange}
            required
            className="w-full p-4 bg-black/40 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="" disabled>
              Select a Package
            </option>
            {packages[0].donationAmounts.map((donation) => (
              <option key={donation} value={donation}>
                {donation}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
            onSubmit={handleSubmit}
          >
            Donate Now
          </button>
          <button
            className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
            onClick={() => { navigate("/") }}
            disabled={loading}
          >
            Back To Packages and Donations
          </button>
        </form>
      </div>
    </div>
  )
}

export default Donations