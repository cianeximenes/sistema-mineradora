// src/components/Icon.jsx
// Componente de ícone com fallback visual enquanto os PNGs reais
// não são adicionados em /public/icons.

import { useState } from 'react'

export default function Icon({ src, alt = '', size = 20, className = '' }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <span
        className={`icon-fallback ${className}`}
        style={{ width: size, height: size }}
        title={alt}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`icon ${className}`}
      style={{ width: size, height: size }}
      onError={() => setError(true)}
    />
  )
}
