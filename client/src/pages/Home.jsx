import { useEffect, useState } from "react";
import axios from "axios";
import ExperienceCard from "../components/ExperienceCard";

export default function Home({ searchTerm }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/experiences`)
      .then((res) => {
        setExperiences(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredExperiences = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : filteredExperiences.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {filteredExperiences.map((exp) => (
            <ExperienceCard key={exp._id} exp={exp} />
          ))}
        </div>
      ) : (
        <p>No experiences found.</p>
      )}
    </main>
  );
}
