import { ImageOff } from 'lucide-react'

import { posterCharWidth } from '@/app/components/blocks/poster/_components/fonts'
import { posterPlaceholders } from '@/app/components/blocks/poster/_components/placeholders'
import { PriceTag } from '@/app/components/blocks/poster/_components/price-tag'
import { fitFontSize } from '@/domain/fit-font-size'
import {
  type OfferProduct,
  type PosterLayoutConfig,
  resolvePosterField
} from '@/domain/poster'

type ProductCardProps = {
  product: OfferProduct
  layout: PosterLayoutConfig
  width: number
}

const CARD_PADDING = 10
const HORIZONTAL_IMAGE_SHARE = 0.48

export const ProductCard = ({ product, layout, width }: ProductCardProps) => {
  const { scale, orientation } = layout
  const isHorizontal = orientation === 'horizontal'
  // The horizontal card gives name and brand a whole column, so they can grow past the card scale
  const textScale = isHorizontal ? scale * 1.25 : scale
  const labelPadding = 8 * textScale
  const contentWidth = width - CARD_PADDING * 2
  const labelWidth =
    (isHorizontal
      ? (contentWidth - 12) * (1 - HORIZONTAL_IMAGE_SHARE)
      : contentWidth) -
    labelPadding * 2

  const name = resolvePosterField(product.name, posterPlaceholders.name)
  const brand = resolvePosterField(product.brand, posterPlaceholders.brand)

  const nameFontSize = fitFontSize({
    text: name ?? '',
    width: labelWidth,
    lines: 2,
    maxFontSize: 22 * textScale,
    minFontSize: 14 * textScale,
    charWidth: posterCharWidth.body
  })
  const brandFontSize = fitFontSize({
    text: brand ?? '',
    width: labelWidth,
    lines: 1,
    maxFontSize: 34 * textScale,
    minFontSize: 18 * textScale,
    charWidth: posterCharWidth.heading
  })

  const priceTag = (
    <PriceTag
      priceInCents={product.priceInCents}
      unit={product.unit}
      scale={scale}
    />
  )

  return (
    <li
      className="relative flex min-h-0 bg-linear-to-b from-white to-(--poster-primary-tint) shadow-[0_7px_0_var(--poster-shadow)]"
      style={{
        flexDirection: isHorizontal ? 'row' : 'column',
        gap: isHorizontal ? 12 : 8,
        padding: CARD_PADDING,
        borderRadius: 22 * scale
      }}
    >
      <div
        className="relative min-h-0 overflow-hidden bg-(--poster-primary-tint)"
        style={{
          flex: isHorizontal ? `0 0 ${HORIZONTAL_IMAGE_SHARE * 100}%` : 1,
          borderRadius: 14 * scale
        }}
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- next/image lazy loads and rewrites the URL, so the PNG could be captured before the photo arrives
          <img
            src={product.image}
            alt=""
            className="block size-full object-contain"
          />
        ) : (
          <div
            className="flex size-full flex-col items-center justify-center text-(--poster-primary-deep)"
            style={{ gap: 6 * scale }}
          >
            <ImageOff size={40 * scale} strokeWidth={1.5} aria-hidden />
            <span
              className="font-semibold tracking-wide uppercase"
              style={{ fontSize: 14 * scale }}
            >
              Sem imagem
            </span>
          </div>
        )}
        {/* The horizontal card keeps the tag over the photo, so it never covers name and brand */}
        {isHorizontal && priceTag}
      </div>
      {!isHorizontal && priceTag}
      <div
        className="flex flex-col items-center justify-center bg-linear-to-b from-(--poster-primary-bright) to-(--poster-primary) text-center leading-none uppercase"
        style={{
          flex: isHorizontal ? 1 : 'none',
          minHeight: isHorizontal ? undefined : 88 * scale,
          borderRadius: 16 * scale,
          padding: `${6 * scale}px ${labelPadding}px`
        }}
      >
        {name && (
          <p
            className="line-clamp-2 font-semibold tracking-wide text-(--poster-primary-label)"
            style={{ fontSize: nameFontSize }}
          >
            {name}
          </p>
        )}
        {brand && (
          <p
            className="w-full truncate font-(family-name:--font-poster-heading) text-white"
            style={{
              fontSize: brandFontSize,
              lineHeight: 1.1,
              marginTop: name ? 4 * textScale : 0
            }}
          >
            {brand}
          </p>
        )}
      </div>
    </li>
  )
}
