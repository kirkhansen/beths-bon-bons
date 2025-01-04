'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {defaultFormState, BaseFormState, CakeBallStyles, CakeFlavors, GOOGLE_FORM_URI} from '../../utils/api';
import { FloatingLabel } from 'react-bootstrap';

type Props = {};

const OrderPage: React.FC<Props> = () => {
  const [formState, setFormState] = useState<BaseFormState>(defaultFormState);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    setResponseMessage("Thanks for your order! Expect to hear from me in the next few days to confirm details!")
  };

  return (
    <div>
    {/* Thanks to CORS on google forms, I can't do this via react and fetch APIs. Boo. So, hidden iframe nonsense it is */}
    <iframe id="response-iframe" name="response-iframe" style={{display: 'none'}}></iframe>
    <Form onSubmit={handleSubmit} id="form" target="response-iframe" action={GOOGLE_FORM_URI} method="post">
        <Form.Group className="mb-3">
          <FloatingLabel label="Full Name">
            <Form.Control name="fullName" placeholder="John Doe" onChange={handleChange}/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Email Address">
            <Form.Control name="email" placeholder="Email" onChange={handleChange} type="email"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Date of Event">
            <Form.Control name="eventDate" placeholder="Date of Event" onChange={handleChange} type="date"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Date of Pickup">
            <Form.Control name="pickupDate" placeholder="Date of Pickup" onChange={handleChange} type="date"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="How did you hear about me?">
            <Form.Control name="referralSource" placeholder="Facebook" onChange={handleChange}/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Payment Preference">
            <Form.Select name="paymentMethod">
                <option value="venmo">Venmo</option>
                <option value="cash">Cash</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Event Type">
            <Form.Control name="eventType" placeholder="event type" onChange={handleChange}/>
            <Form.Text>e.g., birthday, baptism, anniversary</Form.Text>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
            <FloatingLabel label="Event Theme Details">
                <Form.Control name="eventThemeDetails" placeholder="details" onChange={handleChange}/>
                <Form.Text>Describe the decorations or theme you want. Please include as much detail as possible such as color, shape, characters, etc... If you have an invitation or decorations for your event, sending me a copy of those can help me match your event more closely!</Form.Text>
            </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Select your style">
            <Form.Select name="cakeBallStyle">
                <option>N/A</option>
                {Object.entries(CakeBallStyles).map(([key, value]) => (
                <option key={key} value={key}>
                    {value}
                </option>
                ))}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        {/* Build up inputs for each flavor we have */}
        {Object.entries(CakeFlavors).map(([key, value]) => (
            <Form.Group key={key + '-form-group'} className="mb-3">
                <FloatingLabel key={key + '-label'} label={'Dozens of ' + value}>
                    <Form.Control key={key} name={key} placeholder={key} onChange={handleChange} type="number"/>
                </FloatingLabel>
            </Form.Group>
        ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    {error && <Alert variant='danger'>{error}</Alert>}
    {responseMessage && !error && !loading && <Alert variant="success">{responseMessage}</Alert>}
    </div>
  );
}

export default OrderPage;
