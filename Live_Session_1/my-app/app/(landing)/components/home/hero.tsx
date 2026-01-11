import { FiFastForward } from 'react-icons/fi';
import Button from '../ui/button';

const HeroSection = () => {
  return (
    <section 
      id="hero-section" 
      className="container mx-auto h-screen flex"
    >
      <div className="relative self-center">
        <img 
          src="images/img-basketball.svg" 
          width={450} 
          height={450} 
          alt="Basketball"
          className='grayscale absolute top-1/2 -translate-y-[340px]' 
          />
        <div className="w-1/2 relative ml-40">
          <div className="text-primary italic">
            Friday Sale, 50%
          </div>
          <h1 className="-ml-4 my-4 font-extrabold text-[95px] italic bg-gradient-to-b from-black to-[#979797] bg-clip-text text-transparent leading-25">
            WEAR YOUR
            TOP-QUALITY
            SPORTSWEAR
          </h1>
          <p className="w-3/4 text-justify my-8">
            Engineered for endurance and designed for speed. Experience gear that moves as fast as you do. Premium fabrics. Unmatched comfort. Limitless motion.
          </p>
          <div className="flex gap-5 mt-4">
            <Button>
              Explore More
              <FiFastForward/>
            </Button>
            <Button variant='ghost'>
              Watch Video
              <img src="images/play-button.svg" alt="Play button" width={29} height={29} />
            </Button>
          </div>
        </div>
        <img 
          src="images/img-hero.svg" 
          width={633} 
          height={710} 
          alt="Tennis"
          className='absolute right-40 top-1/2 -translate-y-[360px]' 
        />
        <img 
        src="images/Ellipse-3.svg" 
        width={250} 
        height={250} 
        alt="Ornament"
        className='absolute -right-[80px] top-1/2 -translate-y-[280px]'
          /> 
      </div>
      
    </section>
  )
}
export default HeroSection