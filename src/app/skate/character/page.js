"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import ContentEditable from '@/components/ContentEditable'
import ImageInput from '@/components/ImageInput';

export default function CharacterSheet() {
  const [status, setStatus] = useState(false);
  const [charName, setCharName] = useState("");
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [will, setWill] = useState(0);
  const [health, setHealth] = useState(4);
  const [maxHealth, setMaxHealth] = useState(4);
  const charNameRef = useRef(null);

  useEffect(() => {
    function handleMessage(event) {
      if (event.data.type !== "VTT_RESPONSE") return;

      setStatus(true);
    }

    function testConnection() {
      const testMessage = {
        type: 'TEST_CONNECTION',
        data: { test: true }
      };

      window.postMessage(testMessage, '*');
    }

    window.addEventListener('message', handleMessage);

    const intervalId = setInterval(testConnection, 5000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(intervalId);
    };
  }, []);

  function sendTestMessage() {
    window.postMessage({ type: "SEND_MESSAGE", message: "HELLO WORLD!" }, "*");
    setDebugLog(prev => [...prev, `Manually sent test message: ${JSON.stringify(testMessage)}`]);
  }

  return (
    <div className="p-4">
      <Row>
        <h1 className="text-2xl font-bold my-auto w-auto">Character Sheet</h1>
        <span className="w-auto my-auto">Extension Status:</span>
        <div style={{width: 25, height: 25, backgroundColor: status ? "green" : "red", margin: 'auto 0', borderRadius: 9999}}></div>
      </Row>
      <main className='p-4'>
        <Row className='justify-content-center'>
          <div className="w-50 d-flex justify-content-center align-items-center">
            <ImageInput />
          </div>
          <Col>
            <Row className='justify-content-center align-items-center fs-1'>
              <ContentEditable className='my-auto w-auto' value={charName} placeholder='Character Name' onInput={(val) => setCharName(val)} />
              <svg className='my-auto w-auto' onClick={() => charNameRef.current?.focus()} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"></path></svg>
            </Row>
            <Row className='justify-content-center'>
              <StatCell className="me-4" label="Strength" value={strength} onInput={(val) => setStrength(val)} />
              <StatCell className="me-4" label="Dexterity" value={dexterity} onInput={(val) => setDexterity(val)} />
              <StatCell label="Will" value={will} onInput={(val) => setWill(val)} />
            </Row>
            <Row className='justify-content-center fs-3'>
              <span className='w-auto'>Health: </span>
              <ContentEditable className='w-auto my-auto border rounded' value={health} onInput={(val) => setHealth(val)} number />
              &nbsp;/&nbsp;
              <ContentEditable className='w-auto my-auto border rounded' value={maxHealth} onInput={(val) => setMaxHealth(val)} number />
            </Row>
          </Col>
        </Row>
      </main>
    </div>
  );
}

function StatCell({ value, label, className, onInput }) {
  return (
    <div className={`bg-black p-4 d-flex flex-column align-items-center ${className}`} style={{width: "7em",borderRadius: "2em"}}>
      <ContentEditable className='fs-3' value={value} number onInput={(val) => onInput(val)} prefix={ value >= 0 && "+" } />
      {label}
    </div>
  )
}