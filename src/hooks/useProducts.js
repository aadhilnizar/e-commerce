import { useState, useEffect } from 'react'

const DISCOUNTS = { 2: 20, 4: 16, 6: 10, 11: 26 }
const NEW_IDS = new Set([1, 3, 7, 9, 13, 15, 17, 19])

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://fakestoreapi.com/products', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then(data => {
        setProducts(
          data.map(p => ({
            ...p,
            isNew: NEW_IDS.has(p.id),
            discountPercent: DISCOUNTS[p.id] ?? null,
            discountPrice: DISCOUNTS[p.id]
              ? +(p.price * (1 - DISCOUNTS[p.id] / 100)).toFixed(2)
              : null,
          }))
        )
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return { products, loading, error }
}
