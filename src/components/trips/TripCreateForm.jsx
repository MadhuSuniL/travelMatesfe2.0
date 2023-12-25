import React, { useState } from 'react';
import instance from '../../app/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TripCreationForm = () => {
    const nav = useNavigate()
    const categories = [
        {"label": "Adventure", "value": "adventure"},
        {"label": "Beach Vacation", "value": "beach-vacation"},
        {"label": "Cultural Exploration", "value": "cultural-exploration"},
        {"label": "City Sightseeing", "value": "city-sightseeing"},
        {"label": "Hiking and Nature", "value": "hiking-and-nature"},
        {"label": "Food and Culinary Tours", "value": "food-and-culinary"},
        {"label": "Wellness and Relaxation", "value": "wellness-and-relaxation"},
        {"label": "Wildlife and Safari", "value": "wildlife-and-safari"},
        {"label": "History and Heritage", "value": "history-and-heritage"},
        {"label": "Family-Friendly", "value": "family-friendly"},
        {"label": "Romantic Getaway", "value": "romantic-getaway"},
        {"label": "Ecotourism", "value": "ecotourism"},
        {"label": "Mountain and Skiing", "value": "mountain-and-skiing"},
        {"label": "Island Paradise", "value": "island-paradise"},
        {"label": "Road Trip", "value": "road-trip"},
        {"label": "Cruise and Sailing", "value": "cruise-and-sailing"},
        {"label": "Festivals and Events", "value": "festivals-and-events"},
        {"label": "Volunteering and Community", "value": "volunteering-and-community"},
        {"label": "Art and Architecture", "value": "art-and-architecture"},
        {"label": "Luxury and Spa Retreats", "value": "luxury-and-spa-retreats"},
        {"label": "Scenic Drives", "value": "scenic-drives"},
        {"label": "Solo Travel", "value": "solo-travel"},
        {"label": "Shopping and Markets", "value": "shopping-and-markets"},
        {"label": "Wine and Vineyards", "value": "wine-and-vineyards"},
        {"label": "Backpacking and Budget", "value": "backpacking-and-budget"},
        {"label": "Historical Landmarks", "value": "historical-landmarks"},
        {"label": "Amusement Parks", "value": "amusement-parks"},
        {"label": "Nature Retreat", "value": "nature-retreat"},
        {"label": "Golf and Sports", "value": "golf-and-sports"},
        {"label": "Underwater Exploration", "value": "underwater-exploration"},
        {"label": "Cultural Festivals", "value": "cultural-festivals"},
        {"label": "Roadside Attractions", "value": "roadside-attractions"},
        {"label": "Educational Tours", "value": "educational-tours"},
        {"label": "River Cruises", "value": "river-cruises"},
        {"label": "Music and Entertainment", "value": "music-and-entertainment"},
        {"label": "Yoga and Meditation Retreats", "value": "yoga-and-meditation-retreats"},
        {"label": "Desert Adventures", "value": "desert-adventures"},
        {"label": "Ski Resorts", "value": "ski-resorts"},
        {"label": "Rainforest Expeditions", "value": "rainforest-expeditions"},
        {"label": "Health and Wellness Escapes", "value": "health-and-wellness-escapes"}
    ]
    
    
    const [formData, setFormData] = useState({
        title: '',
        departure: '',
        destination: '',
        category: '',
        date: '',
        strength: 3,
        distance: null,
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = 'trips/'
        let body = formData
        instance.post(url, body)
        .then(response => response.data)
        .then(data => {
            toast.success('Trip added successfully',{autoClose:1500})
            nav('/profile/self', {state : 'upcoming'})
        })
    };

    return (
        <div className="max-w-screen-md mx-auto shadow-gray-500 rounded-md shadow-sm p-2 md:p-5">
            <p className='text-xl text-center animate-pulse text-gray-600 m-2'>Pulish Trip</p>
            <p className='text-[12px] text-yellow-400 m-2'>Welcome! Let's plan your next adventure. Fill in the details below to create your personalized trip. Your journey begins here!</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="mb-1">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Enter trip title"
                        required
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-sky-300 rounded-lg"
                    />
                </div>

                <div className="mb-1">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Departure</label>
                    <input
                        type="text"
                        name="departure"
                        value={formData.departure}
                        placeholder="Enter departure location"
                        required
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-sky-300 rounded-lg"
                    />
                </div>

                <div className="mb-1">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Destination</label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        placeholder="Enter destination location"
                        required
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-sky-300 rounded-lg"
                    />
                </div>

                <div className="mb-1">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        placeholder="Select a category"
                        required
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-sky-300 rounded-lg"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.value} value={category.label}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-span-2 grid md:grid-cols-3 gap-3 content-center">
                    <div className="mb-1">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Date</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            placeholder="Select date and time"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border-2 border-sky-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="strength" className="block text-sm font-medium text-gray-700 m-1">
                            Team Size
                        </label>
                        <select
                            id="strength"
                            name="strength"
                            value={formData.strength}
                            placeholder="Select team size"
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                        >
                            {Array.from({ length: 15 }, (_, index) => index + 1).map((id) => (
                                <option key={id} value={id + 1}>
                                    {id + 1} Members
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-1">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Distance (km)</label>
                        <input
                            type="number"
                            name="distance"
                            value={formData.distance || ''}
                            placeholder="Enter distance in kilometers"
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-sky-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="mb-1 col-span-2">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        placeholder="Enter trip description"
                        onChange={handleChange}
                        rows={7}
                        className="w-full p-2 border-2 border-sky-300 rounded-lg"
                    ></textarea>
                </div>

                <div className="col-span-2 float-right">
                    <button
                        type="submit"
                        className="bg-sky-400 float-right text-white border-2 border-sky-400 rounded-lg py-2 px-4 hover:bg-sky-500 hover:border-sky-500 cursor-pointer"
                    >
                        Create Trip
                    </button>
                    <button
                        type="submit"
                        onClick={() => nav('/')}
                        className="bg-transparent float-right mx-3 text-gray-400 border-2 border-gray-400 rounded-lg py-2 px-4 hover:bg-sky-500 hover:border-sky-500 cursor-pointer"
                    >
                        Home
                    </button>
                </div>
            </form>

        </div>
    );
};

export default TripCreationForm;
