import Image from 'next/image';
import HeroImage from './asset/Image.svg';

const Banner = () => {
  return (
    <section
      id="Home"
      className="select-none grid grid-cols-1 md:grid-cols-2 grid-flow-col bg-gray-light place-items-center pt-24 text-blackOlive"
    >
      <div className="col-span-1">
        <div>
          <p className="font-semibold text-5xl mx-auto p-12">
            An excellence
            <br />
            centre for education
          </p>
          <p className="font-extralight text-slate-500 text-2xl mx-auto px-10">
            BlueSky is the online learning platform that offers <br />
            various courses & videos for your development
          </p>
        </div>
      </div>
      <div className="col-span-1 hidden md:inline">
        <Image src={HeroImage} alt="HeroImage" />
      </div>
    </section>
  );
};

export default Banner;
