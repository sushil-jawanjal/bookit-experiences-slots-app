import { Link } from "react-router-dom";

export default function ExperienceCard({ exp }) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md flex flex-col overflow-hidden mt-10">
      {/* Experience Image */}
      <img
        src={exp.image}
        alt={exp.title}
        className="h-50 w-full object-cover"
      />
      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title and Location Badge */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-base mr-2">{exp.title}</h3>
          {exp.location && (
            <span className="text-xs bg-gray-300 px-2 py-1 rounded">
              {exp.location}
            </span>
          )}
        </div>
        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 flex-1">{exp.description}</p>
        {/* Price + Button */}
        <div className="flex items-center justify-between mt-2">
          <div className="text-base font-semibold ">
            From <span className="font-bold text-xl">₹{exp.price}</span>
          </div>
          <Link to={`/details/${exp._id}`}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold px-4 py-2 rounded shadow transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
