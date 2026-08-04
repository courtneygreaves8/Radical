const q = 'auto=format&fit=crop&w=1600&q=80'

/** UK / urban / graffiti frames — rendered B&W + grain in CSS. */
export const urbanImages = {
  /** Shoreditch graffiti facade */
  shoreditch: `https://images.unsplash.com/photo-1651594201598-449c8fb39bef?${q}`,
  /** Soho pavement + mural */
  soho: `https://images.unsplash.com/photo-1530975080071-4d6704a9a993?${q}`,
  /** B&W Shaftesbury Avenue, London */
  shaftesbury: `https://images.unsplash.com/photo-1698226508620-d67a72d41055?${q}`,
  /** London skyline / Thames */
  londonSky: `https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?${q}`,
  /** London brick street */
  brickStreet: `https://images.unsplash.com/photo-1486299267070-83823f5448dd?${q}`,
  /** Dense city street */
  cityStreet: `https://images.unsplash.com/photo-1570168007204-dfb528c6958f?${q}`,
  /** London bus street scene */
  londonBus: `https://images.unsplash.com/photo-1520986606214-8b456906c813?${q}`,
  /** Urban alley grit */
  alley: `https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?${q}`,
  /** Night city */
  nightCity: `https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?${q}`,
  /** Graffiti / street art wall */
  graffitiWall: `https://images.unsplash.com/photo-1583225214464-9296029427aa?${q}`,
  /** Spray tags */
  tags: `https://images.unsplash.com/photo-1541961017774-22349e4a1262?${q}`,
  /** Mural texture */
  mural: `https://images.unsplash.com/photo-1555431189-0fabf2667795?${q}`,
  /** Phone box UK street */
  phoneBox: `https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?${q}`,
  /** Crossing energy */
  crossing: `https://images.unsplash.com/photo-1514565131-fce0801e5785?${q}`,
  /** Estate / concrete */
  estate: `https://images.unsplash.com/photo-1488747279002-c8523379faaa?${q}`,
  /** Wet city pavement */
  wetStreet: `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?${q}`,
} as const

export type UrbanImageKey = keyof typeof urbanImages

/** Temporary people placeholders — rendered B&W + grain in CSS. */
export const peopleImages = {
  /** Friends laughing outdoors */
  friends: `https://images.unsplash.com/photo-1529156069898-49953e39b3ac?${q}`,
  /** Community / group gathering */
  gathering: `https://images.unsplash.com/photo-1511632765486-a01980e01a18?${q}`,
  /** Hands raised / worship energy */
  raised: `https://images.unsplash.com/photo-1517457373958-b7bdd4587205?${q}`,
  /** Street walk / city people */
  street: `https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?${q}`,
  /** Close portrait */
  portrait: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?${q}`,
  /** Man portrait */
  portraitMan: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?${q}`,
  /** Crowd movement B&W */
  crowd: `https://images.unsplash.com/photo-1639754755492-73849e638f12?${q}`,
  /** Group reunion B&W */
  group: `https://images.unsplash.com/photo-1729855727292-84f31a2304a8?${q}`,
  /** Man in crowd B&W */
  manCrowd: `https://images.unsplash.com/photo-1718184310601-eb098434ea99?${q}`,
} as const

export type PeopleImageKey = keyof typeof peopleImages

/** V3 hero — local Unsplash picks kept for later. */
export const heroImages = {
  /** Low-angle step / shoe */
  step: '/hero/step.jpg',
  /** Looking out at sky */
  sky: '/hero/sky.jpg',
  /** Beanie portrait looking down */
  look: '/hero/look.jpg',
  /** Seated on stairs */
  stairs: '/hero/stairs.jpg',
  /** Beanie + hand gesture */
  gesture: '/hero/gesture.jpg',
  /** Elder beard portrait */
  elder: '/hero/elder.jpg',
  /** Prayer card portrait */
  prayer: '/hero/prayer.jpg',
  /** Pray hat / worship */
  pray: '/hero/pray.jpg',
  /** Worship / prayer crowd */
  worship: '/hero/worship.jpg',
  /** Prayer hands portrait */
  hands: '/hero/hands.jpg',
  /** Choose Love trio (color) */
  chooseLove: '/hero/choose-love.jpg',
  /** Shout / night lights (color) */
  shout: '/hero/shout.jpg',
  /** Dusk silhouette (color) */
  dusk: '/hero/dusk.jpg',
  /** Prayer / profile portrait (B&W) */
  prayerProfile: '/hero/prayer-profile.png',
  /** Low-angle look-down portrait (rotated) */
  lowAngle: '/hero/low-angle.png',
  /** Stairs / glasses portrait */
  stairsPortrait: '/hero/stairs-portrait.png',
  /** Beard + wood slat ceiling */
  woodSlat: '/hero/wood-slat.png',
} as const

/**
 * Current V3 hero assignment — keep these three for later.
 * Hero UI uses grey stubs for now; wire `src` back from here when ready.
 */
export const heroSlots = {
  /** Bottom-left — About us (low-angle portrait) */
  about: heroImages.lowAngle,
  /** Bottom-middle — Radical · Norwich (wood slat portrait, card style) */
  city: heroImages.woodSlat,
  /** Tall right — This Sunday (prayer profile B&W) */
  sunday: heroImages.prayerProfile,
} as const
