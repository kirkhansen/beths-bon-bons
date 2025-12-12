"use client";

import React, { FormEvent, useState } from "react";
import { MAIL_CHIMP_URI } from "@/constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";

const Mailchimp: React.FC = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form
      action={MAIL_CHIMP_URI}
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      method="post"
    >
      <InputGroup className="mb-3">
        <Form.Group>
          <FloatingLabel label="Enter Email to Subscribe">
            <Form.Control
              required
              name="EMAIL"
              placeholder="email"
              type="email"
            />
          </FloatingLabel>
        </Form.Group>
        <Button variant="dark" type="submit">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Mailchimp;
