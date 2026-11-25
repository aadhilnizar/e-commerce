import { useState, useMemo, useEffect } from 'react'
import {
  Input,
  Select,
  Segmented,
  Spin,
  Empty,
  Pagination,
  Space,
  Typography,
  Button,
} from 'antd'
import { SlidersHorizontal, LayoutGrid, List, Table as TableIcon } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { FilterSidebar } from '../components/store/FilterSidebar'
import { ProductCard } from '../components/store/ProductCard'
import { ProductTable } from '../components/store/ProductTable'
import { ProductModal } from '../components/store/ProductModal'
import { CartDrawer } from '../components/store/CartDrawer'
import '../styles/store.css'

const { Title, Text } = Typography
const PRODUCTS_PER_PAGE = 8

const SORT_OPTIONS = [
  { value: 'default', label: 'Best Sellers' },
  { value: 'low-high', label: 'Price: Low to High' },
  { value: 'high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

const VIEW_OPTIONS = [
  { label: <LayoutGrid size={16} />, value: 'grid' },
  { label: <List size={16} />, value: 'list' },
  { label: <TableIcon size={16} />, value: 'table' },
]

function StorePage() {
  const { products, loading, error } = useProducts()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(null)
  const [minRating, setMinRating] = useState(0)
  const [viewMode, setViewMode] = useState('grid')
  const [page, setPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const computedMaxPrice = useMemo(
    () => products.reduce((m, p) => Math.max(m, p.price), 0),
    [products]
  )

  useEffect(() => {
    if (computedMaxPrice > 0) {
      setPriceMax(prev => prev === null ? Math.ceil(computedMaxPrice) : prev)
    }
  }, [computedMaxPrice])

  const effectivePriceMax = priceMax ?? computedMaxPrice

  const filtered = useMemo(() => {
    let list = products

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(q))
    }
    if (category !== 'all') {
      list = list.filter(p => p.category === category)
    }
    if (priceMin > 0) {
      list = list.filter(p => p.price >= priceMin)
    }
    if (effectivePriceMax > 0) {
      list = list.filter(p => p.price <= effectivePriceMax)
    }
    if (minRating > 0) {
      list = list.filter(p => p.rating.rate >= minRating)
    }
    if (sortBy === 'low-high') {
      list = [...list].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
    } else if (sortBy === 'high-low') {
      list = [...list].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating.rate - a.rating.rate)
    }

    return list
  }, [products, search, category, sortBy, priceMin, effectivePriceMax, minRating])

  const totalItems = filtered.length
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)

  const handleSearch = (value) => { setSearch(value); setPage(1) }
  const handleCategory = (cat) => { setCategory(cat); setPage(1) }
  const clearFilters = () => { setSearch(''); setCategory('all'); setPriceMin(0); setPriceMax(null); setMinRating(0); setPage(1) }

  return (
    <main className="store-page">
      <div className="store-container">
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        <FilterSidebar
          selectedCategory={category}
          onCategoryChange={handleCategory}
          maxPrice={Math.ceil(computedMaxPrice) || 1000}
          priceMin={priceMin}
          onPriceMinChange={v => { setPriceMin(v); setPage(1) }}
          priceMax={effectivePriceMax || 0}
          onPriceMaxChange={v => { setPriceMax(v); setPage(1) }}
          minRating={minRating}
          onRatingChange={r => { setMinRating(r); setPage(1) }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="store-main">
          <div className="store-header">
            <div>
              <Title level={3} style={{ margin: 0 }}>Shop</Title>
              <Text type="secondary" style={{ fontSize: 12 }}>Discover our products</Text>
            </div>

            <Space wrap size={8} className="sort-bar">
              <Button
                icon={<SlidersHorizontal size={15} />}
                onClick={() => setSidebarOpen(true)}
                className="filter-toggle-btn"
              >
                Filters
              </Button>

              <Input.Search
                placeholder="Search products..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                onSearch={handleSearch}
                allowClear
                style={{ width: 200 }}
                size="middle"
              />

              <Space size={6}>
                <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>Sort by</Text>
                <Select
                  value={sortBy}
                  onChange={v => { setSortBy(v); setPage(1) }}
                  options={SORT_OPTIONS}
                  style={{ width: 170 }}
                  size="middle"
                />
              </Space>

              <Segmented
                value={viewMode}
                onChange={setViewMode}
                options={VIEW_OPTIONS}
                size="middle"
              />
            </Space>
          </div>

          {loading && (
            <div className="state-box">
              <Spin size="large" tip="Loading products..." />
            </div>
          )}

          {error && (
            <div className="state-box">
              <Empty
                description={
                  <span>
                    <strong>Failed to load products</strong>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{error}</Text>
                  </span>
                }
              />
              <Button onClick={() => window.location.reload()} style={{ marginTop: 12 }}>
                Try again
              </Button>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="state-box">
              <Empty description="No products found" />
              <Button onClick={clearFilters} style={{ marginTop: 12 }}>
                Clear filters
              </Button>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <>
              {viewMode === 'table' ? (
                <ProductTable
                  products={paginated}
                  onSelect={setSelectedProduct}
                  loading={loading}
                />
              ) : (
                <div className={`product-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                  {paginated.map(p => (
                    <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} />
                  ))}
                </div>
              )}

              <div className="pagination-wrap">
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Showing {(page - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(page * PRODUCTS_PER_PAGE, totalItems)} of {totalItems} products
                </Text>
                <Pagination
                  current={page}
                  total={totalItems}
                  pageSize={PRODUCTS_PER_PAGE}
                  onChange={setPage}
                  showSizeChanger={false}
                  size="small"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer />
    </main>
  )
}

export default StorePage
