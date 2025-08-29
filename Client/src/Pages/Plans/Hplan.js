import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import { useAuth } from "./Auth/auth"; 

const Hplan = () => {
  const [allPlans, setAllPlans] = useState([]);         
  const [filteredPlans, setFilteredPlans] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

 useEffect(() => {
  axios.get("http://localhost:5000/plans/getAll")
    .then(res => {
      console.log("Axios response:", res);       
      console.log("Axios data:", res.data);       
      setAllPlans(res.data);
      setFilteredPlans(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Axios error:", err);
      setLoading(false);
    });
}, []);


  
  useEffect(() => {
    const filtered = allPlans.filter((plan) => {
      const matchesSearch = plan.title?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All categories" || !plan.category || plan.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredPlans(filtered);
  }, [searchQuery, selectedCategory, allPlans]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-blue-600 font-bold my-5">ALL HEALTH PLANS</div>
      <div className="font-bold my-3 text-5xl">
        Best Health Insurance Plans to Secure Yourself
      </div>

      {/* Search & Category */}
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center justify-center w-full my-5">
        <div className="relative flex-shrink-0">
          <button
            onClick={toggleDropdown}
            className="z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            type="button"
          >
            {selectedCategory}
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="z-10 absolute mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
              <ul className="py-3 text-sm text-gray-700">
                {["All categories", "Family", "Diabetes", "Cardiac", "Disease Specific"].map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(cat)}
                      className={`inline-flex w-full px-4 py-2 hover:bg-gray-100 ${selectedCategory === cat ? "bg-gray-100" : ""}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative w-[700px]">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-200 rounded-r-lg border-l-2 border-blue-500 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Family, Disease Specific, Cardiac, Diabetes..."
          />
          <button
            type="submit"
            className="absolute top-0 right-0 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:ring-blue-300 focus:outline-none focus:ring"
          >
            🔍
          </button>
        </div>
      </form>

      {/* Plan List */}
      {loading ? (
        <div>Loading...</div>
      ) : filteredPlans.length === 0 ? (
        <div className="text-red-600 font-bold">No plans found.</div>
      ) : (
        filteredPlans.map((plan) => (
          <div key={plan._id || plan.id} className="max-w-7xl">
            <div className="overflow-hidden bg-white m-4 shadow-lg flex flex-col md:flex-row">
              <div className="w-48 h-48 md:w-1/3 md:h-auto">
                <img src={plan.img} alt={plan.title} className="w-full h-full object-cover" />
              </div>
              <div className="grid p-4 w-full md:w-2/3">
                <div className="font-bold text-black mt-6 text-xl h-14">{plan.title || "No Title"}</div>
                <div className="text-gray-500 my-2 text-md leading-6 h-24 overflow-hidden">
                  <p className="font-medium">{plan.content1 || ""}</p>
                  <p className="font-medium">{plan.content2 || ""}</p>
                  <p className="font-medium">{plan.content3 || ""}</p>
                </div>
                <div className="flex items-center h-12">
                  <Link
                    to={user ? `/plans/${plan._id}` : "/login"}
                    className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white ${
                      user ? "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300" : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300"
                    } rounded-md h-10 w-32`}
                  >
                    View Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Hplan;
