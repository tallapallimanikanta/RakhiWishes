import './FlowerPetals.css'

function FlowerPetals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 25 }, (_, i) => (
        <span
          key={i}
          className={`petal petal--${(i % 7) + 1}`}
          style={{
            left: `${(i * 4) % 100}%`,
            animationDelay: `${(i * 0.6) % 8}s`,
            animationDuration: `${6 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  )
}

export default FlowerPetals
