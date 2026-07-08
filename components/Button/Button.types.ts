import type { ViewStyle } from 'react-native'

export type ButtonVariant     = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize        = 'large' | 'medium' | 'small'
export type ButtonIconPosition = 'leading' | 'trailing'

interface ButtonBaseProps {
  variant?:      ButtonVariant
  size?:         ButtonSize
  disabled?:     boolean
  loading?:      boolean
  /** Icon as render prop — receives the resolved tint color for the current state */
  icon?:         (tintColor: string) => React.ReactNode
  showIcon?:     boolean
  iconPosition?: ButtonIconPosition
  onPress:       () => void
  style?:        ViewStyle
}

export type ButtonProps =
  | (ButtonBaseProps & {
      label:               string
      iconOnly?:           false
      accessibilityLabel?: string
    })
  | (ButtonBaseProps & {
      label?:              string
      iconOnly:            true
      accessibilityLabel:  string
    })
