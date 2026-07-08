import colorJson     from './tokens/base/color.json'
import dimensionJson from './tokens/base/dimension.json'
import stringJson    from './tokens/base/string.json'

const px = (val: string): number => parseInt(val, 10)

const prim = colorJson.color.primitive
const br   = colorJson.color.brand

// ─── Colors ───────────────────────────────────────────────────────────────────

export const colors = {
  primitive: {
    neutral: {
      0:   prim.neutral['0'].value,
      50:  prim.neutral['50'].value,
      100: prim.neutral['100'].value,
      200: prim.neutral['200'].value,
      300: prim.neutral['300'].value,
      400: prim.neutral['400'].value,
      500: prim.neutral['500'].value,
      600: prim.neutral['600'].value,
      700: prim.neutral['700'].value,
      800: prim.neutral['800'].value,
      900: prim.neutral['900'].value,
      950: prim.neutral['950'].value,
    },
    success: {
      0:   prim.success['0'].value,
      50:  prim.success['50'].value,
      100: prim.success['100'].value,
      200: prim.success['200'].value,
      300: prim.success['300'].value,
      400: prim.success['400'].value,
      500: prim.success['500'].value,
      600: prim.success['600'].value,
      700: prim.success['700'].value,
      800: prim.success['800'].value,
      900: prim.success['900'].value,
      950: prim.success['950'].value,
    },
    warning: {
      0:   prim.warning['0'].value,
      50:  prim.warning['50'].value,
      100: prim.warning['100'].value,
      200: prim.warning['200'].value,
      300: prim.warning['300'].value,
      400: prim.warning['400'].value,
      500: prim.warning['500'].value,
      600: prim.warning['600'].value,
      700: prim.warning['700'].value,
      800: prim.warning['800'].value,
      900: prim.warning['900'].value,
      950: prim.warning['950'].value,
    },
    error: {
      0:   prim.error['0'].value,
      50:  prim.error['50'].value,
      100: prim.error['100'].value,
      200: prim.error['200'].value,
      300: prim.error['300'].value,
      400: prim.error['400'].value,
      500: prim.error['500'].value,
      600: prim.error['600'].value,
      700: prim.error['700'].value,
      800: prim.error['800'].value,
      900: prim.error['900'].value,
      950: prim.error['950'].value,
    },
    info: {
      0:   prim.info['0'].value,
      50:  prim.info['50'].value,
      100: prim.info['100'].value,
      200: prim.info['200'].value,
      300: prim.info['300'].value,
      400: prim.info['400'].value,
      500: prim.info['500'].value,
      600: prim.info['600'].value,
      700: prim.info['700'].value,
      800: prim.info['800'].value,
      900: prim.info['900'].value,
      950: prim.info['950'].value,
    },
  },
  brand: {
    primary: {
      0:   br.primary['0'].value,
      50:  br.primary['50'].value,
      100: br.primary['100'].value,
      200: br.primary['200'].value,
      300: br.primary['300'].value,
      400: br.primary['400'].value,
      500: br.primary['500'].value,
      600: br.primary['600'].value,
      700: br.primary['700'].value,
      800: br.primary['800'].value,
      900: br.primary['900'].value,
      950: br.primary['950'].value,
    },
    accent: {
      0:   br.accent['0'].value,
      50:  br.accent['50'].value,
      100: br.accent['100'].value,
      200: br.accent['200'].value,
      300: br.accent['300'].value,
      400: br.accent['400'].value,
      500: br.accent['500'].value,
      600: br.accent['600'].value,
      700: br.accent['700'].value,
      800: br.accent['800'].value,
      900: br.accent['900'].value,
      950: br.accent['950'].value,
    },
  },
  semantic: {
    button: {
      // References resolved from color.json → semantic.button → primitive/brand chains
      primary: {
        surfaceEnabled:  br.primary['950'].value,    // brand.primary.950
        surfaceHover:    br.primary['600'].value,    // brand.primary.600
        surfacePressed:  br.primary['800'].value,    // brand.primary.800
        surfaceDisabled: br.primary['100'].value,    // brand.primary.100
        textEnabled:     prim.neutral['0'].value,    // text.on-brand → neutral.0
        textDisabled:    prim.neutral['400'].value,  // text.disabled → neutral.400
        iconEnabled:     prim.neutral['0'].value,    // icons.on-brand → neutral.0
        iconDisabled:    prim.neutral['300'].value,  // icons.disabled → neutral.300
      },
      secondary: {
        surfaceEnabled:  br.primary['100'].value,    // brand.primary.100
        surfaceHover:    br.primary['400'].value,    // brand.primary.400
        surfacePressed:  prim.neutral['600'].value,  // neutral.600
        surfaceDisabled: br.primary['50'].value,     // brand.primary.50
        textEnabled:     prim.neutral['900'].value,  // text.default → neutral.900
        textDisabled:    prim.neutral['400'].value,  // text.disabled → neutral.400
        iconEnabled:     prim.neutral['900'].value,  // icons.default → neutral.900
        iconDisabled:    prim.neutral['300'].value,  // icons.disabled → neutral.300
      },
      ghost: {
        textEnabled:  br.accent['500'].value,        // button.ghost.text-enabled → accent.500
        textHover:    br.accent['700'].value,        // → accent.700
        textPressed:  prim.info['900'].value,        // → info.900
        textDisabled: prim.neutral['400'].value,     // → neutral.400
        iconEnabled:  br.accent['500'].value,        // icons.brand → accent.500
        iconHover:    br.primary['600'].value,       // icons.brand-muted → primary.600
        iconPressed:  br.primary['600'].value,
        iconDisabled: prim.neutral['300'].value,
      },
    },
  },
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

const dim = dimensionJson.dimension.dimension

export const spacing = {
  4:   px(dim['spacing-4'].value),
  8:   px(dim['spacing-8'].value),
  12:  px(dim['spacing-12'].value),
  16:  px(dim['spacing-16'].value),
  24:  px(dim['spacing-24'].value),
  32:  px(dim['spacing-32'].value),
  40:  px(dim['spacing-40'].value),
  48:  px(dim['spacing-48'].value),
  56:  px(dim['spacing-56'].value),
  64:  px(dim['spacing-64'].value),
} as const

export const padding = {
  4:   px(dim['padding-4'].value),
  8:   px(dim['padding-8'].value),
  12:  px(dim['padding-12'].value),
  16:  px(dim['padding-16'].value),
  20:  px(dim['padding-20'].value),
  24:  px(dim['padding-24'].value),
  32:  px(dim['padding-32'].value),
  40:  px(dim['padding-40'].value),
  48:  px(dim['padding-48'].value),
} as const

// ─── Radius ───────────────────────────────────────────────────────────────────

export const radius = {
  0:    px(dim['radius-0'].value),
  4:    px(dim['radius-4'].value),
  8:    px(dim['radius-8'].value),
  12:   px(dim['radius-12'].value),
  16:   px(dim['radius-16'].value),
  24:   px(dim['radius-24'].value),
  full: px(dim['radius-full'].value),
} as const

// ─── Size scale (font sizes + icon sizes share the same scale) ────────────────

const sizeJson = dimensionJson.dimension.size

export const size = {
  xxs: px(sizeJson['xxs'].value),  // 12
  xs:  px(sizeJson['xs'].value),   // 14
  sm:  px(sizeJson['sm'].value),   // 16
  md:  px(sizeJson['md'].value),   // 18
  lg:  px(sizeJson['lg'].value),   // 20
  xl:  px(sizeJson['xl'].value),   // 24
  '2xl': px(sizeJson['2xl'].value), // 32
  '3xl': px(sizeJson['3xl'].value), // 40
} as const

// ─── Typography ───────────────────────────────────────────────────────────────

const lhJson = dimensionJson.dimension['line-height']

export const typography = {
  fontFamily: {
    roboto:      stringJson.string.font['roboto'].value,
    robotoSerif: stringJson.string.font['roboto-serif'].value,
    robotoMono:  stringJson.string.font['roboto-mono'].value,
  },
  fontSize: {
    xxs: px(sizeJson['xxs'].value),
    xs:  px(sizeJson['xs'].value),
    sm:  px(sizeJson['sm'].value),
    md:  px(sizeJson['md'].value),
    lg:  px(sizeJson['lg'].value),
    xl:  px(sizeJson['xl'].value),
  },
  lineHeight: {
    xxs: px(lhJson['xxs'].value),
    xs:  px(lhJson['xs'].value),
    sm:  px(lhJson['sm'].value),
    md:  px(lhJson['md'].value),
    lg:  px(lhJson['lg'].value),
    xl:  px(lhJson['xl'].value),
  },
  // Mapped from Figma/Supernova weight names to React Native fontWeight values
  fontWeight: {
    regular:  '400' as const,
    semiBold: '600' as const,
    bold:     '700' as const,
    black:    '900' as const,
  },
}
