"use client";

import React, { FormEvent, useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import PhoneInput from "react-phone-number-input/input";
import {
  addOns,
  email,
  defaultFormState,
  BaseFormState,
  CakeBallStyles,
  CakeFlavors,
  ORDER_FORM_URI,
  DanceRecitalBoxFlavors,
  SEASON_RANGES,
} from "../../constants";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { OrderSummary, SeasonalChristmas } from "./order_types";

const OrderPage: React.FC = () => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  // Current date/time values for seasonal controls
  const now = new Date();
  const currentMonth = now.getMonth(); // 0 = January
  const currentDate = now.getDate(); // 1-31

  // Helper: determine if a season is active given start and end in month/day form
  // start and end are objects like { month: 0, day: 1 } (Jan 1)
  const isSeasonActive = (
    start: { month: number; day: number },
    end: { month: number; day: number },
  ) => {
    const startValue = start.month * 100 + start.day; // e.g., Jan 15 => 0*100+15 = 15
    const endValue = end.month * 100 + end.day;
    const todayValue = currentMonth * 100 + currentDate;

    if (startValue <= endValue) {
      return todayValue >= startValue && todayValue <= endValue;
    }
    // season wraps year boundary (e.g., Nov -> Feb)
    return todayValue >= startValue || todayValue <= endValue;
  };

  // Define seasonal ranges (pulled from constants for central configuration)
  const showDanceRecital = isSeasonActive(
    SEASON_RANGES.danceRecital.start,
    SEASON_RANGES.danceRecital.end,
  );
  const showHalloween = isSeasonActive(
    SEASON_RANGES.halloween.start,
    SEASON_RANGES.halloween.end,
  );
  const showThanksgiving = isSeasonActive(
    SEASON_RANGES.thanksgiving.start,
    SEASON_RANGES.thanksgiving.end,
  );
  const showChristmas = isSeasonActive(
    SEASON_RANGES.christmas.start,
    SEASON_RANGES.christmas.end,
  );
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
  const inputRefs = useRef<
    Record<string, React.RefObject<HTMLInputElement | null>>
  >({});
  const [boxCounts, setBoxCounts] = useState<{ [key: string]: number }>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const phoneInputRef = useRef<HTMLDivElement | null>(null);

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

  // This is dumb, but the react-phone-number-input/input component expects a value to get sent to onChange, not the full form data event, so here we are.
  const handlePhoneChange = (value: string | undefined) => {
    const isValid = value ? isPossiblePhoneNumber(value, "US") : true;

    // Set custom validity on the actual input element
    if (phoneInputRef.current) {
      const inputElement = phoneInputRef.current.querySelector("input");
      if (inputElement) {
        inputElement.setCustomValidity(
          isValid ? "" : "Please enter a valid phone number",
        );
      }
    }
    setFormState({ ...formState, ["phone"]: value || "" });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState({ ...formState, [name]: checked });
  };

  const generateOrderSummary = (formData: FormData) => {
    const summary: OrderSummary = {
      customerInfo: {
        fullName: formData.get("fullName") as string | null,
        email: formData.get("email") as string | null,
        phone: formData.get("phone") as string | null,
        eventDate: formData.get("eventDate") as string | null,
        pickupDate: formData.get("pickupDate") as string | null,
        paymentMethod: formData.get("paymentMethod") as string | null,
      },
      customOrder: {
        eventType: null,
        eventThemeDetails: null,
        cakeBallStyle: null,
        flavors: {},
      },
      danceRecital: {
        danceStudio: formData.get("danceStudio") as string | null,
        boxes: {},
      },
      addOns: {},
      totals: {
        totalCakePops: 0,
        totalBoxes: 0,
        totalAddOnPieces: 0,
        totalHalloweenPieces: 0,
        totalChristmasPieces: 0,
        totalThanksgivingPieces: 0,
        grandTotalPieces: 0,
      },
    };

    // Custom order details
    if (activeKey === "0") {
      summary.customOrder = {
        eventType: formData.get("eventType") as string | null,
        eventThemeDetails: formData.get("eventThemeDetails") as string | null,
        cakeBallStyle: formData.get("cakeBallStyle") as string | null,
        flavors: {},
      };

      // Process cake flavors
      Object.entries(CakeFlavors).forEach(([key, value]) => {
        const dozens = parseFloat((formData.get(key) as string) || "0");
        if (dozens > 0) {
          const cakePops = dozens * 12;
          summary.customOrder.flavors[key] = {
            name: value,
            dozens: dozens,
            cakePops: cakePops,
          };
          summary.totals.totalCakePops += cakePops;
        }
      });
    }

    // Dance recital boxes
    Object.entries(DanceRecitalBoxFlavors).forEach(([key, value]) => {
      const boxes = parseInt((formData.get(key) as string) || "0");
      if (boxes > 0) {
        summary.danceRecital.boxes[key] = {
          name: value,
          boxes: boxes,
        };
        summary.totals.totalBoxes += boxes;
      }
    });

    // Halloween sets (8 piece sets)
    const sets = parseInt((formData.get("halloweenSets") as string) || "0");
    if (sets > 0) {
      const pieces = sets * 8; // each Halloween set => 8 pieces
      summary.halloween = {
        sets: sets,
        pieces: pieces,
      };
      summary.totals.totalHalloweenPieces =
        (summary.totals.totalHalloweenPieces || 0) + pieces;
    }

    // Thanksgiving sampler dozens
    const dozens = parseInt(
      (formData.get("thanksgivingSamplers") as string) || "0",
    );
    if (dozens > 0) {
      const pieces = dozens * 12;
      summary.thanksgiving = {
        dozens: dozens,
        pieces: pieces,
      };
      summary.totals.totalThanksgivingPieces =
        (summary.totals.totalThanksgivingPieces || 0) + pieces;
    }

    // Christmas items
    const partyBoxes = parseInt(
      (formData.get("christmasPartyBox") as string) || "0",
    );
    const cakeSets = parseInt(
      (formData.get("christmasCakePopsSet") as string) || "0",
    );
    const nutBoxes = parseInt((formData.get("nutcrackerBox") as string) || "0");

    // Only create christmas object if at least one item is selected
    if (partyBoxes > 0 || cakeSets > 0 || nutBoxes > 0) {
      summary.christmas = {
        partyBoxes: partyBoxes,
        cakePopsSets: cakeSets,
        nutcrackerBoxes: nutBoxes,
        pieces: 0,
      } as SeasonalChristmas;

      const partyBoxesPieces = partyBoxes * 24;
      const cakeSetsPieces = cakeSets * 12;
      const nutBoxesPieces = nutBoxes * 3;

      summary.christmas.pieces =
        partyBoxesPieces + cakeSetsPieces + nutBoxesPieces;
      summary.totals.totalChristmasPieces = summary.christmas.pieces;
    }

    // Add-ons (including Christmas section duplicates)
    const christmasFieldMapping: Record<string, string> = {
      christmasBonBons: "Bon Bons",
      christmasCoffeeFlight: "Coffee Flight",
      christmasCustomChocolateBars: "Custom Chocolate Bars",
      christmasSmoresBars: "S'mores Bars",
    };

    addOns.forEach((item) => {
      let quantity = parseInt((formData.get(item.name) as string) || "0");

      // Also check the Christmas-specific field name if it exists
      const christmasFieldName = Object.keys(christmasFieldMapping).find(
        (key) => christmasFieldMapping[key] === item.name,
      );
      if (christmasFieldName) {
        const christmasQuantity = parseInt(
          (formData.get(christmasFieldName) as string) || "0",
        );
        quantity += christmasQuantity;
      }

      if (quantity > 0) {
        let pieces = quantity;
        // Calculate pieces based on unit type
        const unitLower = item.unit.toLowerCase();
        if (unitLower.includes("dozen")) {
          pieces = quantity * 12;
        } else if (unitLower.includes("3 bar")) {
          // '3 Bars' means each quantity represents 3 pieces
          pieces = quantity * 3;
        }

        summary.addOns[item.name] = {
          name: item.name,
          quantity: quantity,
          unit: item.unit,
          pieces: pieces,
        };
        summary.totals.totalAddOnPieces += pieces;
      }
    });

    // Calculate grand total pieces
    const addOnPieces = summary.totals.totalAddOnPieces || 0;
    const halloweenPieces = summary.totals.totalHalloweenPieces || 0;
    const thanksgivingPieces = summary.totals.totalThanksgivingPieces || 0;
    const christmasPieces = summary.totals.totalChristmasPieces || 0;
    summary.totals.grandTotalPieces =
      summary.totals.totalCakePops +
      addOnPieces +
      halloweenPieces +
      thanksgivingPieces +
      christmasPieces;

    return summary;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setErrorMessage("Please fill out all required fields correctly.");
      setValidated(true);
      return;
    }

    // Add custom fields not bound to the form controls
    if (referralSourceSelection === "Other") {
      formData.set("referralSource", referralSourceOtherValue);
    } else {
      formData.set("referralSource", referralSourceSelection);
    }

    //set errors to none again, if we made it this far
    setErrorMessage("");
    // Generate order summary and show confirmation modal
    const summary = generateOrderSummary(formData);

    // Validate that at least one item was ordered
    if (summary.totals.grandTotalPieces <= 0) {
      setErrorMessage("Please order at least one item before submitting.");
      setValidated(true);
      return;
    }

    setOrderSummary(summary);
    setShowConfirmModal(true);
  };

  const confirmOrder = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    const form = document.getElementById("form") as HTMLFormElement;
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
        throw new Error(`Error: ${data.msg}`);
      }

      setResponseMessage(
        `Thanks for your order! An email was sent to ${formState.email} with your responses. If you don't receive an email in the next few minutes, please reach out on Facebook or email.`,
      );
      setErrorMessage("");
      setValidated(false);
      form.reset();
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unknown error");
      setErrorMessage(
        "Something went wrong while submitting your order. Please try again or contact us for assistance.",
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = () => {
    setShowConfirmModal(false);
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
            <Form.Check
              type="checkbox"
              name="doNotMailingList"
              id="doNotMailingList"
              label={
                "Please DO NOT include me in mailing list to learn about deals and upcoming offerings"
              }
              onChange={handleCheckboxChange}
              checked={formState.doNotMailingList ?? false}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <div ref={phoneInputRef}>
              <FloatingLabel label="Cell Phone">
                <PhoneInput
                  required
                  country="US"
                  international={false}
                  onChange={handlePhoneChange}
                  className="form-control"
                  name="phone"
                  placeholder="15555555555"
                />
              </FloatingLabel>
            </div>
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
          <Accordion
            flush
            activeKey={activeKey}
            onSelect={(eventKey) => setActiveKey(eventKey)}
            className="order-accordion"
          >
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
                      Describe the decorations or theme you want.{" "}
                      <strong>Please include as much detail possible</strong>,
                      e.g., color, shape, characters, etc. You can send any
                      inspirational photos to my{" "}
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
                  <legend className="text-center">Flavors</legend>
                  {/* Build up inputs for each flavor we have */}
                  {Object.entries(CakeFlavors).map(([key, value]) => {
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
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              inputRefs.current[key]?.current?.focus()
                            }
                          >
                            Dozen
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    );
                  })}
                </fieldset>
              </Accordion.Body>
            </Accordion.Item>
            {/* End custom orders */}
            {/* Dance Recital Boxes */}
            {showDanceRecital && (
              <Accordion.Item eventKey="1">
                <Accordion.Header>Dance Recital Boxes...</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Dance Studio">
                      <Form.Control
                        required={activeKey === "1"}
                        name="danceStudio"
                        placeholder="My cool dance studio"
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>

                  {Object.entries(DanceRecitalBoxFlavors).map(
                    ([key, value]) => {
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
                              style={{
                                cursor: "pointer",
                                width: "70px",
                                justifyContent: "center",
                              }}
                              onClick={() =>
                                inputRefs.current[key]?.current?.focus()
                              }
                            >
                              {(boxCounts[key] ?? 0) === 1 ? "Box" : "Boxes"}
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                      );
                    },
                  )}
                </Accordion.Body>
              </Accordion.Item>
            )}
            {/* End Dance Recital Boxes*/}
            {/* Halloween Sets */}
            {showHalloween && (
              <Accordion.Item eventKey="2">
                <Accordion.Header>🦇 Halloween Sets...</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Halloween Sets (8 pieces per set)">
                        <Form.Control
                          name="halloweenSets"
                          placeholder="Number of sets"
                          onChange={handleChange}
                          type="number"
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        style={{ width: "70px", justifyContent: "center" }}
                      >
                        Sets
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            )}
            {/* Thanksgiving Sampler */}
            {showThanksgiving && (
              <Accordion.Item eventKey="3">
                <Accordion.Header>🦃 Thanksgiving Sampler...</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Enter the number of dozens">
                        <Form.Control
                          name="thanksgivingSamplers"
                          placeholder="Dozens"
                          onChange={handleChange}
                          type="number"
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        style={{ width: "70px", justifyContent: "center" }}
                      >
                        Dozen
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            )}
            {/* Christmas Offerings */}
            {showChristmas && (
              <Accordion.Item eventKey="4">
                <Accordion.Header>🎄 Christmas Offerings...</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Christmas Party Box (~24 treats)">
                        <Form.Control
                          name="christmasPartyBox"
                          placeholder="Boxes"
                          onChange={handleChange}
                          type="number"
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        style={{ width: "70px", justifyContent: "center" }}
                      >
                        $50
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Christmas Cake Pops Set (12 treats)">
                        <Form.Control
                          name="christmasCakePopsSet"
                          placeholder="Sets"
                          onChange={handleChange}
                          type="number"
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        style={{ width: "70px", justifyContent: "center" }}
                      >
                        $36
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Nutcracker Box (3 pops plus peppermint)">
                        <Form.Control
                          name="nutcrackerBox"
                          placeholder="Boxes"
                          onChange={handleChange}
                          type="number"
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        style={{ width: "70px", justifyContent: "center" }}
                      >
                        $16
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Peanut Butter Bon Bons (12 treats)">
                        <Form.Control
                          type="number"
                          placeholder="Dozens"
                          onChange={handleChange}
                          name={`christmasBonBons`}
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text>$15</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Coffee Flight (3 treats)">
                        <Form.Control
                          name={`christmasCoffeeFlight`}
                          placeholder="Quantity"
                          onChange={handleChange}
                          type="number"
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        style={{ width: "70px", justifyContent: "center" }}
                      >
                        $8
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Custom Chocolate Bar">
                        <Form.Control
                          name={`christmasCustomChocolateBars`}
                          placeholder="Quantity"
                          onChange={handleChange}
                          type="number"
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        style={{ width: "70px", justifyContent: "center" }}
                      >
                        $5
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FloatingLabel label={`S'mores Bar Stocking Stuffer`}>
                        <Form.Control
                          name={`christmasSmoresBars`}
                          placeholder="Quantity"
                          onChange={handleChange}
                          type="number"
                          min="0"
                          step="1"
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        style={{ width: "70px", justifyContent: "center" }}
                      >
                        $4
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            )}
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
                    style={{ width: "100px" }}
                    className="text-center"
                    onClick={() =>
                      inputRefs.current[item.name]?.current?.focus()
                    }
                  >
                    {item["unit"]}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            );
          })}
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
              ) : (
                "Review Order"
              )}
            </Button>
          </div>
        </Form>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {responseMessage && <Alert variant="success">{responseMessage}</Alert>}

        {/* Order Confirmation Modal */}
        {orderSummary && (
          <Modal show={showConfirmModal} onHide={cancelOrder} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Order Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Customer Information</h5>
              <ListGroup className="mb-3">
                <ListGroup.Item>
                  <strong>Name:</strong> {orderSummary.customerInfo?.fullName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {orderSummary.customerInfo?.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Cell Phone:</strong>{" "}
                  {orderSummary.customerInfo?.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Event Date:</strong>{" "}
                  {orderSummary.customerInfo?.eventDate}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Pickup Date:</strong>{" "}
                  {orderSummary.customerInfo?.pickupDate}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Payment Method:</strong>{" "}
                  {orderSummary.customerInfo?.paymentMethod}
                </ListGroup.Item>
              </ListGroup>

              {/* Custom Order Details */}
              {Object.keys(orderSummary.customOrder?.flavors || {}).length >
                0 && (
                <>
                  <h5>Custom Order Details</h5>
                  <ListGroup className="mb-3">
                    <ListGroup.Item>
                      <strong>Event Type:</strong>{" "}
                      {orderSummary.customOrder?.eventType}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Theme Details:</strong>{" "}
                      {orderSummary.customOrder?.eventThemeDetails}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Style:</strong>{" "}
                      {orderSummary.customOrder?.cakeBallStyle}
                    </ListGroup.Item>
                  </ListGroup>

                  <h5>Cake Pops</h5>
                  <ListGroup className="mb-3">
                    {Object.entries(
                      orderSummary.customOrder?.flavors || {},
                    ).map(([key, flavor]) => (
                      <ListGroup.Item
                        key={key}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          <strong>{flavor.name}:</strong> {flavor.dozens} dozen
                        </span>
                        <span className="badge bg-primary rounded-pill">
                          = {flavor.cakePops} cake pops
                        </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}

              {/* Dance Recital Boxes */}
              {Object.keys(orderSummary.danceRecital?.boxes || {}).length >
                0 && (
                <>
                  <h5>Dance Recital Boxes</h5>
                  <ListGroup className="mb-3">
                    <ListGroup.Item>
                      <strong>Dance Studio:</strong>{" "}
                      {orderSummary.danceRecital.danceStudio}
                    </ListGroup.Item>
                    {Object.entries(orderSummary.danceRecital.boxes || {}).map(
                      ([key, box]) => (
                        <ListGroup.Item key={key}>
                          <strong>{box.name}:</strong> {box.boxes}{" "}
                          {box.boxes === 1 ? "box" : "boxes"}
                        </ListGroup.Item>
                      ),
                    )}
                  </ListGroup>
                </>
              )}

              {/* Halloween Sets (separate) */}
              {orderSummary.halloween && orderSummary.halloween.sets > 0 && (
                <>
                  <h5>Halloween Sets</h5>
                  <ListGroup className="mb-3">
                    <ListGroup.Item>
                      <strong>Halloween Sets (8 pcs each):</strong>{" "}
                      {orderSummary.halloween.sets}{" "}
                      {orderSummary.halloween.sets === 1 ? "set" : "sets"}
                      <span className="badge bg-primary rounded-pill ms-2">
                        = {orderSummary.halloween.pieces} pieces
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </>
              )}

              {/* Thanksgiving Sampler (separate) */}
              {orderSummary.thanksgiving &&
                orderSummary.thanksgiving.dozens > 0 && (
                  <>
                    <h5>Thanksgiving Sampler</h5>
                    <ListGroup className="mb-3">
                      <ListGroup.Item>
                        <strong>Dozens:</strong>{" "}
                        {orderSummary.thanksgiving.dozens}
                        <span className="badge bg-primary rounded-pill ms-2">
                          = {orderSummary.thanksgiving.pieces} pieces
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                )}

              {/* Christmas Offerings (separate) */}
              {orderSummary.christmas && (
                <>
                  <h5>Christmas Offerings</h5>
                  <ListGroup className="mb-3">
                    {(orderSummary.christmas.partyBoxes ?? 0) > 0 && (
                      <ListGroup.Item>
                        <strong>Party Boxes:</strong>{" "}
                        {orderSummary.christmas.partyBoxes}
                        <span className="badge bg-primary rounded-pill ms-2">
                          = {(orderSummary.christmas.partyBoxes ?? 0) * 24}{" "}
                          pieces
                        </span>
                      </ListGroup.Item>
                    )}
                    {(orderSummary.christmas.cakePopsSets ?? 0) > 0 && (
                      <ListGroup.Item>
                        <strong>Cake Pops Sets (12 pcs each):</strong>{" "}
                        {orderSummary.christmas.cakePopsSets}
                        <span className="badge bg-primary rounded-pill ms-2">
                          = {(orderSummary.christmas.cakePopsSets ?? 0) * 12}{" "}
                          pieces
                        </span>
                      </ListGroup.Item>
                    )}
                    {(orderSummary.christmas.nutcrackerBoxes ?? 0) > 0 && (
                      <ListGroup.Item>
                        <strong>
                          Nutcracker Boxes (3 pops plus peppermint):
                        </strong>{" "}
                        {orderSummary.christmas.nutcrackerBoxes}
                        <span className="badge bg-primary rounded-pill ms-2">
                          = {(orderSummary.christmas.nutcrackerBoxes ?? 0) * 3}{" "}
                          pieces
                        </span>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </>
              )}

              {/* Add-ons */}
              {Object.keys(orderSummary.addOns || {}).length > 0 && (
                <>
                  <h5>Add-Ons</h5>
                  <ListGroup className="mb-3">
                    {Object.entries(orderSummary.addOns || {}).map(
                      ([key, addon]) => {
                        let displayText = `${addon.quantity} ${addon.unit.toLowerCase()}`;

                        if (addon.unit.toLowerCase() === "single") {
                          displayText = `${addon.quantity} ${addon.quantity === 1 ? "piece" : "pieces"}`;
                        } else if (addon.unit.toLowerCase().includes("ounce")) {
                          if (addon.quantity === 1) {
                            displayText = `1 ${addon.name.toLowerCase().includes("bar") ? "bar" : "piece"} @ ${addon.unit}`;
                          } else {
                            displayText = `${addon.quantity} ${addon.name.toLowerCase().includes("bar") ? "bars" : "items"} @ ${addon.unit} each`;
                          }
                        }

                        return (
                          <ListGroup.Item
                            key={key}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <span>
                              <strong>{addon.name}:</strong> {displayText}
                            </span>
                            <span className="badge bg-primary rounded-pill">
                              = {addon.pieces}{" "}
                              {addon.pieces === 1 ? "piece" : "pieces"}
                            </span>
                          </ListGroup.Item>
                        );
                      },
                    )}
                  </ListGroup>
                </>
              )}

              {/* Order Totals */}
              <div className="alert alert-warning">
                <h5 className="mb-2">Order Summary</h5>
                {orderSummary.totals?.totalCakePops > 0 && (
                  <p className="mb-1">
                    <strong>
                      Custom Cake Pops: {orderSummary.totals.totalCakePops}{" "}
                      pieces
                    </strong>
                  </p>
                )}
                {orderSummary.totals?.totalBoxes > 0 && (
                  <p className="mb-1">
                    <strong>
                      Dance Recital Boxes: {orderSummary.totals.totalBoxes}{" "}
                      {orderSummary.totals.totalBoxes === 1 ? "box" : "boxes"}
                    </strong>
                  </p>
                )}
                {orderSummary.totals?.totalAddOnPieces > 0 && (
                  <p className="mb-1">
                    <strong>
                      Add-On Items: {orderSummary.totals.totalAddOnPieces}{" "}
                      pieces
                    </strong>
                  </p>
                )}
                {orderSummary.totals?.grandTotalPieces > 0 && (
                  <p className="mb-1">
                    <strong>
                      Grand Total Pieces: {orderSummary.totals.grandTotalPieces}
                    </strong>
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelOrder}>
                Cancel
              </Button>
              <Button variant="dark" onClick={confirmOrder} disabled={loading}>
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
                    Submitting Order...
                  </>
                ) : (
                  "Confirm & Submit Order"
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
