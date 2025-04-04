import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"; // Reduce for a more subtle effect
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router";

export default function RegistrationPage() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-800 relative text-white p-6 flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_red,_transparent)] opacity-40"></div>
      <div className="flex flex-row justify-center gap-3 items-center mb-12">
        <img src="https://sdkkm.org/wp-content/uploads/2023/03/output-onlinepngtools-2.png?w=600" alt="SDKKM Logo" className="w-24 h-24" />
        <h1 className="text-5xl font-extrabold text-center text-white drop-shadow-lg relative z-10">
          Durga Puja 2025 Registration
        </h1>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col justify-between relative p-8 rounded-xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 w-full min-h-[400px] min-w-[300px] max-w-[400px]">
          <div className="">
            <h1 className="text-3xl font-bold text-white relative z-10">Registration</h1>
            <h2 className="text-xl text-gray-300 mt-2 italic">Lorem ipsum dolores....</h2>
          </div>
          <button
            className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
            onClick={() => { navigate("/cards") }}
          >
            Register Now
          </button>
        </div>
        <div className="flex flex-col justify-between relative p-8 rounded-xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 w-full min-h-[400px] max-w-[400px]">
          <div className="">
            <h1 className="text-3xl font-bold text-white relative z-10">Donation</h1>
            <h2 className="text-xl text-gray-300 mt-2 italic mb-4">Durga Puja and Kali Puja are not just festivals—they are vibrant expressions of our devotion, our heritage, and our collective soul as a Bengali community.
              <br />

              Each garland, each small offering, every saree that adorns our beloved Ma Durga and Ma Kali is more than a ritual—it is a gift of love from you, the devotee.
              <br />

              As we prepare for this year’s celebrations, we invite you to be a part of something deeply spiritual and unforgettable. Sponsor a sacred element of the Puja and offer it in your name or in honor of a loved one. Your support helps bring the Puja to life, and your name will be remembered among those who made this divine celebration possible.
              <br />

              Why Donate?
              <br />

              Because faith lives through action.
              <br />

              Because our children deserve to witness the beauty of our traditions.
              <br />
              Because every offering is a prayer answered.
              <br />
              Step into this sacred moment. Let your heart lead the way.
              <br />
              Sponsor today. Offer with devotion. Celebrate with pride.</h2>
          </div>
          <button
            className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
            onClick={() => { navigate("/donations") }}
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}

// const TiltCard = ({ packageData }) => {
//   const ref = useRef();

//   const included = new Set(packageData.benefits);

//   const navigate = useNavigate()

//   const handleClickPay = () => {
//     const payload = {
//       name: "SDKKM Puja Registration",
//       action: "payment",
//       token: "sdkkm.pujo.houston@gmail.com",
//       amount: "500", // or dynamic
//     };

//     const encoded = btoa(JSON.stringify(payload));
//     const zelleLink = `https://enroll.zellepay.com/qr-codes?data=${encoded}`;

//     window.open(zelleLink, "_blank");
//   }

//   return (
//     <motion.div
//       ref={ref}
//       style={{
//         transformStyle: "preserve-3d",
//       }}
//       className=" flex flex-col justify-between relative p-8 rounded-xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 w-full"
//     >
//       <div>
//         <h2 className="text-3xl font-bold text-white relative z-10">
//           {packageData.label}
//         </h2>
//         <h3 className="text-xl text-gray-300 mt-2 italic">{packageData.subTitle}</h3>
//         <ul
//           className="mt-4 space-y-2 relative z-10 mb-4"
//           style={{ transform: "translateZ(75px)" }}
//         >
//           {ALL_BENEFITS.map((benefit, i) => {
//             let isIncluded = null
//             if (included.has(benefit)) {
//               isIncluded = true
//             }
//             if (packageData.value !== 'donation' && benefit !== "Access to Durga Puja with one Meal" && packageData.value !== "daypass") {
//               return (
//                 <li
//                   key={i}
//                   className={`flex items-center space-x-2 text-gray-300`}
//                 >
//                   <span className="text-xl">
//                     {isIncluded ? "✅" : "❌"}
//                   </span>
//                   <span>{benefit}</span>
//                 </li>
//               );
//             } else if (packageData.value !== 'donation' && benefit === "Access to Durga Puja with one Meal" && packageData.value === "daypass") {
//               return (
//                 <li
//                   key={i}
//                   className={`flex items-center space-x-2 text-gray-300`}
//                 >
//                   <span className="text-xl">
//                     {isIncluded ? "✅" : "❌"}
//                   </span>
//                   <span>{benefit}</span>
//                 </li>
//               );
//             } else if (packageData.value !== 'donation' && packageData.value === "daypass" && benefit !== "Access to Durga Puja with one Meal") {
//               return (
//                 <li
//                   key={i}
//                   className={`flex items-center space-x-2 text-gray-300`}
//                 >
//                   <span className="text-xl">
//                     ❌
//                   </span>
//                   <span>{benefit}</span>
//                 </li>
//               );
//             }
//           })}
//         </ul>
//       </div>
//       {packageData.value !== "daypass" && packageData.value != 'donation' ? <button
//         className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
//         onClick={() => { navigate("/register", { state: { selectedPackageState: packageData.value } }) }}
//       >
//         Register Now
//       </button> : <button
//         className="w-full p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105"
//         onClick={() => { navigate("/donations", { state: { selectedPackageState: packageData.value } }) }}
//       >
//         Donate Now
//       </button>}
//       {packageData.value !== "patron" && <div><p className="p-5">Already pledged $100? Pay your remaining balance here:</p>
//         <button
//           onClick={handleClickPay}
//           className="p-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-lg shadow-lg transform transition duration-300 hover:scale-105 w-full"
//         >
//           Pay with Zelle
//         </button></div>}
//     </motion.div>
//   );
// };