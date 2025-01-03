import React from 'react';

const OrderPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const googleFormUrl = "https://docs.google.com/forms/d/e/your-google-form-id/formResponse";
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      params.append(key, value);
    });

    fetch(`${googleFormUrl}?${params.toString()}`, {
      method: 'POST',
      mode: 'no-cors',
    }).then(() => {
      alert('Form submitted successfully!');
      e.target.reset();
    });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center">Order Your Cake Pops</h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name="entry.123456789" id="name" className="form-control" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="entry.987654321" id="email" className="form-control" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" name="entry.456789123" id="quantity" className="form-control" required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success btn-lg w-100">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
