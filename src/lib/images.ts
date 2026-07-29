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
