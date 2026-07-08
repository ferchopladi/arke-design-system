# ARKE Design System — Reglas para Claude Code

ARKE es el Design System fundacional personal de Fernando Gil.
Es la base de BECO (app educativa de Behavioral Economics para diseñadores UX hispanohablantes)
y de cualquier proyecto futuro que lo requiera.

**Repositorio:** `~/Documents/ClaudeCode/arke-design-system`
**Stack:** React Native + TypeScript (consumido por Expo SDK 54)
**Figma:** `gCBU8nv1hy3dkbs5fJrvHT`
**Pipeline:** Figma → Supernova → GitHub PR (Style Dictionary)

---

## Estructura del repositorio

```
arke-design-system/
├── tokens/
│   └── base/
│       ├── color.json       ← generado por Supernova, NO editar a mano
│       ├── dimension.json   ← generado por Supernova, NO editar a mano
│       └── string.json      ← generado por Supernova, NO editar a mano
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   └── [Componente]/
│       ├── [Componente].tsx
│       ├── [Componente].types.ts
│       └── index.ts
├── tokens.ts                ← helper que importa y expone los tokens como objeto TS
├── index.ts                 ← exporta todo: tokens + componentes
├── CLAUDE.md                ← este archivo
└── README.md
```

---

## Regla absoluta — Tokens

**Nunca usar valores hardcodeados. Siempre tokens.**

```tsx
// ✅ Correcto
import { colors, spacing, radius } from '../../tokens'
backgroundColor: colors.primitive.teal[500]

// ❌ Incorrecto — jamás
backgroundColor: '#1D9E75'
padding: 16
borderRadius: 8
```

Los tokens viven en `tokens/base/` como JSON generado por Supernova.
Deben exponerse a través de un helper `tokens.ts` en la raíz del repo
para que los componentes los importen de forma tipada.

---

## Checklist obligatorio — Todo componente sin excepción

Antes de escribir cualquier componente, responder estas 5 preguntas:

1. ¿Qué tipo de componente es? (interactivo / display / layout / tipografía)
2. ¿Qué variantes existen en Figma?
3. ¿Qué estados tiene?
4. ¿Qué recibe desde afuera (props)?
5. ¿Qué tokens usa?

Si no tienes respuesta a las 5, no empieces a codear.

### Las 8 reglas que todo componente debe cumplir

**1. TypeScript estricto**
- Interface clara con nombre `[Componente]Props`
- Sin `any`
- Props opcionales con `?` y defaults explícitos
- Exportar la interface para que quien consume el componente pueda tipar

```tsx
export interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onPress: () => void
}
```

**2. Tokens siempre**
- Colores: desde `tokens/base/color.json`
- Espaciado: desde `tokens/base/dimension.json`
- Tipografía: desde `tokens/base/string.json`
- Nunca hex, nunca números mágicos

**3. Variantes via props**
- Un solo componente con prop `variant`, nunca componentes separados
- `<Button variant="primary" />` ✅
- `<PrimaryButton />` ❌

**4. Estados completos según tipo de componente**

Interactivos (Button, Input, Toggle, Checkbox):
- `default` → `pressed` → `disabled` → `loading`
- `error` cuando aplique (Input, Form)

Display (Card, Badge, Tag, Avatar):
- Manejo de contenido vacío o nulo
- Truncamiento de texto largo con `numberOfLines`

Layout (Spacer, Divider, Container):
- Flexibilidad de tamaño via props

**5. Accesibilidad — no negociable**
```tsx
<Pressable
  accessibilityLabel={label}
  accessibilityRole="button"
  accessibilityState={{ disabled }}
  style={{ minHeight: 44, minWidth: 44 }} // touch target mínimo
/>
```

**6. Sin lógica de negocio**
- El componente NO sabe qué pasa cuando lo presionan
- Solo expone `onPress`, `onChange`, `onFocus` como callbacks
- Quien usa el componente decide qué hacer con esos eventos
- Sin fetch, sin llamadas a API, sin Redux, sin estado global

```tsx
// ✅ ARKE solo expone el callback
<Button onPress={onPress} />

// ✅ BECO-app decide qué hacer
<Button onPress={() => api.saveProduct(data)} />
```

**7. Una sola responsabilidad**
- Si el componente necesita más de 3 líneas para explicar qué hace, está haciendo demasiado
- Dividir en componentes más pequeños y componerlos

**8. Composición sobre configuración**
- Preferir `children` sobre props específicas de contenido cuando aplique

```tsx
// ✅ Flexible
<Button variant="primary">
  <Icon name="save" /> Guardar
</Button>

// ❌ Rígido
<Button label="Guardar" iconName="save" iconPosition="left" />
```

---

## Estructura interna de un componente

```tsx
// Button.tsx — estructura modelo

import React from 'react'
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { colors, spacing, typography, radius } from '../../tokens'
import type { ButtonProps } from './Button.types'

export const Button = ({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onPress,
}: ButtonProps) => {

  // 1. Estilos derivados de variante y estado
  // 2. Render guard para estados especiales
  // 3. JSX limpio y legible
  // 4. StyleSheet al final, con tokens

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {loading
        ? <ActivityIndicator />
        : <Text style={[styles.label, styles[`label_${variant}`]]}>{label}</Text>
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.base, // ← token
    paddingHorizontal: spacing.md, // ← token
  },
  // variantes usando tokens de color
  primary: {
    backgroundColor: colors.primitive.teal[500], // ← token
  },
  // ... resto de variantes y estados
})
```

---

## Archivo index.ts de cada componente

```ts
// components/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button.types'
```

## Archivo index.ts raíz del repo

```ts
// index.ts
export * from './components/Button'
export * from './components/Input'
// ... cada componente que se agregue
export * from './tokens'
```

---

## Convenciones de naming

| Qué | Formato | Ejemplo |
|-----|---------|---------|
| Componente | PascalCase | `Button`, `InputField` |
| Props interface | PascalCase + Props | `ButtonProps` |
| Archivo componente | PascalCase | `Button.tsx` |
| Archivo types | PascalCase + .types | `Button.types.ts` |
| Carpeta componente | PascalCase | `components/Button/` |
| Token en código | camelCase | `colors.primitive.teal` |
| Variante prop | lowercase | `'primary'`, `'secondary'` |

---

## Lo que NO se hace en este repositorio

```
❌ Valores hardcodeados (hex, px, números mágicos)
❌ Llamadas a API o fetch
❌ Estado global (Redux, Zustand, Context de negocio)
❌ Lógica de negocio de BECO dentro de ARKE
❌ Componentes separados por variante (PrimaryButton, SecondaryButton)
❌ any en TypeScript
❌ Estilos inline (todo va en StyleSheet)
❌ Editar manualmente los archivos en tokens/base/ (son generados por Supernova)
❌ Importar desde BECO-app (ARKE no conoce a BECO, BECO conoce a ARKE)
```

---

## Flujo de trabajo para cada componente nuevo

1. Leer el diseño en Figma con MCP (`get_design_context`)
2. Responder las 5 preguntas del checklist
3. Crear `components/[Nombre]/[Nombre].types.ts` — interface primero
4. Crear `components/[Nombre]/[Nombre].tsx` — implementación
5. Crear `components/[Nombre]/index.ts` — exportaciones
6. Agregar exportación en `index.ts` raíz
7. Verificar que no hay valores hardcodeados
8. Verificar que todos los estados están implementados
9. Verificar accesibilidad

---

## Relación ARKE ↔ BECO

```
Figma ARKE (gCBU8nv1hy3dkbs5fJrvHT)
    ↓ Supernova
arke-design-system (este repo)
    ↓ npm install @ferchopladi/arke (futuro)
BECO-app (~/Documents/ClaudeCode/BECO-app)
    ↓ Expo EAS Build
App Store + Play Store
```

ARKE no sabe nada de BECO. BECO importa de ARKE.
El flujo de dependencia es siempre en una sola dirección.

---

## Notas de plataforma

- **Expo SDK:** 54 (no actualizar a 56)
- **Target:** React Native / Expo Go
- **Plataformas:** iOS + Android (un solo codebase)
- **Puntos = px en @3x:** No aplicar conversión px×0.75
- **Touch target mínimo:** 44x44pt (estándar Apple y Google)
- **Fuentes disponibles:** Roboto Serif, Roboto (via @expo-google-fonts)
