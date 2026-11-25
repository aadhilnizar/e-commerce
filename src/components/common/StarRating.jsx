import { Rate } from 'antd'

export function StarRating({ value, count, size = 12 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Rate
        disabled
        allowHalf
        value={value}
        style={{ fontSize: size, color: '#f4a622' }}
      />
      {count !== undefined && (
        <span style={{ fontSize: 11, color: '#98a0ac' }}>({count})</span>
      )}
    </span>
  )
}
