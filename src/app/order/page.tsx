'use client'

import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

type Props = {};

type FormState = {
  name: string;
  email: string;
  orderDetails: string;
};

const OrderPage: React.FC<Props> = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    orderDetails: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission logic
    console.log('Form submitted:', formState);
  };

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="email" placeholder="Email" onChange={handleChange} type="email"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="eventDate" placeholder="Date of Event" onChange={handleChange} type="date"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control name="fullName" placeholder="Full Name" onChange={handleChange}/>
        </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default OrderPage;
