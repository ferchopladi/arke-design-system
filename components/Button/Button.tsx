import React from 'react'
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { colors, padding, radius, size, spacing, typography } from '../../tokens'
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types'

// ─── Token lookups per variant / state ───────────────────────────────────────

function resolveBg(
  variant: ButtonVariant,
  disabled: boolean,
  pressed: boolean,
): string | undefined {
  if (variant === 'tertiary') return undefined
  const t = variant === 'primary'
    ? colors.semantic.button.primary
    : colors.semantic.button.secondary
  if (disabled) return t.surfaceDisabled
  if (pressed)  return t.surfacePressed
  return t.surfaceEnabled
}

function resolveTextColor(
  variant: ButtonVariant,
  disabled: boolean,
  pressed: boolean,
): string {
  if (variant === 'primary') {
    return disabled
      ? colors.semantic.button.primary.textDisabled
      : colors.semantic.button.primary.textEnabled
  }
  if (variant === 'secondary') {
    return disabled
      ? colors.semantic.button.secondary.textDisabled
      : colors.semantic.button.secondary.textEnabled
  }
  const g = colors.semantic.button.ghost
  if (disabled) return g.textDisabled
  if (pressed)  return g.textPressed
  return g.textEnabled
}

function resolveIconColor(
  variant: ButtonVariant,
  disabled: boolean,
  pressed: boolean,
): string {
  if (variant === 'primary') {
    return disabled
      ? colors.semantic.button.primary.iconDisabled
      : colors.semantic.button.primary.iconEnabled
  }
  if (variant === 'secondary') {
    return disabled
      ? colors.semantic.button.secondary.iconDisabled
      : colors.semantic.button.secondary.iconEnabled
  }
  const g = colors.semantic.button.ghost
  if (disabled) return g.iconDisabled
  if (pressed)  return g.iconPressed
  return g.iconEnabled
}

// ─── Static style maps (built from tokens, not magic numbers) ────────────────

const PADDING_STYLE: Record<ButtonSize, { padding: number }> = {
  large:  { padding: padding[16] },
  medium: { padding: padding[12] },
  small:  { padding: padding[8] },
}

const ICON_STYLE: Record<ButtonSize, { width: number; height: number }> = {
  large:  { width: size.xl,  height: size.xl  },
  medium: { width: size.lg,  height: size.lg  },
  small:  { width: size.sm,  height: size.sm  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = ({
  label,
  variant  = 'primary',
  size:    sizeProp = 'large',
  disabled = false,
  loading  = false,
  icon,
  showIcon = true,
  iconPosition = 'trailing',
  iconOnly = false,
  onPress,
  style: styleProp,
  accessibilityLabel,
}: ButtonProps) => {
  const isDisabled = disabled || loading
  const isSmall    = sizeProp === 'small'

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled, busy: loading }}
      style={({ pressed }) => [
        styles.container,
        PADDING_STYLE[sizeProp],
        iconOnly && styles.iconOnly,
        variant !== 'tertiary' && {
          backgroundColor: resolveBg(variant, isDisabled, pressed),
          borderRadius:    radius.full,
        },
        styleProp,
      ]}
    >
      {({ pressed }) => {
        const textColor = resolveTextColor(variant, isDisabled, pressed)
        const iconColor = resolveIconColor(variant, isDisabled, pressed)

        if (loading) {
          return <ActivityIndicator color={textColor} />
        }

        const iconElement = showIcon && icon && (
          <View style={ICON_STYLE[sizeProp]}>
            {icon(iconColor)}
          </View>
        )

        if (iconOnly) {
          return iconElement
        }

        return (
          <>
            {iconPosition === 'leading' && iconElement}
            <Text
              style={[
                isSmall ? styles.labelSmall : styles.labelBase,
                variant === 'tertiary' && styles.underline,
                { color: textColor },
              ]}
            >
              {label}
            </Text>
            {iconPosition === 'trailing' && iconElement}
          </>
        )
      }}
    </Pressable>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            spacing[4],
    alignSelf:      'flex-start',
    minHeight:      44,
    minWidth:       44,
  },
  // Large + Medium: Body/Medium — Roboto Bold, size.xs / line-height.sm
  labelBase: {
    fontFamily: typography.fontFamily.roboto,
    fontSize:   typography.fontSize.xs,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.fontWeight.bold,
    textAlign:  'center',
  },
  // Small: Caption/Medium — Roboto SemiBold, size.xxs / line-height.xs
  labelSmall: {
    fontFamily: typography.fontFamily.roboto,
    fontSize:   typography.fontSize.xxs,
    lineHeight: typography.lineHeight.xs,
    fontWeight: typography.fontWeight.semiBold,
    textAlign:  'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  iconOnly: {
    aspectRatio: 1,
  },
})
