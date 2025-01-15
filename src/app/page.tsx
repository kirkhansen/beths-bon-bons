import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";

const importAll = (r: __WebpackModuleApi.RequireContext): string[] => {
  return r.keys().map((key) => r(key).default);
};

const Home: React.FC = () => {
  // Array of image imported from directory
  const images = importAll(require.context('../images/home_page_gallery', false, /\.(png|jpe?g|svg)$/));

  return (
    <div>
      <main className="d-flex justify-content-center row mt-5">
        <div className="col-lg-8">
          <Carousel className="d-flex justify-content-center">
            {images.map((src, index) => (
            <CarouselItem key={index}>
              <Image src={src} alt={`Slide ${index}`} className="img-fluid"/>
            </CarouselItem>
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Home;
