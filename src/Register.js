import { doc, setDoc } from 'firebase/firestore';
import React, { use, useEffect, useState } from 'react'
import { db } from './firebase';
import { useLocation, useNavigate } from 'react-router';

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
  });

  const location = useLocation();
  const { selectedPackageState } = location.state || {};

  const [selectedPackage, setSelectedPackage] = useState(selectedPackageState);

  const [multiChecked, setMultiChecked] = useState(false);
  const [singleChecked, setSingleChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedPackage);
  }, [selectedPackage]);

  useEffect(() => {
    if (selectedPackageState) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        package: selectedPackageState,
      }));
    }
    console.log(formData);
  }, [selectedPackageState]);

  const packages = [
    {
      label: "Puja Patron - $1500",
      value: "patron",
      benefits: [
        "Durga Puja - All Meals",
        "Kali Puja - All Meals",
        "Saraswati Puja - All Meals",
        "Bijoya Sanmilani Picnic Included",
        "Puja Sankalpa (1 per family)",
        "Reserved On-site Parking",
        "Exclusive Food Line & Seating for Seniors",
        "Participation in Cultural Program",
        "Recognition on SDKKM Banner",
      ],
    },
    {
      label: "Puja Membership - Single $300 / Family $500",
      value: "membership",
      benefits: [
        "Durga Puja - All Meals",
        "Kali Puja - All Meals",
        "Saraswati Puja - All Meals",
        "Bijoya Sanmilani Picnic Included",
        "Puja Sankalpa (1 per family)",
        "Exclusive Food Line & Seating for Seniors",
        "Participation in Cultural Program",
      ],
    },
    {
      label: "Puja Package - Single $200 / Family $300",
      value: "package",
      benefits: [
        "Durga Puja - All Meals",
        "Kali Puja - All Meals",
        "On-site Parking",
        "Exclusive Food Line & Seating for Seniors",
      ],
    },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.package || !multiChecked && !singleChecked) {
      setLoading(false);
      alert("Please fill out all fields.");
      return;
    }

    const selectedPkg = packages.find((pkg) => pkg.value === formData.package);
    if (!selectedPkg) {
      alert("Please select a package.");
      return;
    }

    await setDoc(doc(db, "registrations", formData.name), { formData, paid: false, multiChecked, singleChecked });

    const price = getPrice(selectedPkg.label);

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
    if (e.target.name === "package") {
      setSelectedPackage(e.target.value);
    }
  };



  // Helper function to get the price based on label
  const getPrice = (label) => {
    if (label.includes("Patron")) return 1500;
    if (label.includes("Membership")) return 500;
    if (label.includes("Package")) return 300;
    if (label.includes("Day Pass")) return 150;
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-800 relative text-white p-6 flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_red,_transparent)] opacity-40"></div>
      <div className="max-w-lg mx-auto mt-16 backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-xl shadow-2xl relative z-10 before:absolute before:inset-0 before:bg-noise-texture before:opacity-10 before:pointer-events-none">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Register Now
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
            name="package"
            value={selectedPackage}
            onChange={handleChange}
            required
            className="w-full p-4 bg-black/40 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="" disabled>
              Select a Package
            </option>
            {packages.map((pkg) => (
              <option key={pkg.value} value={pkg.value}>
                {pkg.label}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-3">
            <div className='flex flex-row gap-3 items-start'>
              <input
                type='checkbox'
                value={"singlepay"}
                className='mt-2'
                onChange={() => {
                  setSingleChecked(!singleChecked);
                  setMultiChecked(false);
                }}
                disabled={multiChecked}
              />
              <label className="text-white">I'm in! I'll pay today to lock in my early bird discount. Early bird discount expires 8/15</label>
            </div>
            <div className='flex flex-row gap-3 items-start'>
              <input
                type='checkbox'
                value={"multipay"}
                className='mt-2'
                onChange={() => {
                  setMultiChecked(!multiChecked);
                  setSingleChecked(false);
                }}
                disabled={singleChecked}
              />
              <label className="text-white">I'm in! I'll pledge $100 today and take advantage of early bird pricing by paying the balance by 8/15</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
            onSubmit={handleSubmit}
          >
            Register Now
          </button>
          <button
            className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
            onClick={() => { navigate("/") }}
            disabled={loading}
          >
            Back To Packages
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register