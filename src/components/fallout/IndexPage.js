'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Form, ListGroup, Spinner } from 'react-bootstrap';
import { toTitleCase } from '@/app/fallout/utils/utils';

export function IndexPage({ pages }) {  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPages, setFilteredPages] = useState([]);
  const [htmls, setHtmls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHtmls() {
      const htmls = await pages.reduce(async (obj, page) => {
        obj = await obj;
        const res = await fetch(`/fallout/wiki/${page.path}`).then(res => res.text());

        // Get only div with id="wiki-content"
        const div = new DOMParser().parseFromString(res, 'text/html').getElementById('wiki-content');
        if (!div) return obj;

        return {
          ...obj,
          [page.name]: div.innerHTML
        }
      }, Promise.resolve({}));
      return htmls;
    }

    fetchHtmls().then((htmls) => {
      setHtmls(htmls);
      setLoading(false);
    });
  }, [pages]);

  useEffect(() => {
    if (!searchTerm) return setFilteredPages(pages);
    const filteredPages = filterAndFindMatchSnippet(searchTerm);
    setFilteredPages(filteredPages);
  }, [searchTerm, htmls]);

  function filterAndFindMatchSnippet(searchTerm) {
    const re = new RegExp(searchTerm, 'i');

    // Search for searchTerm in htmls
    const filteredHtmls = Object.entries(htmls).filter(([name, html]) => re.test(html));

    // Find the snippet of the match
    const snippets = filteredHtmls.reduce((obj, [name, html]) => {
      const nameMatch = name.match(re)?.[0];

      // Find the match in the content
      let contentMatch = html.match(new RegExp(`<[^>]*>[^<]*${searchTerm}[^<]*</[^>]*>`, 'i'))?.[0];
      if (!contentMatch) return {
        ...obj,
        [name]: {
          nameMatch
        }      
      };

      // Find the id of the matched element using DOMParser
      const matchedId = contentMatch.match(/id="([^"]*)"/)?.[1];
      contentMatch = contentMatch.replace(/<[^>]*>/g, '');
      const searchTermMatch = contentMatch.match(new RegExp(searchTerm, 'i'));
      
      // Create a snippet of the match
      // If the content is too long, only show the 100 characters around the match
      let index = contentMatch.indexOf(searchTermMatch);
      if (contentMatch.length > 100) {
        const start = Math.max(0, index - 50);
        const end = Math.min(contentMatch.length, index + 50);
        contentMatch = contentMatch.slice(start, end);
      }
      index = contentMatch.indexOf(searchTermMatch);
      const snippet = ['...', contentMatch.slice(0, index), <mark key={searchTermMatch}>{searchTermMatch}</mark>, contentMatch.slice(index + searchTerm.length), '...'];
      return {
        ...obj,
        [name]: {
          nameMatch,
          contentMatch,
          matchedId,
          snippet
        }
      }
    }, {});

    return pages
      .filter(page => Object.keys(snippets).includes(page.name))
      .map(page => {
      return {
        ...page,
        ...snippets[page.name]
      }
    });
  }

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center">
        <Spinner />
      </Container>
    );
  }
  else return (
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
          const { nameMatch, contentMatch, matchedId, snippet } = page;
          return (
            <ListGroup.Item key={index}>
              <Link href={`/fallout/wiki/${page.path}${matchedId ? '#' + matchedId : ''}`}>
                {toTitleCase(page.name)}
              </Link>
              {searchTerm && (
                <div className="mt-2 text-muted">
                  {nameMatch && <small>Matched in title</small>}
                  {contentMatch && (
                    <small>
                      {nameMatch && <br />}
                      Matched in content: <span
                        style={{
                          display: 'inline-block',
                          maxWidth: '100%',
                          whiteSpace: 'nowrap'
                        }}
                      >{snippet}</span>
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