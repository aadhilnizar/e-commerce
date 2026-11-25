import { Card, Menu, Slider, Rate, Typography } from 'antd'
import { LayoutGrid, Zap, Sparkles, Tag } from 'lucide-react'
import { CATEGORY_MAP, CATEGORIES } from '../../utils/categories'

const { Title, Text } = Typography

const ICONS = {
  all: <LayoutGrid size={15} />,
  electronics: <Zap size={15} />,
  jewelery: <Sparkles size={15} />,
  "men's clothing": <Tag size={15} />,
  "women's clothing": <Tag size={15} />,
}

const menuItems = CATEGORIES.map(cat => ({
  key: cat,
  icon: ICONS[cat],
  label: CATEGORY_MAP[cat],
}))

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  maxPrice,
  priceMin,
  onPriceMinChange,
  priceMax,
  onPriceMaxChange,
  minRating,
  onRatingChange,
  isOpen,
  onClose,
}) {
  return (
    <aside className={`filter-sidebar ${isOpen ? 'is-open' : ''}`}>
      <Card
        size="small"
        style={{ borderRadius: 10 }}
        styles={{ body: { padding: '16px 0' } }}
      >
        <div style={{ padding: '0 16px 12px' }}>
          <Title level={5} style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#465268' }}>
            Categories
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedCategory]}
          onSelect={({ key }) => { onCategoryChange(key); onClose() }}
          items={menuItems}
          style={{ border: 'none', fontSize: 12 }}
        />

        <div style={{ padding: '16px 16px 4px', borderTop: '1px solid #f0f0f0', marginTop: 8 }}>
          <Title level={5} style={{ margin: '0 0 12px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#465268' }}>
            Price Range
          </Title>
          <Slider
            range
            min={0}
            max={maxPrice}
            step={0.01}
            value={[priceMin, priceMax]}
            onChange={([min, max]) => { onPriceMinChange(min); onPriceMaxChange(max) }}
            tooltip={{ formatter: v => `$${v.toFixed(2)}` }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <Text type="secondary" style={{ fontSize: 11 }}>${priceMin.toFixed(2)}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>${priceMax.toFixed(2)}</Text>
          </div>
        </div>

        <div style={{ padding: '16px 16px 4px', borderTop: '1px solid #f0f0f0', marginTop: 8 }}>
          <Title level={5} style={{ margin: '0 0 10px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#465268' }}>
            Rating
          </Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[5, 4, 3, 2, 1].map(r => (
              <button
                key={r}
                onClick={() => onRatingChange(minRating === r ? 0 : r)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: 0,
                  background: minRating === r ? '#e6f4ff' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <Rate disabled value={r} style={{ fontSize: 11, color: '#f4a622' }} />
                <Text style={{ fontSize: 11, color: '#69748a' }}>&amp; up</Text>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </aside>
  )
}
