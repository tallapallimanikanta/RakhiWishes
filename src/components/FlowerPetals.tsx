import './FlowerPetals.css'

function FlowerPetals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 15 }, (_, i) => (
        <span
          key={i}
          className={`petal petal--${(i % 5) + 1}`}
          style={{
            left: `${(i * 7) % 100}%`,
            animationDelay: `${(i * 0.8) % 6}s`,
            animationDuration: `${6 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  )
}

export default FlowerPetals
