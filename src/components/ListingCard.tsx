import { Link } from "react-router-dom";

interface ListingProps {
  id: number;
  title: string;
  image: string;
  price: number;
  location: string;
}

const ListingCard: React.FC<ListingProps> = ({ id, title, image, price, location }) => {
  return (
    <Link to={`/listing/${id}`} className="block rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 bg-white">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-900 font-bold mt-2">{price}€ / nuit</p>
      </div>
    </Link>
  );
};

export default ListingCard;
