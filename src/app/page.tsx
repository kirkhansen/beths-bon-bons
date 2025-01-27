import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";

const importAll = (r: __WebpackModuleApi.RequireContext): string[] => {
  return r.keys().map((key) => r(key).default);
};

const Home: React.FC = () => {
  // Array of image imported from directory
  const images = importAll(
    require.context("../images/home_page_gallery", false, /\.(png|jpe?g|svg)$/),
  );

  return (
    <div>
      <main className="d-flex row mt-3 justify-content-center align-items-center">
        <div className="carousel-container">
          <Carousel className="rounded-3">
            {images.map((src, index) => (
              <CarouselItem key={index} className="rounded-3">
                <Image src={src} alt={`Slide ${index}`} className="img-fluid rounded-3" />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Home;
