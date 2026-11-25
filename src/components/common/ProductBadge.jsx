import { Tag } from 'antd'

export function ProductBadge({ isNew, discountPercent, style = {} }) {
  if (discountPercent) {
    return (
      <Tag
        color="red"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          margin: 0,
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: '0.3px',
          zIndex: 1,
          ...style,
        }}
      >
        -{discountPercent}%
      </Tag>
    )
  }
  if (isNew) {
    return (
      <Tag
        color="blue"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          margin: 0,
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: '0.3px',
          zIndex: 1,
          ...style,
        }}
      >
        NEW
      </Tag>
    )
  }
  return null
}
