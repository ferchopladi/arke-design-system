import type { ViewStyle } from 'react-native'

export type ListSelectionState = 'default' | 'error' | 'success' | 'disabled'

export interface ListSelectionProps {
  label:               string
  /** Visual state. 'disabled' also blocks presses */
  state?:              ListSelectionState
  onPress:             () => void
  accessibilityLabel?: string
  style?:              ViewStyle
}
