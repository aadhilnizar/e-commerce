import { Drawer, Button, Typography, Space, Empty } from 'antd'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const { Text, Title } = Typography

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, cartTotal, isOpen, setIsOpen } = useCart()

  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      placement="right"
      width={380}
      title={
        <Space>
          <ShoppingBag size={18} />
          <span>Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
        </Space>
      }
      footer={
        items.length > 0 ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text strong style={{ fontSize: 15 }}>Total</Text>
              <Title level={4} style={{ margin: 0, color: '#1769aa' }}>
                ${cartTotal.toFixed(2)}
              </Title>
            </div>
            <Button type="primary" block size="large">
              Checkout
            </Button>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <Empty
          image={<ShoppingBag size={56} strokeWidth={1} color="#c0c8d4" />}
          imageStyle={{ height: 60 }}
          description={
            <span>
              <strong style={{ display: 'block', fontSize: 14 }}>Your cart is empty</strong>
              <span style={{ fontSize: 12, color: '#98a0ac' }}>Add some products to get started</span>
            </span>
          }
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(item => {
            const price = item.discountPrice ?? item.price
            return (
              <div
                key={item.id}
                style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 12, alignItems: 'start', padding: 12, border: '1px solid #f0f0f0', borderRadius: 8 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 64, height: 64, objectFit: 'contain', background: '#f8fafc', borderRadius: 6, padding: 4 }}
                />
                <div>
                  <Text
                    strong
                    style={{ fontSize: 11, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1769aa', marginTop: 4, marginBottom: 8 }}>
                    ${price.toFixed(2)}
                  </Text>
                  <Space size={6}>
                    <Button
                      size="small"
                      icon={<Minus size={11} />}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease"
                    />
                    <Text strong style={{ minWidth: 20, textAlign: 'center', display: 'inline-block' }}>
                      {item.quantity}
                    </Text>
                    <Button
                      size="small"
                      icon={<Plus size={11} />}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase"
                    />
                  </Space>
                </div>
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<Trash2 size={15} />}
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                />
              </div>
            )
          })}
        </div>
      )}
    </Drawer>
  )
}
