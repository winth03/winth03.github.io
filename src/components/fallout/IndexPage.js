'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Form, ListGroup, Spinner } from 'react-bootstrap';
import { toTitleCase } from '@/app/fallout/utils/utils';

export function IndexPage({ pages }) {  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPages, setFilteredPages] = useState([]);
  const [searchableContent, setSearchableContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndProcessContent() {
      const content = {};
      for (const page of pages) {
        const res = await fetch(`/fallout/wiki/${page.path}`);
        const text = await res.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const div = doc.getElementById('wiki-content');
        if (div) {
          content[page.name] = {
            text: div.innerText.toLowerCase(),
            html: div.innerHTML,
            elements: Array.from(div.getElementsByTagName('*'))
              .filter(el => el.id)
              .map(el => ({
                id: el.id,
                text: el.innerText.toLowerCase()
              }))
          };
        }
      }
      setSearchableContent(content);
      setLoading(false);
    }

    fetchAndProcessContent();
  }, [pages]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPages(pages);
      return;
    }
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = pages.filter(page => {
      const content = searchableContent[page.name];
      return content && (
        page.name.toLowerCase().includes(lowercaseSearchTerm) ||
        content.text.includes(lowercaseSearchTerm)
      );
    }).map(page => {
      const content = searchableContent[page.name];
      const { snippet, matchedId } = getSnippetAndId(content, lowercaseSearchTerm);
      return { ...page, snippet, matchedId };
    });

    setFilteredPages(filtered);
  }, [searchTerm, searchableContent, pages]);

  function getSnippetAndId(content, searchTerm) {
    // First, try to find a match in an element with an ID
    for (const el of content.elements) {
      if (el.text.includes(searchTerm)) {
        const index = el.text.indexOf(searchTerm);
        const start = Math.max(0, index - 50);
        const end = Math.min(el.text.length, index + searchTerm.length + 50);
        let snippet = el.text.slice(start, end);
        const highlightedSnippet = snippet.replace(
          new RegExp(searchTerm, 'gi'),
          match => `<mark>${match}</mark>`
        );
        return { 
          snippet: ['...', highlightedSnippet, '...'],
          matchedId: el.id
        };
      }
    }

    // If no match in an element with ID, search in the full content
    const index = content.text.indexOf(searchTerm);
    if (index === -1) return { snippet: null, matchedId: null };

    const start = Math.max(0, index - 50);
    const end = Math.min(content.text.length, index + searchTerm.length + 50);
    let snippet = content.text.slice(start, end);
    const highlightedSnippet = snippet.replace(
      new RegExp(searchTerm, 'gi'),
      match => `<mark>${match}</mark>`
    );
    return { 
      snippet: ['...', highlightedSnippet, '...'],
      matchedId: null
    };
  }

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center">
        <Spinner />
      </Container>
    );
  }

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
            <Link href={`/fallout/wiki/${page.path}${page.matchedId ? '#' + page.matchedId : ''}`}>
              {toTitleCase(page.name)}
            </Link>
            {page.snippet && (
              <div className="mt-2 text-muted">
                <small>
                  Matched in content: <span dangerouslySetInnerHTML={{ __html: page.snippet.join('') }} />
                </small>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}