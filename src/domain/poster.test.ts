import { describe, expect, test } from 'vitest'

import {
  getPageTemplate,
  getPosterLayout,
  getVisibleProducts,
  isHiddenField,
  isPosterLayout,
  type OfferProduct,
  PAGE_PRODUCT_COUNT,
  type PosterLayout,
  type PosterTemplate
} from './poster'

const products: OfferProduct[] = Array.from(
  { length: PAGE_PRODUCT_COUNT },
  (_, index) => ({
    code: String(index),
    codeType: 'internal',
    name: `Produto ${index}`,
    brand: '',
    unit: 'UN',
    image: null,
    priceInCents: 100
  })
)

const templates: PosterTemplate[] = [
  { id: 'a', name: 'Mercado', colors: { primary: '#000', accent: '#f00' } },
  { id: 'b', name: 'Açougue', colors: { primary: '#300', accent: '#f00' } }
]

describe('getVisibleProducts', () => {
  test.each<PosterLayout>([9, 6, 4, 3])(
    'shows the first %i products',
    (layout) => {
      const visible = getVisibleProducts({ layout, products })
      expect(visible).toEqual(products.slice(0, layout))
    }
  )
})

describe('getPosterLayout', () => {
  test('lays out 3 products as one horizontal card per row', () => {
    expect(getPosterLayout(3)).toMatchObject({
      columns: 1,
      rows: 3,
      orientation: 'horizontal'
    })
  })

  test('has room for every visible product in each layout', () => {
    for (const layout of [9, 6, 4, 3] as const) {
      const { columns, rows } = getPosterLayout(layout)
      expect(columns * rows).toBe(layout)
    }
  })
})

describe('isPosterLayout', () => {
  test('accepts only the supported product counts', () => {
    expect(isPosterLayout(6)).toBe(true)
    expect(isPosterLayout(5)).toBe(false)
    expect(isPosterLayout('9')).toBe(false)
  })
})

describe('getPageTemplate', () => {
  test('returns the template the page points to', () => {
    expect(getPageTemplate(templates, 'b')?.name).toBe('Açougue')
  })

  test('falls back to the first template when the page points to a missing one', () => {
    expect(getPageTemplate(templates, 'deleted')?.id).toBe('a')
  })

  test('returns undefined when the instance has no templates', () => {
    expect(getPageTemplate([], 'a')).toBeUndefined()
  })
})

describe('isHiddenField', () => {
  test('hides a field that holds only the marker', () => {
    expect(isHiddenField('-')).toBe(true)
    expect(isHiddenField('  - ')).toBe(true)
  })

  test('keeps empty and regular values visible', () => {
    expect(isHiddenField('')).toBe(false)
    expect(isHiddenField('Coca-Cola')).toBe(false)
  })
})
