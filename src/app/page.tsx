import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";

type Props = {};
const importAll = (r: __WebpackModuleApi.RequireContext): string[] => {
  return r.keys().map((key) => r(key).default);
};

const Home: React.FC<Props> = () => {
  // Array of image imported from directory
  const images = importAll(require.context('../images/home_page_gallery', false, /\.(png|jpe?g|svg)$/));

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Carousel>
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
