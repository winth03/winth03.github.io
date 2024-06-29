'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Form, ListGroup } from 'react-bootstrap';
import { toTitleCase } from '@/app/fallout/utils/utils';

function findMatchSnippet(content, searchTerm) {
  if (typeof content === 'string') {
    const lowerContent = content.toLowerCase();
    const index = lowerContent.indexOf(searchTerm.toLowerCase());
    if (index !== -1) {
      const start = Math.max(0, index - 30);
      const end = Math.min(content.length, index + searchTerm.length + 30);
      return '...' + content.slice(start, end) + '...';
    }
  } else if (Array.isArray(content)) {
    for (const item of content) {
      const match = findMatchSnippet(item, searchTerm);
      if (match) {
        return match;
      }
    }
  } else if (typeof content === 'object') {
    for (const key in content) {
      // Check if there is a match in the key
      if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
        return key;
      }
      // Check if there is a match in the content
      const match = findMatchSnippet(content[key], searchTerm);
      if (match) {
        return match;
      }
    }
    // const stringContent = JSON.stringify(content);
    // const lowerStringContent = stringContent.toLowerCase();
    // const index = lowerStringContent.indexOf(searchTerm.toLowerCase());
    // if (index !== -1) {
    //   const start = Math.max(0, index - 30);
    //   const end = Math.min(stringContent.length, index + searchTerm.length + 30);
    //   return '...' + stringContent.slice(start, end) + '...';
    // }
  }
  return null;
}

export function IndexPage({ pages }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(page.content) && page.content.some(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))) ||
    (typeof page.content === 'object' && JSON.stringify(page.content).toLowerCase().includes(searchTerm.toLowerCase()))
    // (typeof page.content === 'string' && page.content.toLowerCase().includes(searchTerm.toLowerCase()))
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
        {filteredPages.map((page, index) => {
          const nameMatch = page.name.toLowerCase().includes(searchTerm.toLowerCase());
          const contentMatch = findMatchSnippet(page.content, searchTerm);
          const re = new RegExp(`${searchTerm}`, 'i');
          
          return (
            <ListGroup.Item key={index}>
              <Link href={`/fallout/wiki/${page.path}`}>
                {toTitleCase(page.name)}
              </Link>
              {searchTerm && (
                <div className="mt-2 text-muted">
                  {nameMatch && <small>Matched in title</small>}
                  {contentMatch && (
                    <small>
                      {nameMatch && <br />}
                      Matched in content: {contentMatch.split(re)[0]}<mark>{contentMatch.match(re)}</mark>{contentMatch.split(re)[1]}
                    </small>
                  )}
                </div>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
}