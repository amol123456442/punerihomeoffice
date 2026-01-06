// PropertyDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Share2, Heart, MapPin, Ruler,
  Bath, Bed, Car, Users, Calendar,
  CheckCircle, Wifi, Droplets, Tv,
  Shield, Phone, MessageCircle, Home,
  Building, Star, Clock, Eye
} from 'lucide-react';

// Mock data - In real app, fetch from API based on ID
const propertyDatabase = {
  1: {
    id: 1,
    title: '3 BHK Premium Flat',
    price: '1.62 Cr',
    pricePerSqft: '₹ 9,800/sqft',
    area: '1654 sqft',
    location: 'Balewadi, Pune',
    fullAddress: 'Skyline Towers, Balewadi High Street, Pune - 411045',
    status: 'Ready to Move',
    bhk: 3,
    bathrooms: 3,
    parking: 2,
    furnishing: 'Semi-Furnished',
    facing: 'North-East',
    floor: '12th Floor',
    totalFloors: 22,
    age: 'New Construction',
    description: 'Luxurious 3 BHK flat in premium society with modern amenities. Spacious living area with beautiful city views. Located in the heart of Balewadi with excellent connectivity.',
    features: [
      'Swimming Pool', 'Gymnasium', 'Club House', 'Children Play Area',
      '24/7 Security', 'Power Backup', 'Park', 'Shopping Complex'
    ],
    amenities: [
      { icon: <Wifi className="w-5 h-5" />, text: 'High Speed Internet' },
      { icon: <Tv className="w-5 h-5" />, text: 'Cable TV' },
      { icon: <Droplets className="w-5 h-5" />, text: 'Water Purifier' },
      { icon: <Shield className="w-5 h-5" />, text: 'Security System' }
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&auto=format&fit=crop'
    ],
    owner: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@example.com',
      isVerified: true
    },
    views: 1245,
    postedDate: '2024-01-15',
    propertyType: 'Apartment',
    transactionType: 'Sale'
  },
  2: {
    id: 2,
    title: '3 BHK Luxury Flat',
    price: '96 Lac',
    pricePerSqft: '₹ 6,800/sqft',
    area: '1410 sqft',
    location: 'Wagholi, Pune',
    fullAddress: 'Green Valley Society, Wagholi, Pune - 412207',
    status: 'Ready to Move',
    bhk: 3,
    bathrooms: 2,
    parking: 1,
    furnishing: 'Fully Furnished',
    facing: 'South',
    floor: '8th Floor',
    totalFloors: 15,
    age: '2 Years Old',
    description: 'Beautiful 3 BHK flat with modern interiors and premium finishes. Perfect for families with excellent amenities.',
    features: [
      'Gym', 'Swimming Pool', 'Park', 'Security',
      'Power Backup', 'Club House', 'Garden'
    ],
    amenities: [
      { icon: <Wifi className="w-5 h-5" />, text: 'WiFi' },
      { icon: <Tv className="w-5 h-5" />, text: 'TV' },
      { icon: <Droplets className="w-5 h-5" />, text: 'Water' }
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop'
    ],
    owner: {
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya@example.com',
      isVerified: true
    },
    views: 876,
    postedDate: '2024-01-20',
    propertyType: 'Apartment',
    transactionType: 'Sale'
  },
  3: {
    id: 3,
    title: '1 BHK Compact Flat',
    price: '58 Lac',
    pricePerSqft: '₹ 7,200/sqft',
    area: '805 sqft',
    location: 'Fursungi, Pune',
    fullAddress: 'Sunshine Apartments, Fursungi, Pune - 412308',
    status: 'Ready to Move',
    bhk: 1,
    bathrooms: 1,
    parking: 1,
    furnishing: 'Unfurnished',
    facing: 'East',
    floor: '5th Floor',
    totalFloors: 10,
    age: '3 Years Old',
    description: 'Compact and affordable 1 BHK flat ideal for singles or small families. Well-maintained building with basic amenities.',
    features: [
      '24/7 Security', 'Lift', 'Water Supply', 'Parking'
    ],
    amenities: [
      { icon: <Wifi className="w-5 h-5" />, text: 'Internet' },
      { icon: <Tv className="w-5 h-5" />, text: 'Cable' }
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop'
    ],
    owner: {
      name: 'Amit Patel',
      phone: '+91 76543 21098',
      email: 'amit@example.com',
      isVerified: true
    },
    views: 654,
    postedDate: '2024-01-25',
    propertyType: 'Apartment',
    transactionType: 'Sale'
  },
  4: {
    id: 4,
    title: '2 BHK Spacious Flat',
    price: '72 Lac',
    pricePerSqft: '₹ 6,260/sqft',
    area: '1150 sqft',
    location: 'Kondhwa, Pune',
    fullAddress: 'Royal Greens, Kondhwa, Pune - 411048',
    status: 'Ready to Move',
    bhk: 2,
    bathrooms: 2,
    parking: 1,
    furnishing: 'Semi-Furnished',
    facing: 'West',
    floor: '3rd Floor',
    totalFloors: 12,
    age: '1 Year Old',
    description: 'Spacious 2 BHK flat with excellent ventilation and natural light. Perfect for small families.',
    features: [
      'Gym', 'Park', 'Security', 'Club House'
    ],
    amenities: [
      { icon: <Wifi className="w-5 h-5" />, text: 'WiFi' },
      { icon: <Droplets className="w-5 h-5" />, text: 'RO' }
    ],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop'
    ],
    owner: {
      name: 'Sneha Verma',
      phone: '+91 65432 10987',
      email: 'sneha@example.com',
      isVerified: true
    },
    views: 432,
    postedDate: '2024-01-28',
    propertyType: 'Apartment',
    transactionType: 'Sale'
  }
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const prop = propertyDatabase[id];
      if (prop) {
        setProperty(prop);
      } else {
        navigate('/');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={property.images[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : property.images.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setCurrentImage(prev => (prev + 1) % property.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full rotate-180"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full ${idx === currentImage ? 'bg-yellow-500' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${idx === currentImage ? 'ring-2 ring-yellow-500' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="text-2xl font-bold text-yellow-600">{property.price}</div>
                  <div className="text-gray-600">{property.pricePerSqft}</div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {property.status}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-3">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Bed className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">{property.bhk} BHK</span>
                  </div>
                  <div className="text-xs text-gray-500">Configuration</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Ruler className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">{property.area}</span>
                  </div>
                  <div className="text-xs text-gray-500">Carpet Area</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Bath className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">{property.bathrooms} Bath</span>
                  </div>
                  <div className="text-xs text-gray-500">Bathrooms</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Car className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">{property.parking} Park</span>
                  </div>
                  <div className="text-xs text-gray-500">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Additional Details */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Furnishing</div>
                    <div className="font-medium">{property.furnishing}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Facing</div>
                    <div className="font-medium">{property.facing}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Floor</div>
                    <div className="font-medium">{property.floor} of {property.totalFloors}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Age</div>
                    <div className="font-medium">{property.age}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-medium">{property.propertyType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Transaction</div>
                    <div className="font-medium">{property.transactionType}</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="text-yellow-600">{item.icon}</div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Society Features */}
              <div>
                <h2 className="text-xl font-bold mb-3">Society Features</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="w-3 h-3" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Property Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{property.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Views</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{new Date(property.postedDate).getDate()}</div>
                  <div className="text-sm text-gray-500">Days Posted</div>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Actions */}
          <div className="space-y-6">
            {/* Owner Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">{property.owner.name}</h3>
                    {property.owner.isVerified && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">Property Owner</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Phone className="inline-block w-4 h-4 mr-2" />
                  Contact Owner
                </button>

                {/* <button className="w-full border border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold py-3 rounded-lg transition-colors">
                  <MessageCircle className="inline-block w-4 h-4 mr-2" />
                  Chat Now
                </button> */}

                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors">
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Schedule Visit
                </button>
              </div>
{/* 
              <div className="mt-6 pt-6 border-t">
                <div className="text-sm text-gray-500 mb-2">Contact Details</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{property.owner.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 text-gray-400">@</span>
                    <span className="text-sm">{property.owner.email}</span>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Similar Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {Object.values(propertyDatabase)
                  .filter(p => p.id !== property.id)
                  .slice(0, 3)
                  .map(similar => (
                    <Link
                      key={similar.id}
                      to={`/properties/${similar.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-yellow-200"
                    >
                      <img
                        src={similar.images[0]}
                        alt={similar.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{similar.title}</div>
                        <div className="text-yellow-600 font-bold text-sm">{similar.price}</div>
                        <div className="text-xs text-gray-500">{similar.location}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Download Brochure
                </button>
                <button className="w-full bg-white border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  Share with Friend
                </button>
                <button className="w-full bg-white border border-gray-400 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Report Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Contact Owner</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Your Name</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none" placeholder="Enter your name" required />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input type="tel" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none" placeholder="Enter your phone" required />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email (Optional)</label>
                <input type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none" placeholder="Enter your email" />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none" rows="3" placeholder="I'm interested in this property..."></textarea>
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;