export type ProductCategory = 'Limpieza' | 'Sérums' | 'Hidratación' | 'Protección'
export type SkinType = 'Seca' | 'Mixta' | 'Grasa' | 'Sensible' | 'Todas'

export type Product = {
  id: string
  slug: string
  name: string
  category: ProductCategory
  priceMXN: number
  size: string
  description: string
  benefits: string[]
  ingredients: string[]
  howToUse: string
  skinTypes: SkinType[]
  concerns: string[]
  tone: 'rose' | 'pearl' | 'berry' | 'gold'
  format: 'bottle' | 'dropper' | 'tube' | 'jar'
  badge?: string
  featured?: boolean
}

export const products: Product[] = [
  {
    id: '01', slug: 'gel-de-agua', name: 'Gel de Agua', category: 'Limpieza', priceMXN: 389, size: '150 ml',
    description: 'Una limpieza fresca que retira impurezas sin dejar la piel tirante. El primer sorbo de hidratación de tu ritual.',
    benefits: ['Limpia suavemente', 'Respeta la barrera', 'Sensación fresca'], ingredients: ['Agua de rosas', 'Pantenol', 'Té verde'],
    howToUse: 'Masajea una pequeña cantidad sobre el rostro húmedo durante 30 segundos. Enjuaga con agua tibia.', skinTypes: ['Todas', 'Mixta', 'Grasa'], concerns: ['Deshidratación', 'Brillo'], tone: 'pearl', format: 'bottle', badge: 'Best seller', featured: true,
  },
  {
    id: '02', slug: 'serum-luz', name: 'Sérum Luz', category: 'Sérums', priceMXN: 549, size: '30 ml',
    description: 'Un concentrado ligero para devolverle luz y energía a tu piel, gota a gota.',
    benefits: ['Ilumina visiblemente', 'Unifica el tono', 'Textura sedosa'], ingredients: ['Niacinamida 5%', 'Vitamina C', 'Ácido ferúlico'],
    howToUse: 'Aplica 2–3 gotas sobre rostro y cuello limpios. Úsalo por la mañana y acompaña con protector solar.', skinTypes: ['Todas', 'Mixta'], concerns: ['Opacidad', 'Manchas'], tone: 'rose', format: 'dropper', badge: 'Nuevo', featured: true,
  },
  {
    id: '03', slug: 'crema-nube', name: 'Crema Nube', category: 'Hidratación', priceMXN: 479, size: '50 g',
    description: 'Hidratación envolvente con acabado ligero. Como una nube, pero para tu barrera.',
    benefits: ['Hidrata 24 h', 'Refuerza la barrera', 'No deja sensación grasa'], ingredients: ['Ácido hialurónico', 'Ceramidas', 'Escualano'],
    howToUse: 'Después de tu sérum, toma una perla y presiona suavemente sobre rostro y cuello.', skinTypes: ['Seca', 'Sensible', 'Todas'], concerns: ['Deshidratación', 'Sensibilidad'], tone: 'pearl', format: 'jar', featured: true,
  },
  {
    id: '04', slug: 'aceite-noche', name: 'Aceite Noche', category: 'Sérums', priceMXN: 599, size: '30 ml',
    description: 'Un ritual nocturno nutritivo para despertar con una piel suave, descansada y luminosa.',
    benefits: ['Nutre intensamente', 'Suaviza textura', 'Calma la piel'], ingredients: ['Aceite de jojoba', 'Rosa mosqueta', 'Vitamina E'],
    howToUse: 'Calienta 3 gotas entre las manos y presiona sobre el rostro como último paso de tu ritual nocturno.', skinTypes: ['Seca', 'Sensible'], concerns: ['Textura', 'Sensibilidad'], tone: 'berry', format: 'dropper',
  },
  {
    id: '05', slug: 'balsamo-labios', name: 'Bálsamo Beso', category: 'Hidratación', priceMXN: 229, size: '12 g',
    description: 'Un velo de brillo y confort para labios que piden un poco más de amor.',
    benefits: ['Sella hidratación', 'Brillo natural', 'Aroma suave'], ingredients: ['Manteca de karité', 'Cera de candelilla', 'Aceite de almendra'],
    howToUse: 'Aplica directamente sobre los labios cuando lo necesites.', skinTypes: ['Todas'], concerns: ['Deshidratación'], tone: 'rose', format: 'tube', badge: 'Mini ritual',
  },
  {
    id: '06', slug: 'protector-diario', name: 'Protector Diario SPF 50', category: 'Protección', priceMXN: 529, size: '50 ml',
    description: 'Protección alta con acabado invisible para acompañarte todos los días, llueva o brille el sol.',
    benefits: ['SPF 50 de amplio espectro', 'Acabado invisible', 'No comedogénico'], ingredients: ['Filtros UVA/UVB', 'Vitamina E', 'Aloe vera'],
    howToUse: 'Aplica generosamente como último paso de tu rutina y reaplica cada dos horas.', skinTypes: ['Todas', 'Mixta', 'Grasa'], concerns: ['Manchas', 'Opacidad'], tone: 'gold', format: 'tube', badge: 'Esencial',
  },
  {
    id: '07', slug: 'mascarilla-miel', name: 'Mascarilla Miel', category: 'Hidratación', priceMXN: 429, size: '75 g',
    description: 'Un momento de pausa para devolverle elasticidad y suavidad a la piel cansada.',
    benefits: ['Calma al instante', 'Deja la piel flexible', 'Ritual semanal'], ingredients: ['Miel de agave', 'Avena coloidal', 'Caléndula'],
    howToUse: 'Aplica una capa generosa, deja actuar 10 minutos y retira con agua tibia.', skinTypes: ['Seca', 'Sensible', 'Todas'], concerns: ['Sensibilidad', 'Deshidratación'], tone: 'gold', format: 'jar',
  },
  {
    id: '08', slug: 'tonico-bruma', name: 'Bruma Rocío', category: 'Hidratación', priceMXN: 319, size: '100 ml',
    description: 'Una bruma fina que refresca, prepara y devuelve ese glow de “dormí ocho horas”.',
    benefits: ['Refresca', 'Prepara la piel', 'Glow instantáneo'], ingredients: ['Agua de pepino', 'Niacinamida', 'Agua de rosas'],
    howToUse: 'Rocía a 20 cm del rostro con los ojos cerrados. Úsala antes del sérum o durante el día.', skinTypes: ['Todas'], concerns: ['Opacidad', 'Deshidratación'], tone: 'pearl', format: 'bottle',
  },
  {
    id: '09', slug: 'limpiador-balsamo', name: 'Bálsamo Cero', category: 'Limpieza', priceMXN: 449, size: '80 g',
    description: 'Derrite maquillaje, protector solar e impurezas con la suavidad de un aceite transformador.',
    benefits: ['Doble limpieza', 'Retira maquillaje', 'No reseca'], ingredients: ['Aceite de chía', 'Manteca de mango', 'Vitamina F'],
    howToUse: 'Masajea sobre piel seca. Añade agua para emulsionar y retira con una toalla húmeda.', skinTypes: ['Seca', 'Sensible', 'Todas'], concerns: ['Sensibilidad', 'Textura'], tone: 'berry', format: 'jar',
  },
]

export const categories: Array<{ label: string; value: ProductCategory | 'Todos' }> = [
  { label: 'Todo', value: 'Todos' }, { label: 'Limpieza', value: 'Limpieza' }, { label: 'Sérums', value: 'Sérums' }, { label: 'Hidratación', value: 'Hidratación' }, { label: 'Protección', value: 'Protección' },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value)
}
