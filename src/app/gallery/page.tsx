import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";

const importAll = (r: __WebpackModuleApi.RequireContext): string[] => {
  return r.keys().map((key) => r(key).default);
};

const LinkableHeader = ({id, children}) => (
  <h1 id={id} className="text-center">
    <a href={`#${id}`} className="text-decoration-none" style={{ color: "inherit"}}>{children}</a>
  </h1>
);

const GalleryItem = ({ title, id, images }) => (
  <div className="d-flex row mt-3 justify-content-center align-items-center">
    <LinkableHeader id={id}>{title}</LinkableHeader>
    <div className="carousel-container">
      <Carousel className="rounded-3">
        {images.map((src, index) => (
          <CarouselItem key={index} className="rounded-3">
            <Image src={src} alt={`Slide ${index}`} className="img-fluid rounded-3" />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  </div>
);

const Gallery: React.FC = () => {
  // Array of image imported from directory
  const images = importAll(
    require.context("../../images/home_page_gallery", false, /\.(png|jpe?g|svg)$/),
  );

  return (
    <div>
      <GalleryItem title="Birthday" id="birthday" images={images}/>
      <GalleryItem title="Baby Shower" id="baby-shower" images={images}/>
      <GalleryItem title="Gender Reveal" id="gender-reveal" images={images}/>
      <GalleryItem title="Wedding" id="wedding" images={images}/>
      <GalleryItem title="Holiday" id="holiday" images={images}/>
      <GalleryItem title="Dancer" id="dancer" images={images}/>
      <GalleryItem title="Graduation" id="graduation" images={images}/>
    </div>
  );
};

export default Gallery;
