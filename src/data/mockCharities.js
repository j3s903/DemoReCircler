export const mockCharities = [
  {
    id: 'charity1',
    name: 'Food Bank Network',
    description: 'Supporting families across Tyneside with emergency food parcels and ongoing nutrition assistance. We accept non-perishable food items, fresh produce, and homemade goods with proper labelling.',
    acceptedCategories: ['Food'],
    location: { lat: 54.9695, lng: -1.6074, area: 'Newcastle City Centre' },
    logo: 'https://picsum.photos/seed/charity1logo/200/200',
    website: 'https://www.foodbanknetwork.org.uk',
  },
  {
    id: 'charity2',
    name: 'Furniture Reuse Network',
    description: 'Collecting and redistributing quality used furniture to individuals and families in need across the North East. We handle collection, minor repairs, and delivery to recipients.',
    acceptedCategories: ['Furniture', 'Home & Garden'],
    location: { lat: 54.9612, lng: -1.5873, area: 'Byker' },
    logo: 'https://picsum.photos/seed/charity2logo/200/200',
    website: 'https://www.furnitureReuse.org.uk',
  },
  {
    id: 'charity3',
    name: 'Tech for Good',
    description: 'Refurbishing donated electronics and distributing them to schools, community centres, and disadvantaged households. Helping bridge the digital divide in the North East region.',
    acceptedCategories: ['Electronics'],
    location: { lat: 54.9740, lng: -1.5845, area: 'Ouseburn' },
    logo: 'https://picsum.photos/seed/charity3logo/200/200',
    website: 'https://www.techforgood.org.uk',
  },
  {
    id: 'charity4',
    name: 'Green Earth Recycling',
    description: 'Environmental charity focused on textile recycling and responsible disposal. We accept all clothing, shoes, and textiles regardless of condition. Items in good shape are rehomed, the rest are responsibly recycled.',
    acceptedCategories: ['Clothing', 'Books', 'Other'],
    location: { lat: 54.9530, lng: -1.6120, area: 'Gateshead' },
    logo: 'https://picsum.photos/seed/charity4logo/200/200',
    website: 'https://www.greenearthrecycling.org.uk',
  },
  {
    id: 'charity5',
    name: 'Community Tool Library',
    description: 'A shared tool library where residents can borrow tools for DIY, gardening, and home improvement projects. Donated tools are maintained and made available to the whole community at no cost.',
    acceptedCategories: ['Tools', 'Home & Garden', 'Sports & Recreation'],
    location: { lat: 54.9880, lng: -1.6200, area: 'Jesmond' },
    logo: 'https://picsum.photos/seed/charity5logo/200/200',
    website: 'https://www.communitytoollibrary.org.uk',
  },
];

export default mockCharities;
