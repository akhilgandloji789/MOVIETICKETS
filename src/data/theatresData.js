export const INITIAL_THEATRES = [
  {
    id: "th1",
    name: "CineNoir Grand",
    location: "Downtown District",
    distance: "2.4 km away",
    rating: 4.9,
    amenities: ["IMAX 3D", "Dolby Atmos", "Dine-in Luxe", "Recliners", "Valet Parking"],
    formats: ["IMAX 3D", "IMAX 2D", "4DX", "Dolby Atmos"],
    screens: 8,
    shows: {
      "IMAX 2D": ["11:30 AM", "02:30 PM", "06:00 PM", "09:45 PM"],
      "4DX": ["01:15 PM", "04:30 PM", "07:45 PM", "10:30 PM"],
      "Dolby Atmos": ["10:00 AM", "01:00 PM", "04:15 PM", "07:30 PM", "10:15 PM"]
    }
  },
  {
    id: "th2",
    name: "The Lumière Luxe",
    location: "Westside Heights",
    distance: "4.1 km away",
    rating: 4.8,
    amenities: ["Dolby Cinema", "Ultra Recliners", "Cocktail Bar", "VIP Lounge"],
    formats: ["Dolby Cinema", "Standard", "2D"],
    screens: 6,
    shows: {
      "Dolby Cinema": ["12:00 PM", "03:15 PM", "06:45 PM", "09:30 PM"],
      "Standard": ["01:00 PM", "03:45 PM", "06:30 PM", "09:15 PM"]
    }
  },
  {
    id: "th3",
    name: "Noir Select Cinema",
    location: "Uptown Plaza",
    distance: "5.8 km away",
    rating: 4.7,
    amenities: ["4DX Motion", "Gourmet Snack Bar", "Laser Projection"],
    formats: ["4DX", "Standard", "3D"],
    screens: 5,
    shows: {
      "4DX": ["02:00 PM", "05:15 PM", "08:30 PM"],
      "Standard": ["11:00 AM", "02:15 PM", "05:30 PM", "08:45 PM"]
    }
  },
  {
    id: "th4",
    name: "CineNoir Horizon",
    location: "Midtown Bay",
    distance: "7.2 km away",
    rating: 4.9,
    amenities: ["IMAX Laser GT", "Dolby Vision", "Luxury Beds", "Private Box"],
    formats: ["IMAX 3D", "IMAX 2D", "Dolby Cinema"],
    screens: 10,
    shows: {
      "IMAX 3D": ["10:30 AM", "01:45 PM", "05:00 PM", "08:30 PM"],
      "Dolby Cinema": ["11:15 AM", "02:45 PM", "06:15 PM", "09:45 PM"]
    }
  }
];

export const INITIAL_OFFERS = [
  {
    id: "off1",
    code: "WELCOME50",
    title: "First Booking Privilege",
    discountPercent: 50,
    maxDiscount: 200,
    description: "Get 50% discount on your first CineNoir ticket reservation.",
    badge: "50% OFF",
    validTill: "Valid till end of month"
  },
  {
    id: "off2",
    code: "WEEKEND15",
    title: "Masterpiece Weekend",
    discountPercent: 20,
    maxDiscount: 150,
    description: "Enjoy 20% off on all IMAX and 4DX weekend screenings.",
    badge: "20% OFF",
    validTill: "Valid Fri - Sun"
  },
  {
    id: "off3",
    code: "STUDENT20",
    title: "CinePass Student Special",
    discountPercent: 30,
    maxDiscount: 120,
    description: "Students get an exclusive 30% discount on weekday afternoon shows.",
    badge: "30% OFF",
    validTill: "Mon - Thu before 5 PM"
  },
  {
    id: "off4",
    code: "NOIRVIP",
    title: "Luxe Recliner Offer",
    discountPercent: 25,
    maxDiscount: 250,
    description: "Flat 25% price reduction when reserving VIP Recliners for 2+ seats.",
    badge: "25% OFF",
    validTill: "Limited Seats"
  }
];
