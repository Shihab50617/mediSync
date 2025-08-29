import React from "react";

const ClaimStatus = () => {
 
  const claimStatusData = [
    {
      
    },
    {
      
    },
    
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Claim Status</h2>
      {claimStatusData.length === 0 ? (
        <p>No claim status available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Claim Number</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Policy Holder</th>
                <th className="p-2 border">Phone Number</th>
                <th className="p-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {claimStatusData.map((claim) => (
                <tr key={claim.claimNumber} className="hover:bg-gray-50">
                  <td className="p-2 border">{claim.claimNumber}</td>
                  <td className="p-2 border">{claim.status}</td>
                  <td className="p-2 border">{claim.amount}</td>
                  <td className="p-2 border">{claim.date}</td>
                  <td className="p-2 border">{claim.policyHolder}</td>
                  <td className="p-2 border">{claim.phoneNumber}</td>
                  <td className="p-2 border">{claim.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClaimStatus;
