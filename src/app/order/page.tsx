'use client'

import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

type Props = {};
type PaymentMethod = 'venmo' | 'cash' | null;
type CakeBallStyle = 'cakeBallTruffle' | 'cakePop' | 'upsideDownCakePop' | null;

// Use the google form field entry id for the value here
// and add a `dozensOf<NewFlavor>: 0,` in the `defaultFormState` object below
enum CakeFlavors {
    "deathByChocolate" = "entry.572468806",
    // "veryVanilla": "",
    // "birthdayCakeBatter": "",
    // "redVelvet": "",
}; 

// Generate the dozen fields for each flavor in CakeBallFlavor
type CakeBallFlavorDozens = {
  [key in keyof typeof CakeFlavors as `dozensOf${Capitalize<key>}`]: number;
};


type FormState = {
  fullName: string;
  email: string;
  eventDate: string;
  pickupDate: string;  // Treats are good for 3-5 days on the counter/room temp, and they are good up to two weeks in the fridge
  referralSource: string,
  paymentMethod: PaymentMethod,
  eventType: string,
  eventThemeDetails: string,
  cakeBallStyle: CakeBallStyle;
// TODO: this is likely not the way to do this, BUT...
// Auto extend the state types using the dynamic CakeBallFlavorDozens. Hopefully will make swapping flavors less work when new forms get created using these elements
// for holidays and such...
} & CakeBallFlavorDozens;

const defaultFormState:  { [K in keyof FormState]: FormState[K] } = {
  fullName: '',
  email: '',
  eventDate: '',
  pickupDate: '',
  referralSource: '',
  paymentMethod: null,
  eventType: '',
  eventThemeDetails: '',
  cakeBallStyle: null,
  dozensOfDeathByChocolate: 0,
//   dozensOfVeryVanilla: 0,
//   dozensOfRedVelvet: 0,
//   dozensOfBirthdayCakeBatter: 0,
};

const OrderPage: React.FC<Props> = () => {
  const [formState, setFormState] = useState<FormState>(defaultFormState);

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
