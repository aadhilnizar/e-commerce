import { Modal, Button, Space, Typography, Tag } from 'antd'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { StarRating } from '../common/StarRating'
import { ProductBadge } from '../common/ProductBadge'
import { CATEGORY_MAP } from '../../utils/categories'

const { Title, Text, Paragraph } = Typography

export function ProductModal({ product, onClose }) {
  const { addToCart, setIsOpen: openCart } = useCart()

  const handleAdd = () => {
    addToCart(product)
    onClose()
    openCart(true)
  }

  return (
    <Modal
      open={!!product}
      onCancel={onClose}
      footer={null}
      width={760}
      centered
      destroyOnClose
    >
      {product && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ position: 'relative', background: '#f8fafc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, minHeight: 320 }}>
            <ProductBadge isNew={product.isNew} discountPercent={product.discountPercent} />
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '80%', maxHeight: 260, objectFit: 'contain' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
            <Tag color="blue" style={{ width: 'fit-content', fontSize: 10 }}>
              {CATEGORY_MAP[product.category] ?? product.category}
            </Tag>

            <Title level={4} style={{ margin: 0, lineHeight: 1.3 }}>
              {product.title}
            </Title>

            <StarRating value={product.rating.rate} count={product.rating.count} size={14} />

            <Space align="baseline" size={8}>
              <Text strong style={{ fontSize: 24, color: '#172033' }}>
                ${(product.discountPrice ?? product.price).toFixed(2)}
              </Text>
              {product.discountPrice && (
                <>
                  <Text delete type="secondary" style={{ fontSize: 14 }}>
                    ${product.price.toFixed(2)}
                  </Text>
                  <Tag color="green" style={{ fontSize: 10 }}>
                    Save ${(product.price - product.discountPrice).toFixed(2)}
                  </Tag>
                </>
              )}
            </Space>

            <Paragraph
              style={{ fontSize: 12, color: '#465268', lineHeight: 1.65, margin: 0, flex: 1 }}
            >
              {product.description}
            </Paragraph>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCart size={16} />}
              onClick={handleAdd}
              block
              style={{ marginTop: 'auto' }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
