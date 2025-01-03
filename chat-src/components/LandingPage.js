import React from 'react';

const LandingPage = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4">Delicious Cake Pops</h1>
      <p className="lead">Handcrafted with love for every occasion.</p>
      <div className="row justify-content-center my-4">
        <div className="col-6 col-md-4">
          <img src="cakepop1.jpg" alt="Cake Pop 1" className="img-fluid rounded" />
        </div>
        <div className="col-6 col-md-4">
          <img src="cakepop2.jpg" alt="Cake Pop 2" className="img-fluid rounded" />
        </div>
        <div className="col-6 col-md-4">
          <img src="cakepop3.jpg" alt="Cake Pop 3" className="img-fluid rounded" />
        </div>
      </div>
      <a href="/order" className="btn btn-primary btn-lg">Order Now</a>
    </div>
  );
};

export default LandingPage;
