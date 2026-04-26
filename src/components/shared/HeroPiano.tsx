import pianoImage from '../../assets/piano-hero-keyboard.png'

export function HeroPiano() {
  return (
    <div className="hero-piano-container" aria-hidden="true">
      <div className="piano-top-mask" />
      <img src={pianoImage} alt="" className="hero-piano-image" />
      <div className="piano-side-fade" />
      <div className="piano-bottom-fade" />
    </div>
  )
}
