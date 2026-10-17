import type {
  Brand,
  Offer,
  OfferProduct,
  PosterTemplate
} from '@/domain/poster'

export const brand: Brand = {
  name: 'Supermercado Exemplo',
  logo: null,
  slogan: 'O menor preço da cidade',
  instagram: '@supermercadoexemplo'
}

export const offer: Offer = {
  validUntil: '20/10/2026',
  highlightTitle: 'Ofertas da semana',
  highlightMessage: 'Só nesta loja'
}

export const templates: PosterTemplate[] = [
  {
    id: 'mercado',
    name: 'Mercado',
    colors: { primary: '#1a1d6b', accent: '#e01b22' }
  },
  {
    id: 'acougue',
    name: 'Açougue',
    colors: { primary: '#5c1310', accent: '#e01b22' }
  },
  {
    id: 'hortifruti',
    name: 'Hortifrúti',
    colors: { primary: '#14532d', accent: '#ea580c' }
  }
]

const product = (
  code: string,
  name: string,
  brand: string,
  unit: string,
  priceInCents: number
): OfferProduct => ({
  code,
  codeType: 'internal',
  name,
  brand,
  unit,
  image: null,
  priceInCents
})

export const products: OfferProduct[] = [
  product('1', 'Arroz tipo 1', 'Camil', '5Kg', 2398),
  product('2', 'Feijão carioca', 'Kicaldo', '1Kg', 789),
  product(
    '3',
    'Refrigerante de cola sabor original garrafa retornável',
    'Coca-Cola',
    '2L',
    1099
  ),
  product('4', '-', 'Picanha bovina', 'Kg', 6990),
  product('5', 'Leite integral', 'Italac', '1L', 549),
  product('6', 'Café torrado e moído', '', '500g', 1890),
  product('7', 'Óleo de soja', 'Liza', '900ml', 799),
  product('8', '', '', '', 0),
  product('9', 'Macarrão espaguete', 'Renata Superiore Grano Duro', '500g', 105)
]
