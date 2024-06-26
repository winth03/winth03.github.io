'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Form, ListGroup } from 'react-bootstrap';
import { toTitleCase } from '@/app/fallout/utils/utils';

export function IndexPage({ pages }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    JSON.stringify(page.content).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h1>Fallout TTRPG Wiki Index</h1>
      <Form.Control
        type="text"
        placeholder="Search pages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <ListGroup>
        {filteredPages.map((page, index) => (
          <ListGroup.Item key={index}>
            <Link href={`/fallout/wiki/${page.path}`}>
              {toTitleCase(page.name)}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}