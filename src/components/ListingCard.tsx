import { Link } from "react-router-dom";

const ListingCard = ({ id, title, image, price, location }: any) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-900 font-bold">{price}€ / nuit</p>
        <Link
          to={`/listing/${id}`}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Voir plus
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
