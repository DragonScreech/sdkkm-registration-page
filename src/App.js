import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"; // Reduce for a more subtle effect
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router";

const ALL_BENEFITS = [
  "Access to Durga Puja with one Meal",
  "Durga Puja - All Meals",
  "Kali Puja - All Meals",
  "Saraswati Puja - All Meals",
  "Bijoya Sanmilani Picnic Included",
  "Puja Sankalpa (1 per family)",
  "Reserved On-site Parking",
  "Exclusive Food Line & Seating for Seniors",
  "Participation in Cultural Program",
  "Recognition on SDKKM Banner",
];

export default function RegistrationPage() {

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
      subTitle: "Early Bird Pricing Avaliable.",
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
    //     {
    //       label: "Puja Donation",
    //       value: "donation",
    //       subTitle: `Durga Puja and Kali Puja are not just festivals—they are vibrant expressions of our devotion, our heritage, and our collective soul as a Bengali community.

    // Each garland, each small offering, every saree that adorns our beloved Ma Durga and Ma Kali is more than a ritual—it is a gift of love from you, the devotee.

    // As we prepare for this year’s celebrations, we invite you to be a part of something deeply spiritual and unforgettable.Sponsor a sacred element of the Puja and offer it in your name or in honor of a loved one.Your support helps bring the Puja to life, and your name will be remembered among those who made this divine celebration possible.

    // Why Donate?

    // Because faith lives through action.

    // Because our children deserve to witness the beauty of our traditions.

    // Because every offering is a prayer answered.

    // Step into this sacred moment.Let your heart lead the way.

    // Sponsor today.Offer with devotion.Celebrate with pride.`
    //     }
    // {
    //   label: "Day Pass",
    //   subTitle: "A One Day Pass is available only for those whose current financial circumstances might prevent them from registering through our regular membership tiers. If this applies to you, please contact us at sdkkm.pujo.houston@gmail.com and we’ll happily work with you to ensure you can still be part of the celebration.",
    //   value: "daypass",
    //   benefits: ["Access to Durga Puja with one Meal"],
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-800 relative text-white p-6 flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_red,_transparent)] opacity-40"></div>
      <div className="flex flex-row justify-center gap-3 items-center mb-12">
        <img src="https://sdkkm.org/wp-content/uploads/2023/03/output-onlinepngtools-2.png?w=600" alt="SDKKM Logo" className="w-24 h-24" />
        <h1 className="text-5xl font-extrabold text-center text-white drop-shadow-lg relative z-10">
          Durga Puja 2025 Registration
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-10">
        {packages.map((pkg) => (
          <TiltCard key={pkg.value} packageData={pkg} />
        ))}
      </div>
    </div>
  );
}

const TiltCard = ({ packageData }) => {
  const ref = useRef();

  const included = new Set(packageData.benefits);

  const navigate = useNavigate()

  const handleClickPay = () => {
    const payload = {
      name: "SDKKM Puja Registration",
      action: "payment",
      token: "sdkkm.pujo.houston@gmail.com",
      amount: "500", // or dynamic
    };

    const encoded = btoa(JSON.stringify(payload));
    const zelleLink = `https://enroll.zellepay.com/qr-codes?data=${encoded}`;

    window.open(zelleLink, "_blank");
  }

  return (
    <motion.div
      ref={ref}
      style={{
        transformStyle: "preserve-3d",
      }}
      className=" flex flex-col justify-between relative p-8 rounded-xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20"
    >
      <div>
        <h2 className="text-3xl font-bold text-white relative z-10">
          {packageData.label}
        </h2>
        <h3 className="text-xl text-gray-300 mt-2 italic">{packageData.subTitle}</h3>
        <ul
          className="mt-4 space-y-2 relative z-10 mb-4"
          style={{ transform: "translateZ(75px)" }}
        >
          {ALL_BENEFITS.map((benefit, i) => {
            let isIncluded = null
            if (included.has(benefit)) {
              isIncluded = true
            }
            if (packageData.value !== 'donation' && benefit !== "Access to Durga Puja with one Meal" && packageData.value !== "daypass") {
              return (
                <li
                  key={i}
                  className={`flex items-center space-x-2 text-gray-300`}
                >
                  <span className="text-xl">
                    {isIncluded ? "✅" : "❌"}
                  </span>
                  <span>{benefit}</span>
                </li>
              );
            } else if (packageData.value !== 'donation' && benefit === "Access to Durga Puja with one Meal" && packageData.value === "daypass") {
              return (
                <li
                  key={i}
                  className={`flex items-center space-x-2 text-gray-300`}
                >
                  <span className="text-xl">
                    {isIncluded ? "✅" : "❌"}
                  </span>
                  <span>{benefit}</span>
                </li>
              );
            } else if (packageData.value !== 'donation' && packageData.value === "daypass" && benefit !== "Access to Durga Puja with one Meal") {
              return (
                <li
                  key={i}
                  className={`flex items-center space-x-2 text-gray-300`}
                >
                  <span className="text-xl">
                    ❌
                  </span>
                  <span>{benefit}</span>
                </li>
              );
            }
          })}
        </ul>
      </div>
      {packageData.value !== "daypass" && packageData.value != 'donation' ? <button
        className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
        onClick={() => { navigate("/register", { state: { selectedPackageState: packageData.value } }) }}
      >
        Register Now
      </button> : <button
        className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
        onClick={() => { navigate("/donations", { state: { selectedPackageState: packageData.value } }) }}
      >
        Donate Now
      </button>}
      <p className="p-5">Already pledged $100? Pay your remaining balance here:</p>
      <button
        onClick={handleClickPay}
        className="p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
      >
        Pay with Zelle
      </button>
    </motion.div>
  );
};