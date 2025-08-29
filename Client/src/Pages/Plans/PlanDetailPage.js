import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import QL from "./plansdata/QL";
import Hightlight from "./plansdata/Hightlight";
import Detaillist from "./plansdata/Detaillist";
import GetStarted from "./plansdata/GetStarted";
import Banner from "./plansdata/Banner";
import Review from "../Home/Review";
import Accordion from "./Accordian";
import InsurancePlan from "./plansdata/InsurancePlan";
import GeneralTerms from "./plansdata/GeneralTerms";
import axios from "axios";

const PlanDetailPage = () => {
  const { _id } = useParams();
  const planId = _id; 
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    axios
      .get(`http://localhost:5000/plans/${planId}`)
      .then((response) => {
       
        const planData = response.data;
        setPlan(planData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [planId]);

  if (loading) {
    
    return <div>Loading...</div>;
  }

  if (!plan) {
    return <div>Plan not found</div>;
  }


  return (
    <div>
      <Header />
      <QL />
      <Hightlight />
      <Detaillist />
      <InsurancePlan planName={plan.planName} premiums={plan.premiums} />
      <GeneralTerms />
      <Review />
      <Banner />
      <GetStarted />
      <Accordion />
    </div>
  );
};

export default PlanDetailPage;
