import { useState } from 'react'
import { Card, Button, Space, Typography } from 'antd'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { StarRating } from '../common/StarRating'
import { ProductBadge } from '../common/ProductBadge'

const { Text } = Typography

export function ProductCard({ product, onSelect }) {
  const { addToCart } = useCart()
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Card
      hoverable
      onClick={() => onSelect(product)}
      cover={
        <div style={{ position: 'relative', background: '#f8fafc', height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <ProductBadge isNew={product.isNew} discountPercent={product.discountPercent} />
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            style={{ maxHeight: 150, maxWidth: '80%', objectFit: 'contain', transition: 'transform 0.2s' }}
          />
          <button
            onClick={e => { e.stopPropagation(); setLiked(l => !l) }}
            aria-label="Add to wishlist"
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 30,
              height: 30,
              borderRadius: '50%',
              border: '1px solid #edf0f4',
              background: '#fff',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              color: liked ? '#d32f2f' : '#69748a',
              opacity: 0,
              transition: 'opacity 0.15s',
            }}
            className="card-wish-btn"
          >
            <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>
      }
      styles={{
        body: { padding: '12px 14px 14px' },
        cover: { overflow: 'hidden' },
      }}
      style={{ overflow: 'hidden' }}
      className="product-card"
      actions={[
        <Button
          key="add"
          type="default"
          icon={<ShoppingCart size={13} />}
          onClick={handleAdd}
          block
          size="small"
          style={added ? { background: '#f0fff0', borderColor: '#52c41a', color: '#389e0d' } : {}}
        >
          {added ? 'Added!' : 'Add to Cart'}
        </Button>,
      ]}
    >
      <Text
        strong
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontSize: 12,
          lineHeight: 1.4,
          minHeight: 34,
          marginBottom: 6,
        }}
      >
        {product.title}
      </Text>

      <div style={{ marginBottom: 8 }}>
        <StarRating value={product.rating.rate} count={product.rating.count} />
      </div>

      <Space size={6} align="baseline">
        <Text strong style={{ fontSize: 15, color: '#172033' }}>
          ${(product.discountPrice ?? product.price).toFixed(2)}
        </Text>
        {product.discountPrice && (
          <Text delete type="secondary" style={{ fontSize: 11 }}>
            ${product.price.toFixed(2)}
          </Text>
        )}
      </Space>
    </Card>
  )
}
