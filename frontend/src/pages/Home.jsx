import React, { useEffect, useState } from "react";
import { getCompanies } from "../services/api";
import CompanyCard from "../components/CompanyCard";
import {Link} from "react-router-dom";

export default function Home(){
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [city, setCity] = useState("");
   const [loading, setLoading] = useState(true);
 
   //debounce search
   useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    },500);

    return () => clearTimeout(timer);
   }, [search]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await getCompanies({
          search: debouncedSearch,
          sort,
          city,
       });
      setCompanies(res.data);

    } catch(err) {
      console.error("Error fetching companies:", err);
    } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [debouncedSearch, sort, city]);


  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="flex flex-wrap gap-4 mb-8">
        <input type="text"
        placeholder="Search company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded-md w-64" />

        <select value={city}
         onChange={(e) =>
          setCity(e.target.value)}
          className="border px-4 py-2 rounded-md">
            
           <option value="">All Cities</option>
           <option value="Indore">Indore</option>
           <option value="Bhopal">Bhopal</option>
           <option value="Gurgoan">Gurgoan</option>
           <option value="Pune">Pune</option>
          </select>

          <select value={sort}
           onChange={(e) => setSort(e.target.value)}
           className="border px-4 py-2 rounded-md">
           <option value="name">Name</option>
           <option value="-createdAt">Newest</option>
           <option value="-averageRating">Top Rated</option>
          </select>
          <Link to="/add-company"
          className="bg-purple-600 text-white px-4 py-2 rounded-md">
            + Add Company
          </Link>
      </div>

        

        {loading ? (
          <p>Loading companies...</p>
        ) : companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          companies.map((company) => (
          <CompanyCard key={company._id} company={company}/>
        ))
      )}

    </div>

  );
}