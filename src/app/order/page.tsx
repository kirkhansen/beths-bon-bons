'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {defaultFormState, BaseFormState, CakeBallStyles, CakeFlavors, GOOGLE_FORM_URI, googleFormEntryIdMap, GoogleFormEntryIdMap} from '../../constants';
import { FloatingLabel } from 'react-bootstrap';

const OrderPage: React.FC = () => {
  const [formState, setFormState] = useState<BaseFormState>(defaultFormState);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = () => {
    setResponseMessage("Thanks for your order! Expect to hear from me in the next few days to confirm details!")
  };

  return (
    <div className="row">
    <div className="col-8 mx-auto">
    {/* Thanks to CORS on google forms, I can't do this via react and fetch APIs. Boo. So, hidden iframe nonsense it is */}
    <iframe id="response-iframe" name="response-iframe" style={{display: 'none'}}></iframe>
    <Form onSubmit={handleSubmit} id="form" target="response-iframe" action={GOOGLE_FORM_URI} method="post">
        <Form.Group className="mb-3">
          <FloatingLabel label="Full Name">
            <Form.Control name={googleFormEntryIdMap["fullName"]} placeholder="John Doe" onChange={handleChange}/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Email Address">
            <Form.Control name={googleFormEntryIdMap["email"]} placeholder="Email" onChange={handleChange} type="email"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Date of Event">
            <Form.Control name={googleFormEntryIdMap["eventDate"]} placeholder="Date of Event" onChange={handleChange} type="date"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Date and Time of Pickup">
            <Form.Control name={googleFormEntryIdMap["pickupDatetime"]} placeholder="Date of Pickup" onChange={handleChange} type="datetime-local"/>
          </FloatingLabel>
            <Form.Text>Treats are good for 3-5 days on the counter/room temp, and they are good up to two weeks in the fridge</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="How did you hear about me?">
            <Form.Control name={googleFormEntryIdMap["referralSource"]} placeholder="Facebook" onChange={handleChange}/>
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
        <Form.Group className="mb-3">
          <FloatingLabel label="Event Type">
            <Form.Control name={googleFormEntryIdMap["eventType"]} placeholder="event type" onChange={handleChange}/>
            <Form.Text>e.g., birthday, baptism, anniversary</Form.Text>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
            <FloatingLabel label="Event Theme Details">
                <Form.Control name={googleFormEntryIdMap["eventThemeDetails"]} placeholder="details" onChange={handleChange}/>
                <Form.Text>Describe the decorations or theme you want. Please include as much detail as possible such as color, shape, characters, etc... If you have an invitation or decorations for your event, sending me a copy of those can help me match your event more closely!</Form.Text>
            </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Select your style">
            <Form.Select name={googleFormEntryIdMap["cakeBallStyle"]}>
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
                    <Form.Control key={key} name={googleFormEntryIdMap[key as keyof GoogleFormEntryIdMap]} placeholder={key} onChange={handleChange} type="number"/>
                </FloatingLabel>
            </Form.Group>
        ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
    </div>
    </div>
  );
}

export default OrderPage;
