import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const mockListings = [
  { id: 1, title: "Appartement cosy à Paris", image: "https://source.unsplash.com/800x500/?apartment", price: 120, location: "Paris, France", lat: 48.8566, lng: 2.3522, description: "Un superbe appartement situé en plein cœur de Paris." },
  { id: 2, title: "Villa avec piscine à Nice", image: "https://source.unsplash.com/800x500/?villa", price: 250, location: "Nice, France", lat: 43.7102, lng: 7.2620, description: "Une villa de rêve avec vue sur la mer." },
  { id: 3, title: "Chalet en montagne", image: "https://source.unsplash.com/800x500/?chalet", price: 180, location: "Chamonix, France", lat: 45.9237, lng: 6.8694, description: "Un charmant chalet pour un séjour au calme." },
];

const ListingDetails = () => {
  const { id } = useParams();
  const listing = mockListings.find((item) => item.id === Number(id));

  if (!listing) {
    return <h2 className="text-center text-2xl mt-10">Logement non trouvé 😢</h2>;
  }

  const viewport = {
    latitude: listing.lat,
    longitude: listing.lng,
    zoom: 12,
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert("Veuillez sélectionner une période valide !");
      return;
    }
    alert(`Réservation confirmée du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()}`);
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p className="text-gray-600">{listing.location}</p>
      <img src={listing.image} alt={listing.title} className="w-full h-96 object-cover rounded-lg mt-4" />

      <div className="mt-6">
        <h2 className="text-xl font-bold">Détails</h2>
        <p className="text-gray-700 mt-2">{listing.description}</p>
        <p className="text-gray-900 font-bold mt-2 text-lg">{listing.price}€ / nuit</p>
      </div>

      {/* Formulaire de réservation */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Réserver ce logement</h2>
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-700">Date d'arrivée :</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Date de départ :</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || undefined}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        </div>
        <button
          onClick={handleBooking}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Réserver
        </button>
      </div>

      {/* Carte Mapbox */}
      <div className="mt-8 h-80">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          initialViewState={viewport}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker latitude={listing.lat} longitude={listing.lng}>
            <div className="bg-red-500 w-3 h-3 rounded-full"></div>
          </Marker>
        </Map>
      </div>
    </div>
  );
};

export default ListingDetails;
