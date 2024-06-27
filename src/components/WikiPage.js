'use client';

import { Container, Row, Col, Table } from 'react-bootstrap';
import { toTitleCase } from '@/app/fallout/utils/utils';
import React from 'react';

export default function WikiPage({ title, jsonData, csvData }) {
  function renderContent(content, step=0) {
    const headerSteps = ['h2', 'h3', 'h4', 'h5', 'h6'];
    if (!content) return null;

    return Object.entries(content).map(([key, value]) => {
      if (typeof value === 'string') {
        return <p key={key}>{value}</p>;
      } else if (typeof value === 'object') {
        return (
          <div key={key} className='ps-4'>
            {key == 'subsections' ? null : React.createElement(headerSteps[step], toTitleCase(key) )}
            {renderContent(value, Math.min(key == 'subsections' ? step : (step + 1), headerSteps.length-1))}
          </div>
        );
      }
    });
  }

  function renderTable(csv) {
    let tables = [];
    for (const t of csv) {
      tables.push(<h3>{toTitleCase(t.name)}</h3>);
      tables.push(
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              {t.data[0].map((header, index) => (
                <th key={index}>{toTitleCase(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
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
    <Container className="mt-4">
      <h1>{toTitleCase(title)}</h1>
      {jsonData && renderContent(jsonData)}
      {csvData && renderTable(csvData)}
    </Container>
  );
}