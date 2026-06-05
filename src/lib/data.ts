export interface Property {
  id: string
  name: string
  slug: string
  tagline: string
  location: string
  description: string
  type: 'residential' | 'commercial' | 'mixed'
  status: 'available' | 'selling_fast' | 'sold_out'
  image: string
  units: PropertyUnit[]
  facilities: string[]
  paymentPlans: PaymentPlan[]
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface PropertyUnit {
  id: string
  title: string
  landSize: string
  dimensions: string
  price: number
  priceFormatted: string
  image: string
}

export interface PaymentPlan {
  name: string
  downPayment: string
  downPaymentPercent: number
  installments: { label: string; amount: string; percent?: number }[]
  discount?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  publishedAt: string
  readTime: string
}

export const properties: Property[] = [
  {
    id: 'sunshine-city',
    name: 'Sunshine City',
    slug: 'sunshine-city',
    tagline: 'Beside Fintiri Estate',
    location: 'Beside Fintiri Estate, Jimeta Yola',
    description: 'A premium residential estate offering beautifully designed bungalows with modern amenities. Perfect for families seeking comfort and security in a serene environment.',
    type: 'residential',
    status: 'selling_fast',
    image: '/estates/sunshine-city.jpg',
    units: [
      {
        id: 'sc-4bed',
        title: '4 Bedroom Bungalow',
        landSize: '450 SQM',
        dimensions: '50ft x 100ft',
        price: 2500000,
        priceFormatted: '₦2.5M',
        image: '/units/4bed-bungalow.jpg',
      },
      {
        id: 'sc-3bed',
        title: '3 Bedroom Bungalow',
        landSize: '225 SQM',
        dimensions: '50ft x 50ft',
        price: 1250000,
        priceFormatted: '₦1.250M',
        image: '/units/3bed-bungalow.jpg',
      },
    ],
    facilities: ['Security', 'Good Road', 'Commercial Center', 'Green Area', 'Religion', 'Street Light', 'School', 'Water', 'Electricity', 'Ambulance', 'Gym'],
    paymentPlans: [
      {
        name: '3 Month Plan',
        downPayment: '40%',
        downPaymentPercent: 40,
        installments: [
          { label: '2nd Payment', amount: '30%', percent: 30 },
          { label: '3rd Payment', amount: '30%', percent: 30 },
        ],
      },
      {
        name: '6 Month Plan',
        downPayment: '30%',
        downPaymentPercent: 30,
        installments: [
          { label: '2nd Payment', amount: '14%', percent: 14 },
          { label: '3rd Payment', amount: '14%', percent: 14 },
          { label: '4th Payment', amount: '14%', percent: 14 },
          { label: '5th Payment', amount: '14%', percent: 14 },
          { label: '6th Payment', amount: '14%', percent: 14 },
        ],
        discount: 'Outright Payment 5% Discount',
      },
    ],
  },
  {
    id: 'palm-city',
    name: 'Palm City',
    slug: 'palm-city',
    tagline: 'Beside DSS Quarters Jan Kasa',
    location: 'Beside DSS Quarters Jan Kasa, Jimeta Yola',
    description: 'An exclusive residential community offering spacious plots for your dream home. Palm City combines natural beauty with modern infrastructure for the ultimate living experience.',
    type: 'residential',
    status: 'available',
    image: '/estates/palm-city.jpg',
    units: [
      {
        id: 'pc-450',
        title: 'Premium Plot',
        landSize: '450 SQM',
        dimensions: '50ft x 100ft',
        price: 2400000,
        priceFormatted: '₦2.4 Million',
        image: '/units/premium-plot.jpg',
      },
      {
        id: 'pc-225',
        title: 'Standard Plot',
        landSize: '225 SQM',
        dimensions: '50ft x 50ft',
        price: 1200000,
        priceFormatted: '₦1.2 Million',
        image: '/units/standard-plot.jpg',
      },
    ],
    facilities: ['Security', 'Good Road', 'Commercial Center', 'Green Area', 'Electricity', 'Water', 'Ambulance'],
    paymentPlans: [
      {
        name: '3 Month Plan',
        downPayment: '40%',
        downPaymentPercent: 40,
        installments: [
          { label: '2nd Payment', amount: '30%', percent: 30 },
          { label: '3rd Payment', amount: '30%', percent: 30 },
        ],
      },
      {
        name: '6 Month Plan',
        downPayment: '30%',
        downPaymentPercent: 30,
        installments: [
          { label: '2nd Payment', amount: '14%', percent: 14 },
          { label: '3rd Payment', amount: '14%', percent: 14 },
          { label: '4th Payment', amount: '14%', percent: 14 },
          { label: '5th Payment', amount: '14%', percent: 14 },
          { label: '6th Payment', amount: '14%', percent: 14 },
        ],
      },
    ],
  },
  {
    id: 'arewa-estate-2',
    name: 'Arewa Estate',
    slug: 'arewa-estate-2',
    tagline: 'Phase 2 — Beside Fintiri 1000 Estate',
    location: 'Beside Fintiri 1000 Estate, Jimeta Yola',
    description: 'Arewa Estate Phase 2 offers prime land plots in one of the most sought-after locations in Yola. Build your legacy in a community designed for growth and prosperity.',
    type: 'residential',
    status: 'available',
    image: '/estates/arewa-estate.jpg',
    units: [
      {
        id: 'ae-450',
        title: 'Standard Plot',
        landSize: '450 SQM',
        dimensions: '50ft x 100ft',
        price: 2000000,
        priceFormatted: '₦2M',
        image: '/units/arewa-plot.jpg',
      },
    ],
    facilities: ['Security', 'Good Road Networking', 'Commercial Center', 'Green Area'],
    paymentPlans: [
      {
        name: '3 Month Plan',
        downPayment: '40%',
        downPaymentPercent: 40,
        installments: [
          { label: '2nd Payment', amount: '30%', percent: 30 },
          { label: '3rd Payment', amount: '30%', percent: 30 },
        ],
      },
      {
        name: '6 Month Plan',
        downPayment: '30%',
        downPaymentPercent: 30,
        installments: [
          { label: '2nd Payment', amount: '14%', percent: 14 },
          { label: '3rd Payment', amount: '14%', percent: 14 },
          { label: '4th Payment', amount: '14%', percent: 14 },
          { label: '5th Payment', amount: '14%', percent: 14 },
          { label: '6th Payment', amount: '14%', percent: 14 },
        ],
        discount: 'Outright Payment 5% Discount',
      },
    ],
  },
  {
    id: 'meridian-estate',
    name: 'The Meridian Estate',
    slug: 'meridian-estate',
    tagline: 'Beside Aviation School, Mayo Inne',
    location: 'Beside Aviation School Mayo Inne, 10 minutes drive from Fintiri 1000 Estate',
    description: 'The Meridian Estate offers a range of plot sizes to suit every budget. Located near the Aviation School, this estate promises excellent appreciation potential and strategic positioning.',
    type: 'residential',
    status: 'available',
    image: '/estates/meridian-estate.jpg',
    units: [
      {
        id: 'me-900',
        title: 'Large Plot',
        landSize: '900 SQM',
        dimensions: '100ft x 100ft',
        price: 800000,
        priceFormatted: '₦800,000',
        image: '/units/large-plot.jpg',
      },
      {
        id: 'me-450',
        title: 'Standard Plot',
        landSize: '450 SQM',
        dimensions: '50ft x 100ft',
        price: 400000,
        priceFormatted: '₦400,000',
        image: '/units/standard-plot-2.jpg',
      },
      {
        id: 'me-400',
        title: 'Medium Plot',
        landSize: '400 SQM',
        dimensions: '50ft x 90ft',
        price: 350000,
        priceFormatted: '₦350,000',
        image: '/units/medium-plot.jpg',
      },
      {
        id: 'me-250',
        title: 'Compact Plot',
        landSize: '250 SQM',
        dimensions: '50ft x 60ft',
        price: 250000,
        priceFormatted: '₦250,000',
        image: '/units/compact-plot.jpg',
      },
    ],
    facilities: ['Security', 'Good Road', 'Commercial Center', 'Green Area', 'Electricity', 'Water'],
    paymentPlans: [
      {
        name: '3 Month Plan',
        downPayment: '40%',
        downPaymentPercent: 40,
        installments: [
          { label: '2nd Payment', amount: '30%', percent: 30 },
          { label: '3rd Payment', amount: '30%', percent: 30 },
        ],
      },
      {
        name: '6 Month Plan',
        downPayment: '30%',
        downPaymentPercent: 30,
        installments: [
          { label: '2nd Payment', amount: '14%', percent: 14 },
          { label: '3rd Payment', amount: '14%', percent: 14 },
          { label: '4th Payment', amount: '14%', percent: 14 },
          { label: '5th Payment', amount: '14%', percent: 14 },
          { label: '6th Payment', amount: '14%', percent: 14 },
        ],
        discount: 'Outright Payment 5% Discount',
      },
    ],
  },
  {
    id: 'himaz-trade-center',
    name: 'Himaz Trade Center',
    slug: 'himaz-trade-center',
    tagline: 'Numan Road, Before New Yola Toll Gate',
    location: 'Numan Road Opposite Ad Bashar Car Wash, Before New Yola Toll Gate',
    description: 'A premier commercial hub designed for traders and entrepreneurs. Himaz Trade Center offers shops, blocks, and warehouse spaces in a strategic high-traffic location.',
    type: 'commercial',
    status: 'selling_fast',
    image: '/estates/trade-center.jpg',
    units: [
      {
        id: 'htc-2shop',
        title: '2 Shops',
        landSize: 'Commercial Space',
        dimensions: 'N/A',
        price: 590000,
        priceFormatted: '₦590,000',
        image: '/units/2-shops.jpg',
      },
      {
        id: 'htc-block',
        title: '1 Block of 6 Shops',
        landSize: 'Commercial Block',
        dimensions: 'N/A',
        price: 1700000,
        priceFormatted: '₦1,700,000',
        image: '/units/6-shop-block.jpg',
      },
      {
        id: 'htc-warehouse',
        title: 'Warehouse',
        landSize: 'Industrial Space',
        dimensions: 'N/A',
        price: 5000000,
        priceFormatted: '₦5,000,000',
        image: '/units/warehouse.jpg',
      },
    ],
    facilities: ['24/7 Security', 'Electricity & Water', 'Good Road Access', 'Parking Space', 'CCTV Surveillance', 'Waste Management'],
    paymentPlans: [
      {
        name: 'Shops — 2 Months Plan',
        downPayment: '₦290,000',
        downPaymentPercent: 49,
        installments: [
          { label: 'Split Balance', amount: '₦300,000 over 2 months' },
        ],
      },
      {
        name: 'Block — 2 Months Plan',
        downPayment: '₦700,000',
        downPaymentPercent: 41,
        installments: [
          { label: 'Split Balance', amount: '₦1,000,000 over 2 months' },
        ],
      },
      {
        name: 'Warehouse — 2 Months Plan',
        downPayment: '₦2,000,000',
        downPaymentPercent: 40,
        installments: [
          { label: 'Split Balance', amount: '₦3,000,000 over 2 months' },
        ],
      },
    ],
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: 'yola-metropolitan-renewal',
    title: 'Yola Metropolitan Renewal: What It Means for Property Values',
    slug: 'yola-metropolitan-renewal',
    excerpt: 'The Yola Metropolitan Renewal project is transforming the city\'s infrastructure. Learn how this impacts real estate prices in Jimeta and surrounding areas.',
    content: `The Yola Metropolitan Renewal project represents one of the most significant infrastructure investments in Adamawa State's recent history. With new road networks, improved drainage systems, and modernized public spaces, the project is reshaping the city's landscape.

For property investors, this presents an unprecedented opportunity. Areas that were previously considered peripheral are now becoming prime real estate locations. Estates like Sunshine City and Arewa Estate Phase 2, positioned near these new developments, are seeing increased demand.

Key developments include:
- Expansion of the Numan Road corridor
- Modernization of the Jimeta market district
- New street lighting and security infrastructure
- Improved water and electricity distribution

Investors who position themselves early in this transformation stand to benefit significantly from appreciation as the renewal project reaches completion.`,
    image: '/blog/yola-renewal.jpg',
    category: 'Market Insights',
    publishedAt: '2024-06-01',
    readTime: '5 min read',
  },
  {
    id: 'fintiri-estate-guide',
    title: 'Why Fintiri Estate is Adamawa\'s Fastest-Growing Residential Hub',
    slug: 'fintiri-estate-guide',
    excerpt: 'An in-depth guide to the Fintiri Estate area, its facilities, accessibility, and why properties beside it are commanding premium prices.',
    content: `Fintiri Estate has emerged as Adamawa State's most desirable residential address. Named after the state's visionary leadership, this planned community offers a model for modern Nigerian urban development.

What makes Fintiri Estate special:
- Planned road networks with drainage
- Consistent electricity supply
- Security patrols and gated access
- Proximity to schools and hospitals
- Active community association

Properties adjacent to Fintiri Estate, such as Sunshine City and Arewa Estate Phase 2, benefit from this infrastructure while offering more competitive pricing. As the estate reaches full capacity, surrounding areas are experiencing spillover demand.

For families and investors alike, the Fintiri corridor represents the sweet spot of value and growth potential in Yola's property market.`,
    image: '/blog/fintiri-guide.jpg',
    category: 'Area Guide',
    publishedAt: '2024-05-28',
    readTime: '7 min read',
  },
  {
    id: 'diaspora-investor-guide',
    title: 'The Diaspora Investor\'s Guide to Buying Land in Adamawa',
    slug: 'diaspora-investor-guide',
    excerpt: 'A comprehensive guide for Nigerians living abroad who want to invest in Adamawa real estate with confidence and security.',
    content: `Investing in property from abroad can feel daunting, but with the right approach, diaspora investors can build significant wealth through Adamawa real estate.

Step 1: Choose a Verified Developer
Work with established companies like Himaz Properties that offer verified listings, clear documentation, and transparent processes.

Step 2: Understand the Documentation
Ensure you receive:
- Certificate of Occupancy (C of O) or Right of Occupancy (R of O)
- Survey plan
- Deed of assignment
- Layout plan approval

Step 3: Use Secure Payment Structures
Take advantage of installment payment plans that allow you to spread payments over 3-6 months while your documentation is processed.

Step 4: Plan for Appreciation
Focus on areas with infrastructure development like the Yola Metropolitan Renewal corridor, where property values are projected to increase significantly.

With Himaz Properties, diaspora investors receive virtual tours, documentation support, and WhatsApp-based progress updates throughout their investment journey.`,
    image: '/blog/diaspora-guide.jpg',
    category: 'Investment',
    publishedAt: '2024-05-20',
    readTime: '8 min read',
  },
]

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`
  }
  return `₦${price.toLocaleString()}`
}

export const WHATSAPP_NUMBER = '+2348123456789'

export function getWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encoded}`
}