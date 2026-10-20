export interface CategoryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  machineCount: string;
  featured?: boolean;
  materialHighlight: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  materialGrade: string;
  capacityRange: string;
  keyFeatures: string[];
  applications: string[];
  whatsappMessage: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  commonEquipment: string[];
}

export interface VideoShowcaseItem {
  id: string;
  title: string;
  machineType: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  highlight: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'mixing-blending',
    name: 'Mixing & Blending Machines',
    tagline: 'Precision Homogeneous Powder & Paste Blending',
    description: 'Heavy-duty U-trough ribbon blenders, double cone blenders, and paddle mixers fabricated with sanitary food-grade stainless steel.',
    image: '/images/products/horizontal-ribbon-blender.png',
    machineCount: '8+ Machine Models',
    featured: true,
    materialHighlight: 'SS-304 & SS-316 Contact Parts',
  },
  {
    id: 'roasting',
    name: 'Roasting Machines',
    tagline: 'Uniform Thermal Treatment for Grains & Spices',
    description: 'Electric and gas drum roasters engineered for continuous or batch roasting of grains, groundnuts, spices, and dry fruits with precision heat distribution.',
    image: '/images/products/roasting-machine.jpg',
    machineCount: '6+ Configurations',
    materialHighlight: 'Insulated Heating Chamber',
  },
  {
    id: 'coating-panning',
    name: 'Coating & Panning Machines',
    tagline: 'Mirror-Polished Revolving Coating Pans',
    description: 'Spherical and pear-shaped revolving stainless steel pans designed for confectionery, chocolate glazing, and pharmaceutical tablet film coating.',
    image: '/images/products/coating-pan.jpg',
    machineCount: '4+ Standard Sizes',
    materialHighlight: 'Mirror-Finish SS Bowl',
  },
  {
    id: 'detergent-chemical',
    name: 'Detergent & Chemical Machinery',
    tagline: 'Aggressive-Duty Formulation Equipment',
    description: 'Rugged mixing vessels, cage mills, and powder blenders built to withstand corrosive industrial detergents and chemical compounds.',
    image: '/images/products/detergent-machine.jpg',
    machineCount: '5+ Heavy Systems',
    materialHighlight: 'Reinforced Wear Plates',
  },
  {
    id: 'sifting-screening',
    name: 'Sifting & Screening Machines',
    tagline: 'High-Frequency Multi-Deck Particle Separation',
    description: 'Vibratory separators and flour sifters for accurate gradation, de-dusting, and foreign particle elimination across delicate dry powders.',
    image: '/images/products/vibro-sifter.jpg',
    machineCount: 'Single & Multi-Deck',
    materialHighlight: 'Quick-Clamp Mesh Ring',
  },
  {
    id: 'dryers-ovens',
    name: 'Dryers & Ovens',
    tagline: 'Sanitary Hot-Air Circulation Dehydration',
    description: 'Insulated tray drying cabinets with precision digital temperature regulators and cross-flow air circulation for gentle food and chemical drying.',
    image: '/images/products/tray-dryer.jpg',
    machineCount: '12 to 96 Tray Units',
    materialHighlight: 'High-Density Rockwool Insulation',
  },
  {
    id: 'bakery-food',
    name: 'Bakery & Food Processing',
    tagline: 'Commercial High-Yield Food Preparation',
    description: 'Industrial planetary mixers, dough kneaders, and rotary slicers engineered to satisfy stringent commercial food hygiene protocols.',
    image: '/images/products/bakery-mixer.jpg',
    machineCount: 'Commercial Batch Scale',
    materialHighlight: 'Sanitary Crevice-Free Welds',
  },
  {
    id: 'liquid-mixers',
    name: 'Liquid Mixers & Agitators',
    tagline: 'High-Shear Dispersion & Emulsification',
    description: 'Sanitary stainless steel jacketed mixing vessels with top-entry agitators, baffle plates, and bottom valve discharge for viscous liquids.',
    image: '/images/products/liquid-mixer.jpg',
    machineCount: 'Custom Jacketed Tanks',
    materialHighlight: 'Sanitary Mechanical Seal',
  },
];

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'industrial-ribbon-blender',
    name: 'Industrial Ribbon Blender',
    category: 'Mixing & Blending',
    categoryId: 'mixing-blending',
    shortDesc: 'Heavy-duty U-shaped horizontal trough with counter-flow double helical ribbon agitator for rapid, uniform dry powder blending.',
    fullDesc: 'Fabricated with food-grade SS-304/SS-316 stainless steel, this industrial ribbon blender features an inner and outer helical ribbon that drives material in opposing axial directions. Delivers consistent homogeneity within minutes across food spices, pharma powders, and chemicals.',
    image: '/images/products/ribbon-blender.jpg',
    materialGrade: 'SS-304 / SS-316 Food Grade',
    capacityRange: '50 Kg to 5,000 Kg per batch',
    keyFeatures: [
      'Counter-flow double helical ribbon agitator',
      'Heavy-duty helical gearbox with TEFC industrial motor',
      'Mirror-polished interior with zero-dead-zone trough',
      'Air-purge shaft seals & safety interlock grill',
      'Sanitary butterfly or slide discharge valve'
    ],
    applications: ['Spice Powder Blending', 'Pharma Formulations', 'Bakery Premixes', 'Detergent Powder', 'Protein & Nutritional Blends'],
    whatsappMessage: 'Hello Duke Enterprises, I am interested in inquiring about your Industrial Ribbon Blender. Please share catalogue details.',
  },
  {
    id: 'industrial-roasting-machine',
    name: 'Industrial Roasting Machine',
    category: 'Roasting Machines',
    categoryId: 'roasting',
    shortDesc: 'Rotary drum roasting system equipped with regulated heating elements for uniform roasting of grains, spices, and dry fruits.',
    fullDesc: 'Engineered for batch consistency, Duke Enterprises drum roasters feature internal spiral flights that tumble product continuously without scorching. Available in electric heating and gas fired configurations with digital PID temperature controllers.',
    image: '/images/products/roasting-machine.jpg',
    materialGrade: 'SS-304 Drum Fabrication',
    capacityRange: '25 Kg to 500 Kg per batch',
    keyFeatures: [
      'Internal forward/reverse spiral flight mechanism',
      'Precision digital temperature regulation panel',
      'High-grade thermal insulation for energy efficiency',
      'Smooth discharge without product breakage',
      'Heavy-duty drive with variable speed option'
    ],
    applications: ['Groundnut & Peanut Roasting', 'Whole Spices (Coriander, Cumin)', 'Coffee & Grains', 'Sesame Seeds & Dry Fruits'],
    whatsappMessage: 'Hello Duke Enterprises, I would like to inquire regarding your Industrial Roasting Machine specifications.',
  },
  {
    id: 'chocolate-coating-machine',
    name: 'Chocolate & Tablet Coating Machine',
    category: 'Coating & Panning',
    categoryId: 'coating-panning',
    shortDesc: 'Revolving stainless steel coating pan with hot-air blower system for uniform sugar coating, chocolate panning, and tablet glazing.',
    fullDesc: 'Designed with an ellipsoidal stainless steel bowl driven by a variable-speed geared motor, this coating pan ensures seamless tumbling and even dispersion of chocolate, syrup, or seasoning slurries onto confectionery and tablets.',
    image: '/images/products/coating-pan.jpg',
    materialGrade: 'SS-304 Mirror Polish Bowl',
    capacityRange: '12" to 60" Bowl Diameter',
    keyFeatures: [
      'Seamless mirror-buffed stainless steel revolving pan',
      'Integrated adjustable hot-air blower manifold',
      'Heavy rigid cast-iron mounting pedestal',
      'Variable frequency drive for speed modulation',
      'Adjustable inclination angle for varied products'
    ],
    applications: ['Chocolate Panning & Glazing', 'Sugar Coated Confectionery', 'Pharmaceutical Tablet Coating', 'Nut & Seed Seasoning'],
    whatsappMessage: 'Hello Duke Enterprises, please provide details on your Chocolate and Tablet Coating Machine.',
  },
  {
    id: 'high-efficiency-vibro-sifter',
    name: 'High-Efficiency Vibro Sifter',
    category: 'Sifting & Screening',
    categoryId: 'sifting-screening',
    shortDesc: 'Circular multi-deck vibratory separator engineered for precise particle size classification and removal of oversize impurities.',
    fullDesc: 'Utilizing a specialized specially balanced vibratory motor with eccentric weights, this vibro sifter creates continuous three-dimensional inertial motion across single or multi-tier screens, achieving high throughput with anti-blinding ball trays.',
    image: '/images/products/vibro-sifter.jpg',
    materialGrade: 'SS-304 Contact Surfaces',
    capacityRange: '20" to 48" Screen Diameter',
    keyFeatures: [
      'Three-dimensional vibratory motion generation',
      'Quick-release clamp rings for rapid screen changeover',
      'Silicone bounce balls for anti-blinding performance',
      'Dust-tight sanitary top cover with inspection port',
      'Continuous automatic oversize material ejection'
    ],
    applications: ['Flour & Starch Screening', 'Pharmaceutical Active Ingredients', 'Chemical Pigments', 'Milk Powder & Spices'],
    whatsappMessage: 'Hello Duke Enterprises, I would like to request details for the High-Efficiency Vibro Sifter.',
  },
  {
    id: 'double-cone-blender',
    name: 'Double Cone Blender',
    category: 'Mixing & Blending',
    categoryId: 'mixing-blending',
    shortDesc: 'Symmetric cone blender offering gentle, cross-flow tumble blending for fragile dry granules and abrasive powders.',
    fullDesc: 'The conical geometry ensures sliding and rolling action across both halves of the container during each 360-degree rotation. Ideal for blending fragile particles without shearing or generating excessive frictional heat.',
    image: '/images/products/double-cone-blender.jpg',
    materialGrade: 'SS-316 / SS-304 Sanitary Build',
    capacityRange: '50 Litres to 3,000 Litres',
    keyFeatures: [
      'Symmetric dual-cone vessel with butterfly valve',
      'Gentle low-shear tumbling without particle attrition',
      'Safety perimeter guard rail with limit switch interlock',
      'Zero dead-corner sanitary mirror polish inside',
      'Optional internal intensifier bar for clump breaking'
    ],
    applications: ['Pharmaceutical Granule Blending', 'Metal & Ceramic Powders', 'Cosmetic Pigments', 'Infant Formula Powder'],
    whatsappMessage: 'Hello Duke Enterprises, please share technical specifications for your Double Cone Blender.',
  },
  {
    id: 'industrial-tray-dryer',
    name: 'Industrial Tray Dryer',
    category: 'Dryers & Ovens',
    categoryId: 'dryers-ovens',
    shortDesc: 'Electrically heated or steam-heated recirculating hot air oven for uniform dehydrating and curing of materials.',
    fullDesc: 'Features high-density insulated walls and a heavy-duty axial flow circulating blower that sweeps air horizontally across multi-tier perforated stainless steel trays. Digital micro-controller regulates temperature precisely up to 200°C.',
    image: '/images/products/tray-dryer.jpg',
    materialGrade: 'SS-304 Interior & Trays',
    capacityRange: '12, 24, 48, 96 & 192 Trays',
    keyFeatures: [
      'Cross-flow hot air recirculating blower design',
      'Uniform thermal distribution across all tray tiers',
      'Thick mineral wool insulation to minimize thermal loss',
      'Perforated food-grade stainless steel trays included',
      'Adjustable fresh air intake & moist exhaust dampers'
    ],
    applications: ['Dehydrated Vegetables & Herbs', 'Chemical Granule Curing', 'Spice Drying', 'Pharmaceutical Formulations'],
    whatsappMessage: 'Hello Duke Enterprises, I am inquiring regarding the Industrial Tray Dryer specifications and sizes.',
  },
  {
    id: 'commercial-tea-blender',
    name: 'Commercial Tea Blender Machine',
    category: 'Mixing & Blending',
    categoryId: 'mixing-blending',
    shortDesc: 'Rotary drum blending system engineered to blend various grades of orthodox and CTC tea leaves without leaf breakage.',
    fullDesc: 'Built specifically for tea blenders and exporters, this machine features internal gentle lifters that gently fold CTC and leaf teas to create uniform blends, aroma distribution, and consistent density without grinding the delicate tea dust.',
    image: '/images/products/tea-blender.jpg',
    materialGrade: 'SS-304 Sanitary Drum',
    capacityRange: '100 Kg to 2,000 Kg per batch',
    keyFeatures: [
      'Specially profiled gentle tumbling internal baffles',
      'Dust-tight loading hopper with inspection window',
      'Variable speed rotation for controlled agitation',
      'Direct central or perimeter discharge system',
      'Heavy-duty structural channel support frame'
    ],
    applications: ['CTC Tea Blending', 'Flavoured & Herbal Infusion Tea', 'Granular Food Blends', 'Dry Botanical Mixes'],
    whatsappMessage: 'Hello Duke Enterprises, please provide information on your Commercial Tea Blender Machine.',
  },
  {
    id: 'liquid-mixer-agitator',
    name: 'Liquid Detergent & Chemical Mixer',
    category: 'Liquid Mixers & Agitators',
    categoryId: 'liquid-mixers',
    shortDesc: 'Vertical cylindrical stainless steel vessel with high-torque gear drive and marine/anchor agitator for viscous blending.',
    fullDesc: 'Engineered for liquid soap, hand washes, floor cleaners, and industrial liquid chemicals. Available in atmospheric or dimple jacketed configurations for heating or cooling during formulation.',
    image: '/images/products/liquid-mixer.jpg',
    materialGrade: 'SS-304 / SS-316 / MS Optional',
    capacityRange: '100 Litres to 5,000 Litres',
    keyFeatures: [
      'High-torque geared motor with stainless agitator shaft',
      'Anchor, turbine, or high-shear homogenizing impellers',
      'Dished bottom with sanitary flush-bottom drain valve',
      'Baffle plates preventing vortex cavitation',
      'Top-mounted manhole with sight glass'
    ],
    applications: ['Liquid Detergent Formulation', 'Shampoo & Handwash Manufacturing', 'Chemical Emulsions', 'Liquid Syrups & Resins'],
    whatsappMessage: 'Hello Duke Enterprises, I would like to inquire about your Liquid Detergent and Chemical Mixer.',
  },
];

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: 'food-processing',
    name: 'Food Processing',
    description: 'Sanitary stainless steel machinery built to comply with food safety standards, preventing cross-contamination in powder and dry ingredient production.',
    image: '/images/industries/food-processing.jpg',
    commonEquipment: ['Ribbon Blenders', 'Vibro Sifters', 'Tray Dryers', 'Spice Roasters'],
  },
  {
    id: 'bakery-confectionery',
    name: 'Bakery & Confectionery',
    description: 'High-torque dough mixers, planetary blenders, and polished revolving coating pans for chocolate enrobing, sugar glazing, and dough preparation.',
    image: '/images/industries/bakery-confectionery.jpg',
    commonEquipment: ['Coating Pans', 'Planetary Mixers', 'Dough Kneaders', 'Tray Ovens'],
  },
  {
    id: 'chemical-processing',
    name: 'Chemical Processing',
    description: 'Reinforced industrial blending tanks and heavy powder mixers built for aggressive chemical compounds, pigments, and specialty formulations.',
    image: '/images/industries/chemical-processing.jpg',
    commonEquipment: ['Chemical Blenders', 'Agitator Vessels', 'Cage Mills', 'Screening Sifters'],
  },
  {
    id: 'detergent-manufacturing',
    name: 'Detergent Manufacturing',
    description: 'Complete production equipment for detergent washing powders and liquid surfactants, from raw active ingredient mixing to final screening.',
    image: '/images/industries/detergent-manufacturing.jpg',
    commonEquipment: ['Detergent Powder Mixers', 'Liquid Mixers', 'Screening Units', 'Homogenizers'],
  },
  {
    id: 'pharmaceutical',
    name: 'Pharmaceutical Processing',
    description: 'SS-316 sanitary powder blenders with mirror-buffed finishes, tri-clamp sanitary fittings, and smooth crevice-free internal radiuses.',
    image: '/images/industries/pharmaceutical.jpg',
    commonEquipment: ['Double Cone Blenders', 'Pharma Sifters', 'Sanitary Tray Dryers', 'Fluidized Mixers'],
  },
  {
    id: 'spice-grain',
    name: 'Spice & Grain Processing',
    description: 'Heavy continuous drum roasters, particle sifters, and ribbon blenders designed specifically to handle high-abrasion agricultural commodities.',
    image: '/images/industries/spice-grain.jpg',
    commonEquipment: ['Drum Roasters', 'Tea Blenders', 'High-Speed Vibro Sifters', 'Spice Mixers'],
  },
];

export const VIDEO_SHOWCASES: VideoShowcaseItem[] = [
  {
    id: 'vid-1',
    title: 'Industrial Ribbon Blender 500L Batch Cycle Test',
    machineType: 'Ribbon Blender (SS-304)',
    duration: '02:45',
    thumbnail: '/images/videos/video-ribbon-test.jpg',
    youtubeId: 'GwAdTXBR9bk',
    highlight: 'Observe counter-flow double helical ribbons creating fluidized convective blending.',
  },
  {
    id: 'vid-2',
    title: 'SS Continuous Drum Roaster Thermal Efficiency Test',
    machineType: 'Electric Drum Roaster',
    duration: '03:12',
    thumbnail: '/images/videos/video-roaster-test.jpg',
    youtubeId: 'mCZ2GufbPBU',
    highlight: 'Automated spiral flights tumbling grains with precision digital temperature control.',
  },
  {
    id: 'vid-3',
    title: 'High-Speed Multi-Deck Vibro Sifter Separation Analysis',
    machineType: 'Vibratory Screen Separator',
    duration: '01:58',
    thumbnail: '/images/videos/video-sifter-test.jpg',
    youtubeId: 'RSpr3l_m2SU',
    highlight: 'Three-dimensional vibratory action classifying dry powder without screen blinding.',
  },
];

export const COMPANY_FACTS = {
  name: 'DUKE ENTERPRISES',
  establishedYear: 2002,
  yearsOfExperience: 22,
  location: 'Shriram Colony, Rajeev Nagar, North East Delhi, New Delhi - 110094, India',
  city: 'New Delhi',
  country: 'India',
  phones: ['+91 9990717853', '+91 9990717858'],
  whatsappNumber: '+919990717853',
  whatsappDirectUrl: 'https://wa.me/919990717853',
  tagline: 'ENGINEERED FOR PRECISION. BUILT FOR PRODUCTION.',
  headlineIntro: 'Explore reliable industrial and food-processing machinery designed for modern manufacturing needs.',
  aboutSummary:
    'Established in 2002 in New Delhi, Duke Enterprises has earned an enduring reputation as a dedicated manufacturer and supplier of heavy-duty industrial machinery, food-processing equipment, and stainless steel blending systems. Fabricated under stringent sanitary quality protocols, our machinery powers continuous production across food, confectionery, chemical, and pharmaceutical processing industries nationwide.',
  stats: [
    { label: 'Established', value: '2002', detail: '22+ Years in Machinery' },
    { label: 'Material Standard', value: 'SS-304 / 316', detail: 'Food & Pharma Grade' },
    { label: 'Manufacturing Facility', value: 'New Delhi', detail: 'Capital Region, India' },
    { label: 'Equipment Delivered', value: '1,200+', detail: 'Production Plants Nationwide' },
  ]
};
