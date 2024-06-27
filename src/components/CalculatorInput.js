'use client'

import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';

const CalculatorInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculation, setCalculation] = useState('');

  useEffect(() => {
    if (showCalculator) {
      setCalculation(inputValue);
    }
  }, [showCalculator, inputValue]);

  const handleInputClick = () => {
    setShowCalculator(true);
  };

  const handleClose = () => {
    setShowCalculator(false);
    setCalculation('');
  };

  const handleCalculatorClick = (value) => {
    if (value === '=') {
      try {
        const result = Math.floor(eval(calculation));
        setInputValue(result.toString());
        setCalculation('');
        setShowCalculator(false);
        onChange(result);
      } catch (error) {
        setCalculation('Error');
      }
    } else if (value === 'C') {
      setCalculation('');
    } else {
      setCalculation(prev => prev === '0' ? value : prev + value);
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];

  return (
    <Container>
      <Form.Group>
        <Form.Control
          type="text"
          value={inputValue}
          onClick={handleInputClick}
          readOnly
        />
      </Form.Group>

      <Modal show={showCalculator} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form.Control
            type="text"
            value={calculation}
            readOnly
            className="mb-3 text-right font-weight-bold"
            style={{ fontSize: '1.5rem' }}
          />
          <Row>
            {buttons.map((btn) => (
              <Col key={btn} xs={3} className="mb-2">
                <Button
                  variant={btn === '=' ? 'primary' : btn === 'C' ? 'danger' : 'secondary'}
                  onClick={() => handleCalculatorClick(btn)}
                  className="w-100"
                  style={{ height: '50px' }}
                >
                  {btn}
                </Button>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CalculatorInput;