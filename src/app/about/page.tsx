import Image from "next/image";
import beth_collage from "../../images/beth_collage.jpg";

const Home: React.FC = () => {
  return (
    <div>
      <div className="d-flex align-items-center text-center row">
        <div className="col">
          <p>
            Beth&lsquo;s Bon Bons & Cake Pops, LLC is a home bakery located in
            Grimes, Iowa specializing in customized, themed cake pops that add
            extra fun to all kinds of celebrations!
          </p>
          <p>
            Birthdays, weddings, showers, and so much more can be elevated with
            these scrumptious treats! In addition to custom cake pops, I also
            create holiday offerings that are great additions to your
            gatherings.
          </p>
        </div>
        <div className="col-lg col-mx-auto">
          <Image src={beth_collage} alt="About me" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Home;
