import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { colors, padding, radius, spacing, typography } from '../../tokens'
import type { ListSelectionProps, ListSelectionState } from './ListSelection.types'

// ─── Token lookups per state ─────────────────────────────────────────────────

const SURFACE: Record<ListSelectionState, string> = {
  default:  colors.semantic.surface.secondary,
  error:    colors.semantic.surface.errorSubtle,
  success:  colors.semantic.surface.successSubtle,
  disabled: colors.semantic.surface.secondary,
}

const BORDER: Record<ListSelectionState, string> = {
  default:  colors.semantic.border.strong,
  error:    colors.semantic.border.error,
  success:  colors.semantic.border.success,
  disabled: 'transparent',
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ListSelection = ({
  label,
  state = 'default',
  onPress,
  accessibilityLabel,
  style: styleProp,
}: ListSelectionProps) => {
  const isDisabled = state === 'disabled'

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, selected: state === 'success' || state === 'error' }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed && state === 'default' ? colors.semantic.surface.hover : SURFACE[state],
          borderColor:     BORDER[state],
        },
        styleProp,
      ]}
    >
      <Text style={[styles.label, isDisabled && styles.labelDisabled]}>
        {label}
      </Text>
    </Pressable>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               spacing[8],
    minHeight:         44,
    paddingHorizontal: padding[12],
    paddingVertical:   padding[16],
    borderRadius:      radius[12],
    borderWidth:       1,
  },
  // Body/Regular — Roboto Regular, size.sm / line-height.md
  label: {
    flex:       1,
    fontFamily: typography.fontFamily.roboto,
    fontSize:   typography.fontSize.sm,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.fontWeight.regular,
    color:      colors.semantic.text.default,
  },
  labelDisabled: {
    color: colors.semantic.text.disabled,
  },
})
