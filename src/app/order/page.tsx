'use client'

import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import {email, defaultFormState, BaseFormState, CakeBallStyles, CakeFlavors, GOOGLE_FORM_URI, googleFormEntryIdMap, GoogleFormEntryIdMap} from '../../constants';
import { FloatingLabel } from 'react-bootstrap';

const OrderPage: React.FC = () => {
  const [formState, setFormState] = useState<BaseFormState>(defaultFormState);
  const [validated, setValidated] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      setResponseMessage("Thanks for your order! An email was sent to {formState['email']} with your responses. If you don't recieve an email, please reach out on facebook or email.");
    }
    setValidated(true);
  };

  return (
    <div className="row">
    <div className="col-lg-6 mx-auto">
    {/* Thanks to CORS on google forms, I can't do this via react and fetch APIs. Boo. So, hidden iframe nonsense it is */}
    <iframe id="response-iframe" name="response-iframe" style={{display: 'none'}}></iframe>
    <Form noValidate validated={validated} onSubmit={handleSubmit} id="form" target="response-iframe" action={GOOGLE_FORM_URI} method="post">
        <Form.Group className="mb-3">
          <FloatingLabel label="Full Name">
            <Form.Control required name={googleFormEntryIdMap["fullName"]} placeholder="John Doe" onChange={handleChange}/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Email Address">
            <Form.Control required name={googleFormEntryIdMap["email"]} placeholder="Email" onChange={handleChange} type="email"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Date of Event">
            <Form.Control required name={googleFormEntryIdMap["eventDate"]} placeholder="Date of Event" onChange={handleChange} type="date"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Date and Time of Pickup">
            <Form.Control required name={googleFormEntryIdMap["pickupDatetime"]} placeholder="Date of Pickup" onChange={handleChange} type="datetime-local"/>
          </FloatingLabel>
            <Form.Text>Treats are good for 3-5 days at room temperature, and they are good up to two weeks in the refrigerator</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="How did you hear about me?">
            <Form.Control required name={googleFormEntryIdMap["referralSource"]} placeholder="Facebook" onChange={handleChange}/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Payment Preference">
            <Form.Select name={googleFormEntryIdMap["paymentMethod"]}>
                <option value="venmo">Venmo</option>
                <option value="cash">Cash</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Accordion flush>
          {/* Custom orders */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Custom Order...</Accordion.Header>
            <Accordion.Body>
        <Form.Group className="mb-3">
          <FloatingLabel label="Event Type">
            <Form.Control required name={googleFormEntryIdMap["eventType"]} placeholder="event type" onChange={handleChange}/>
            <Form.Text>e.g., birthday, baptism, anniversary</Form.Text>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
            <FloatingLabel label="Event Theme Details">
                <Form.Control required name={googleFormEntryIdMap["eventThemeDetails"]} placeholder="details" onChange={handleChange}/>
                <Form.Text>Describe the decorations or theme you want. Please include as much detail possible, e.g., color, shape, characters, etc. You can send any inspirational photos to my <a href={`mailto:${email}`}>email</a> to more closely match your event!</Form.Text>
            </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Select your style">
            <Form.Select required name={googleFormEntryIdMap["cakeBallStyle"]}>
                {Object.entries(CakeBallStyles).map(([key, value]) => (
                <option key={key} value={key}>
                    {value}
                </option>
                ))}
                <option>N/A</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <fieldset className="border p-3 rounded">
            <legend className="text-center">Flavors by the dozen</legend>
            {/* Build up inputs for each flavor we have */}
            {Object.entries(CakeFlavors).map(([key, value]) => (
                <Form.Group key={key + '-form-group'} className="mb-3">
                    <InputGroup key={key + '-input-group'}>
                        <FloatingLabel key={key + '-label'} label={value}>
                            <Form.Control key={key} name={googleFormEntryIdMap[key as keyof GoogleFormEntryIdMap]} placeholder={key} onChange={handleChange} type="number" min="0"/>
                        </FloatingLabel>
                        <InputGroup.Text key={key + 'input-group-text'}>Dozen</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            ))}
        </fieldset>
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        <div className="d-grid gap-2 mt-4">
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </div>
    </Form>
    {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
    </div>
    </div>
  );
}

export default OrderPage;
