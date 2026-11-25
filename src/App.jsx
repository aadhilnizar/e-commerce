import { ConfigProvider } from 'antd'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import StorePage from './pages/StorePage'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1769aa',
          borderRadius: 7,
          fontFamily: 'Inter, Arial, sans-serif',
        },
      }}
    >
      <CartProvider>
        <Navbar />
        <StorePage />
      </CartProvider>
    </ConfigProvider>
  )
}

export default App
