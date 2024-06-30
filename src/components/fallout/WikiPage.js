'use client';

import { Container, Row, Col, Table, Toast } from 'react-bootstrap';
import { toTitleCase } from '@/app/fallout/utils/utils';
import React from 'react';

export default function WikiPage({ title, jsonData, csvData }) {
  const [showToast, setShowToast] = React.useState(false);

  function renderContent(content, step=0, contentId=null) {
    const headerSteps = ['h3', 'h5', 'h6'];
    if (!content) return null;

    return Object.entries(content).map(([key, value]) => {
      const newKey = (contentId ? contentId + '-' : '') + key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      if (typeof value === 'string') {
        return <p id={newKey} key={newKey} style={{textIndent: '2rem'}}>{value}</p>;
      } else if (typeof value === 'object') {
        return (
          <div key={newKey} className='ps-4'>
            {key === 'subsections' ? null : React.createElement(headerSteps[step], {
              id: newKey,
              // Set user's clipboard to the element's id when clicked
              onClick: () => {
                navigator.clipboard.writeText(window.location.href + '#' + key.replace(/\.$/, '').toLowerCase());
                setShowToast(true);
              }
            }, toTitleCase(key.replace(/\.$/, '')))}
            {renderContent(value, Math.min(key === 'subsections' ? step : (step + 1), headerSteps.length-1), newKey)}
          </div>
        );
      }
    });
  }

  function renderTable(csv) {
    let tables = [];
    for (const t of csv) {
      tables.push(<h3 id={t.name} style={{
        cursor: 'pointer',
      }} onClick={
        // Set user's clipboard to the url with element's id when clicked
        () => {
          navigator.clipboard.writeText(window.location.href + '#' + t.name);
          setShowToast(true);
        }
      } key={t.name}>{toTitleCase(t.name)}</h3>);
      tables.push(
        <Table key={t.name + '-table'} striped bordered hover className="mt-4">
          <thead>
            <tr>
              {t.data[0].map((header, index) => (
                <th id={header} key={`${t.name}-header-${index}`}>{toTitleCase(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.data.slice(1).map((row, rowIndex) => (
              <tr key={`${t.name}-row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td id={cell.toLowerCase().replace(/\s/g, '_')} key={`${t.name}-cell-${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return tables
  }

  return (
    <Container id='wiki-content' className="mt-4">
      <h1>{toTitleCase(title)}</h1>
      {jsonData && renderContent(jsonData)}
      {csvData && renderTable(csvData)}
      <Toast className='position-fixed end-0 bottom-0 m-4' bg='success' onClose={() => setShowToast(false)} show={showToast} autohide>
        <Toast.Body>
          URL copied to clipboard.
        </Toast.Body>
      </Toast>
    </Container>
  );
}