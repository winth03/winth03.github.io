'use client'

import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';

const CalculatorInput = ({ value, onChange, integer=false, className="" }) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculation, setCalculation] = useState(value.toString());

  useEffect(() => {
    if (showCalculator) {
      setCalculation(inputValue.toString());
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
        let result = eval(calculation);
        if (integer) result = Math.floor(result);
        setInputValue(result.toString());
        setCalculation('');
        setShowCalculator(false);
        onChange(result);
      } catch (error) {
        alert('Invalid calculation');
      }
    } else if (value === 'C') {
      setCalculation('');
    } else if (value === '⇦') {
      setCalculation(prev => prev.slice(0, -1));
    } else {
      setCalculation(prev => prev === '0' ? value : prev + value);
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C', '(', ')', '⇦'];

  return (
    <>
      <span
        onClick={handleInputClick}
        style={{ 
          cursor: 'pointer',
        }}
        className={className}
      >
        <nobr>
          {inputValue}&nbsp;
          <i class="bi bi-pencil-square"></i>
        </nobr>
      </span>

      <Modal show={showCalculator} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form.Control
            type="text"
            value={calculation.replace(/\*/g, '×').replace(/\//g, '÷')}
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
                  disabled={integer && btn === '.'}
                >
                  {btn === '*' ? '×' : btn === '/' ? '÷' : btn}
                </Button>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CalculatorInput;