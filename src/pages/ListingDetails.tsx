import { useParams } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyA6CI9bIGzcpHhEvis6zC26ciBgTRdaxrg";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultImage = "https://via.placeholder.com/800x500?text=Image+Non+Disponible";

const mockListings = [
  {
    id: 1,
    title: "Appartement cosy à Paris",
    image: "https://images.unsplash.com/photo-1604014237744-6d293cf5e213",
    price: 120,
    location: "Paris, France",
    description: "Un charmant appartement lumineux au cœur de Paris, proche des attractions principales.",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: 2,
    title: "Villa avec piscine à Nice",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 250,
    location: "Nice, France",
    description: "Une villa luxueuse avec piscine et vue panoramique sur la mer Méditerranée.",
    lat: 43.7034,
    lng: 7.2663,
  },
  {
    id: 3,
    title: "Chalet en montagne à Chamonix",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    price: 180,
    location: "Chamonix, France",
    description: "Un chalet rustique avec une cheminée et une vue imprenable sur le Mont Blanc.",
    lat: 45.9237,
    lng: 6.8694,
  },
  {
    id: 4,
    title: "Loft moderne à Lyon",
    image: "https://images.unsplash.com/photo-1574179271627-25b661aa0e40",
    price: 140,
    location: "Lyon, France",
    description: "Un loft spacieux et design, situé dans un quartier dynamique de Lyon.",
    lat: 45.7640,
    lng: 4.8357,
  },
  {
    id: 5,
    title: "Maison de campagne en Provence",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    price: 200,
    location: "Provence, France",
    description: "Une maison chaleureuse entourée de lavande et d'oliviers, idéale pour se détendre.",
    lat: 43.9471,
    lng: 5.7711,
  },
  {
    id: 6,
    title: "Appartement avec terrasse à Bordeaux",
    image: "https://images.unsplash.com/photo-1600585152916-46d8f8b5e146",
    price: 160,
    location: "Bordeaux, France",
    description: "Un appartement élégant avec une grande terrasse et vue sur la Garonne.",
    lat: 44.8378,
    lng: -0.5792,
  },
  {
    id: 7,
    title: "Penthouse à Marseille",
    image: "https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831",
    price: 300,
    location: "Marseille, France",
    description: "Un penthouse ultra-moderne avec jacuzzi et vue à 360° sur la ville et la mer.",
    lat: 43.2965,
    lng: 5.3698,
  },
  {
    id: 8,
    title: "Studio économique à Toulouse",
    image: "https://images.unsplash.com/photo-1598300183298-42ee84cc25e6",
    price: 90,
    location: "Toulouse, France",
    description: "Un studio confortable et bien équipé, parfait pour les courts séjours.",
    lat: 43.6045,
    lng: 1.4442,
  },
];

const ListingDetails = () => {
  const { id } = useParams();
  const listing = mockListings.find((item) => item.id === Number(id));
  const [user] = useAuthState(auth);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Chargement de Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places", "marker"],
  });

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      alert("Veuillez sélectionner une période valide !");
      return;
    }
    if (!user) {
      alert("Vous devez être connecté pour réserver !");
      return;
    }

    try {
      await addDoc(collection(db, "reservations"), {
        userId: user.uid,
        listingId: listing?.id,
        title: listing?.title,
        location: listing?.location,
        price: listing?.price,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        createdAt: new Date().toISOString(),
      });

      alert(`Réservation confirmée du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()}`);
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert("Erreur lors de la réservation !");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold">{listing?.title}</h1>
      <p className="text-gray-600">{listing?.location}</p>
      <img
        src={listing?.image}
        alt={listing?.title}
        className="w-full h-96 object-cover rounded-lg mt-4"
        onError={(e) => (e.currentTarget.src = defaultImage)}
      />

      {/* Carte Google Maps avec un marqueur */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Localisation</h2>
        {isLoaded && listing ? (
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: listing.lat, lng: listing.lng }} zoom={14}>
            <MarkerF position={{ lat: listing.lat, lng: listing.lng }} />
          </GoogleMap>
        ) : (
          <p>Chargement de la carte...</p>
        )}
      </div>

      {/* Détails */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Détails</h2>
        <p className="text-gray-700 mt-2">{listing?.description}</p>
        <p className="text-gray-900 font-bold mt-2 text-lg">{listing?.price}€ / nuit</p>
      </div>

      {/* Formulaire de réservation */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Réserver ce logement</h2>
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-700">Date d'arrivée :</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div>
            <label className="block text-gray-700">Date de départ :</label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
        </div>
        <button onClick={handleBooking} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Réserver</button>
      </div>
    </div>
  );
};

export default ListingDetails;
