import React, { useState } from "react";

const ClaimHelpdesk = () => {
  const [state, setState] = useState("");
  const [helplineNumber, setHelplineNumber] = useState("");

  const handleStateChange = (selectedState) => {
    setState(selectedState);

    const helplineNumbers = {
  
    };

    setHelplineNumber(helplineNumbers[selectedState] || "");
  };

  
  const statesOfIndia = [
    "Dhaka",

  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Health Insurance Claim Helpdesk
      </h2>
      <div className="mb-4">
        <label className="block font-medium" htmlFor="state">
          Select State:
        </label>
        <select
          id="state"
          name="state"
          className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          value={state}
          onChange={(e) => handleStateChange(e.target.value)}
          required
        >
          <option value="">Select State</option>
          {statesOfIndia.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      {helplineNumber && (
        <div className="mb-4">
          <p className="font-medium">Helpline Number for {state}:</p>
          <p>{helplineNumber}</p>
        </div>
      )}
      <div>
        <p className="font-medium">Other Relevant Information:</p>
        <p>
          If you have any queries or need assistance with your health insurance
          claim, our helpdesk is available to support you. Please reach out to
          the helpline number for your respective state.
        </p>
        <p>
          Our experienced representatives will guide you through the claim
          process, provide you with the necessary information, and address any
          concerns you may have regarding your health insurance claim.
        </p>
        <p>
          For urgent matters or emergencies, kindly dial our 24/7 helpline
          number for immediate assistance and support.
        </p>
        <p>
          Thank you for choosing us as your health insurance provider. We are
          committed to ensuring a seamless and hassle-free claim experience for
          you.
        </p>
      </div>
    </div>
  );
};

export default ClaimHelpdesk;
