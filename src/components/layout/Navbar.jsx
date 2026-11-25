import { useState } from 'react'
import { Badge } from 'antd'
import {
  Search,
  UserRound,
  ShoppingCart,
  Menu,
  X,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import '../../styles/navbar.css'

const navigation = ['Home', 'Shop', 'Deals', 'New Arrivals', 'Contact']

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, setIsOpen } = useCart()

  return (
    <header className="site-header">
      <div className="announcement">
        <Truck size={15} strokeWidth={1.8} />
        <span>
          Free shipping on orders over <strong>$50</strong>
        </span>
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-inner">
          <a className="brand" href="/" aria-label="Go to home">
            <span className="brand-mark"><ShoppingBag size={23} strokeWidth={1.8} /></span>
            <span className="brand-text">YOUR LOGO HERE</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className={`nav-menu ${menuOpen ? 'is-open' : ''}`}>
            {navigation.map((item) => (
              <a
                className={item === 'Shop' ? 'active' : ''}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                key={item}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            {/* <button className="header-search" type="button" aria-label="Search products">
              <Search size={16} />
              <span>Search productssss...</span>
            </button> */}
            {/* <button className="icon-button desktop-action" type="button" aria-label="Search">
              <Search size={20} />
            </button> */}
            <button className="icon-button" type="button" aria-label="Account">
              <UserRound size={20} />
            </button>
            <button
              className="icon-button"
              type="button"
              aria-label={`Cart, ${cartCount} items`}
              onClick={() => setIsOpen(true)}
              style={{ position: 'relative' }}
            >
              <Badge count={cartCount} size="small" offset={[4, -4]}>
                <ShoppingCart size={20} />
              </Badge>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
