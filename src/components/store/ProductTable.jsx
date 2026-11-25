import { useState } from 'react'
import { Table, Button, Tag, Space, Typography } from 'antd'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { StarRating } from '../common/StarRating'
import { ProductBadge } from '../common/ProductBadge'
import { CATEGORY_MAP } from '../../utils/categories'

const { Text, Paragraph } = Typography

function AddButton({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Button
      type="primary"
      size="small"
      icon={<ShoppingCart size={13} />}
      onClick={handleClick}
      style={added ? { background: '#52c41a', borderColor: '#52c41a' } : {}}
    >
      {added ? 'Added!' : 'Add to Cart'}
    </Button>
  )
}

export function ProductTable({ products, onSelect, loading }) {
  const columns = [
    {
      title: 'Image',
      key: 'image',
      width: 90,
      render: (_, record) => (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={record.image}
            alt={record.title}
            style={{ width: 64, height: 64, objectFit: 'contain', background: '#f8fafc', borderRadius: 6, padding: 4 }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <ProductBadge
              isNew={record.isNew}
              discountPercent={record.discountPercent}
              style={{ position: 'static', fontSize: 9, padding: '1px 5px' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Product',
      key: 'product',
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: 13 }}>{record.title}</Text>
          <Paragraph
            ellipsis={{ rows: 2 }}
            type="secondary"
            style={{ marginBottom: 0, fontSize: 11, marginTop: 2 }}
          >
            {record.description}
          </Paragraph>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      filters: Object.entries(CATEGORY_MAP)
        .filter(([k]) => k !== 'all')
        .map(([k, v]) => ({ text: v, value: k })),
      onFilter: (value, record) => record.category === value,
      render: (cat) => (
        <Tag color="blue" style={{ fontSize: 11 }}>{CATEGORY_MAP[cat] ?? cat}</Tag>
      ),
    },
    {
      title: 'Rating',
      key: 'rating',
      width: 160,
      sorter: (a, b) => a.rating.rate - b.rating.rate,
      render: (_, record) => (
        <StarRating value={record.rating.rate} count={record.rating.count} size={12} />
      ),
    },
    {
      title: 'Price',
      key: 'price',
      width: 120,
      sorter: (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price),
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ fontSize: 14 }}>
            ${(record.discountPrice ?? record.price).toFixed(2)}
          </Text>
          {record.discountPrice && (
            <Text delete type="secondary" style={{ fontSize: 11 }}>
              ${record.price.toFixed(2)}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 130,
      render: (_, record) => <AddButton product={record} />,
    },
  ]

  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={false}
      size="middle"
      onRow={(record) => ({
        onClick: () => onSelect(record),
        style: { cursor: 'pointer' },
      })}
      scroll={{ x: 700 }}
    />
  )
}
