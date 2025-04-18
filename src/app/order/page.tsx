"use client";

import React, { FormEvent, useState, useRef} from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import {
  addOns,
  email,
  defaultFormState,
  BaseFormState,
  CakeBallStyles,
  CakeFlavors,
  ORDER_FORM_URI,
  DanceRecitalBoxFlavors,
} from "../../constants";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";

const OrderPage: React.FC = () => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const [formState, setFormState] = useState<BaseFormState>(defaultFormState);
  const [validated, setValidated] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [referralSourceSelection, setReferralSourceSelection] =
    useState<string>("");
  const [referralSourceOtherValue, setReferralSourceOtherValue] =
    useState<string>("");
  const [loading, setLoading] = useState(false); 
  const [activeKey, setActiveKey] = useState<AccordionEventKey | null>(null); 
  const inputRefs = useRef<Record<string, React.RefObject<HTMLInputElement | null>>>({});
  const [boxCounts, setBoxCounts] = useState<{ [key: string]: number }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
      setBoxCounts((prev) => ({
        ...prev,
        [name]: parseInt(value || "0", 10),
      }));
  };

  const handleReferralSourceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setReferralSourceSelection(e.target.value);
    if (e.target.value !== "Other") {
      setReferralSourceOtherValue("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setErrorMessage("Please fill out all required fields correctly.");
      setValidated(true);
      setLoading(false);
      return;
    }

    const formData = new FormData(form);
    // Add custom fields not bound to the form controls
    if (referralSourceSelection === "Other") {
      formData.set("referralSource", referralSourceOtherValue);
    } else {
      formData.set("referralSource", referralSourceSelection);
    }

    try {
      const response = await fetch(ORDER_FORM_URI, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.result === "error") {
        throw new Error (`Error: ${data.msg}`)
      }

      setResponseMessage(
        `Thanks for your order! An email was sent to ${formState.email} with your responses. If you don't receive an email in the next few minutes, please reach out on Facebook or email.`
      );
      setErrorMessage("");
      setValidated(false);
      form.reset()
    } catch (error) {
      console.log(error instanceof Error ? error.message: "Unknown error");
      setErrorMessage(
        "Something went wrong while submitting your order. Please try again or contact us for assistance."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-6 mx-auto">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          id="form"
          method="post"
        >
          <Form.Group className="mb-3">
            <FloatingLabel label="Full Name">
              <Form.Control
                required
                name="fullName"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Email Address">
              <Form.Control
                required
                name="email"
                placeholder="Email"
                onChange={handleChange}
                type="email"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Date of Event">
              <Form.Control
                required
                name="eventDate"
                placeholder="Date of Event"
                onChange={handleChange}
                type="date"
                min={today}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Date of Pickup">
              <Form.Control
                required
                name="pickupDate"
                placeholder="Date of Pickup"
                onChange={handleChange}
                type="date"
                min={today}
              />
            </FloatingLabel>
            <Form.Text>
              Treats are good for 3-5 days at room temperature, and they are
              good up to two weeks in the refrigerator
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>How did you hear about me?</Form.Label>
            <Form.Check
              required
              type="radio"
              name="referralSource"
              label="Friend or Family"
              value="Friend or Family"
              onChange={handleReferralSourceChange}
              checked={referralSourceSelection === "Friend or Family"}
            ></Form.Check>
            <Form.Check
              required
              type="radio"
              name="referralSource"
              label="Facebook"
              value="Facebook"
              onChange={handleReferralSourceChange}
              checked={referralSourceSelection === "Facebook"}
            ></Form.Check>
            {/* Puts the Other option inline with the control input */}
            <div className="d-flex align-items-center mt-2">
              <Form.Check
                required
                type="radio"
                name="referralSource"
                label="Other:"
                value="Other"
                onChange={handleReferralSourceChange}
                checked={referralSourceSelection === "Other"}
              ></Form.Check>
              <Form.Control
                type="text"
                value={referralSourceOtherValue}
                name="referralSource"
                onChange={(e) => setReferralSourceOtherValue(e.target.value)}
                placeholder="Please specify"
                disabled={referralSourceSelection !== "Other"}
                hidden={referralSourceSelection !== "Other"}
                required={referralSourceSelection === "Other"}
                className="ms-4"
              ></Form.Control>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Payment Preference">
              <Form.Select name="paymentMethod">
                <option value="venmo">Venmo</option>
                <option value="cash">Cash</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Accordion flush activeKey={activeKey} onSelect={(eventKey) => setActiveKey(eventKey)} className="order-accordion">
            {/* Custom orders */}
            <Accordion.Item eventKey="0" className="custom-accordion-item">
              <Accordion.Header>Custom Order...</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Event Type">
                    <Form.Control
                      required={activeKey === "0"}
                      name="eventType"
                      placeholder="event type"
                      onChange={handleChange}
                    />
                    <Form.Text>e.g., birthday, baptism, anniversary</Form.Text>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Event Theme Details">
                    <Form.Control
                      required={activeKey === "0"}
                      name="eventThemeDetails"
                      placeholder="details"
                      onChange={handleChange}
                    />
                    <Form.Text>
                      Describe the decorations or theme you want. <strong>Please include
                      as much detail possible</strong>, e.g., color, shape, characters,
                      etc. You can send any inspirational photos to my{" "}
                      <a href={`mailto:${email}`}>email</a> to more closely
                      match your event!
                    </Form.Text>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Select your style">
                    <Form.Select
                      required={activeKey === "0"}
                      name="cakeBallStyle"
                    >
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
                  {Object.entries(CakeFlavors)
                    .map(([key, value]) => {
                      if (!inputRefs.current[key]) {
                        inputRefs.current[key] = React.createRef();
                      }
                      return (
                      <Form.Group key={key + "-form-group"} className="mb-3">
                        <InputGroup key={key + "-input-group"}>
                          <FloatingLabel key={key + "-label"} label={value}>
                            <Form.Control
                              key={key}
                              ref={inputRefs.current[key]}
                              name={key}
                              placeholder={key}
                              onChange={handleChange}
                              type="number"
                              min="0"
                              step="0.5"
                            />
                          </FloatingLabel>
                          <InputGroup.Text
                            key={key + "input-group-text"}
                            style={{ cursor: "pointer"}}
                            onClick={() => inputRefs.current[key]?.current?.focus()}
                          >
                            Dozen
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    )})}
                </fieldset>
              </Accordion.Body>
            </Accordion.Item>
            {/* End custom orders */}
            {/* Dance Recital Boxes */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>Dance Recital Boxes...</Accordion.Header>
              <Accordion.Body>
                    {Object.entries(DanceRecitalBoxFlavors)
                    .map(([key, value]) => {
                      if (!inputRefs.current[key]) {
                        inputRefs.current[key] = React.createRef();
                      }
                      return (
                      <Form.Group key={key + "-form-group"} className="mb-3">
                        <InputGroup key={key + "-input-group"}>
                          <FloatingLabel key={key + "-label"} label={value}>
                            <Form.Control
                              key={key}
                              ref={inputRefs.current[key]}
                              name={key}
                              placeholder={key}
                              onChange={handleChange}
                              type="number"
                              min="0"
                              step="1"
                            />
                          </FloatingLabel>
                          <InputGroup.Text
                            key={key + "input-group-text"}
                            style={{ cursor: "pointer", width:"70px", justifyContent: "center"}}
                            onClick={() => inputRefs.current[key]?.current?.focus()}
                          >
                            {(boxCounts[key] ?? 0) === 1 ? "Box" : "Boxes"}
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    )})}
              </Accordion.Body>
            </Accordion.Item>
            {/* End Dance Recital Boxes*/}
          </Accordion>
          <h3 className="text-center mt-3">Add-Ons</h3>
          {addOns.map((item) => {
            if (!inputRefs.current[item.name]) {
              inputRefs.current[item.name] = React.createRef();
            }
            return (
            <Form.Group key={item["name"]} className="mb-2">
              <InputGroup key={item + "-optional-input-group"}>
                <FloatingLabel key={item + "-label"} label={item["name"]}>
                <Form.Control
                  key={item + "-add-ons"}
                  ref={inputRefs.current[item.name]}
                  name={item["name"]}
                  placeholder={item["name"]}
                  onChange={handleChange}
                  type="number"
                  min="0"
                />
                </FloatingLabel>
                <InputGroup.Text
                  key={item + "input-group-text"}
                  style={{width: "100px"}}
                  className="text-center"
                  onClick={() => inputRefs.current[item.name]?.current?.focus()}
                >
                   {item["unit"]}
                 </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          )})}
          <div className="d-grid gap-2 mt-4">
            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? (
                <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                  />
                  Submitting...
                  </>
              ) : ("Submit"
              )}
            </Button>
          </div>
        </Form>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
      </div>
    </div>
  );
};

export default OrderPage;
