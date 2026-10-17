import { Anton, Barlow_Condensed } from 'next/font/google'

// next/font downloads the files at build time and serves them from the instance,
// so the poster renders the same on a store network without internet access
export const posterHeadingFont = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poster-heading'
})

export const posterBodyFont = Barlow_Condensed({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poster-body'
})

// Average uppercase glyph advance (in em), used to estimate how much text fits a box
export const posterCharWidth = {
  heading: 0.5,
  body: 0.5
}
