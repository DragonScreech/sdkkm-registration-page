import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "registrations"));
      const records = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(records);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-2xl relative z-10">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          SDKKM 2025 Pujo Registration Report
        </h1>

        {data.length === 0 ? (
          <p className="text-center text-gray-300">Loading data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border-collapse">
              <thead className="bg-red-600/70 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Package</th>
                  <th className="px-4 py-3 text-left"># People</th>
                  <th className="px-4 py-3 text-left">Paid ($)</th>
                  <th className="px-4 py-3 text-left">Outstanding ($)</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Paid in Full</th>
                  <th className="px-4 py-3 text-left">Multi-Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.map((row, index) => (
                  <tr key={index} className="hover:bg-white/5">
                    <td className="px-4 py-3">{row.formData.name}</td>
                    <td className="px-4 py-3">{row.formData.email}</td>
                    <td className="px-4 py-3">{row.formData.phone}</td>
                    <td className="px-4 py-3 capitalize">{row.formData.package}</td>
                    <td className="px-4 py-3">{row.formData.numberOfPeople}</td>
                    <td className="px-4 py-3">${row.amountPaid}</td>
                    <td className="px-4 py-3">${row.amountOutstanding}</td>
                    <td className="px-4 py-3">{row.date?.toDate().toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-sm font-semibold ${row.paid ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {row.paid ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.multiChecked ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
