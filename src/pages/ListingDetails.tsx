import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyA6CI9bIGzcpHhEvis6zC26ciBgTRdaxrg";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const mockListings = [
  { id: 1, title: "Appartement cosy à Paris", image: "https://source.unsplash.com/800x500/?apartment", price: 120, location: "Paris, France", description: "Un appartement charmant et confortable au cœur de Paris.", lat: 48.8566, lng: 2.3522 },
  { id: 2, title: "Villa avec piscine à Nice", image: "https://source.unsplash.com/800x500/?villa", price: 250, location: "Nice, France", description: "Une villa luxueuse avec piscine et vue sur la mer à Nice.", lat: 43.7034, lng: 7.2663 },
  { id: 3, title: "Chalet en montagne", image: "https://source.unsplash.com/800x500/?chalet", price: 180, location: "Chamonix, France", description: "Un chalet chaleureux et accueillant en pleine montagne.", lat: 45.9237, lng: 6.8694 },
];

const ListingDetails = () => {
  const { id } = useParams();
  const listing = mockListings.find((item) => item.id === Number(id));
  const [user] = useAuthState(auth);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
      <img src={listing?.image} alt={listing?.title} className="w-full h-96 object-cover rounded-lg mt-4" />

      {/* Carte Google Maps avec un marqueur standard */}
      {listing && (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places", "marker"]}>
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: listing.lat, lng: listing.lng }} zoom={14}>
            <MarkerF position={{ lat: listing.lat, lng: listing.lng }} />
          </GoogleMap>
        </LoadScript>
      )}

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
    </div>
  );
};

export default ListingDetails;
