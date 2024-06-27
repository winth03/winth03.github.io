'use client';

import { useState, useEffect } from 'react';
import { Accordion, ListGroup, Modal, Table, Form, InputGroup, Button } from 'react-bootstrap';
import { toTitleCase } from '@/app/fallout/utils/utils';

function filterData(data, searchTerm) {
  if (!searchTerm) return data;

  return Object.entries(data).reduce((acc, [category, items]) => {

    if (!Array.isArray(items)) {
      const filteredSubcategory = filterData(items, searchTerm);
      if (Object.keys(filteredSubcategory).length > 0) {
        acc[category] = filteredSubcategory;
      }
    } else {
      const filteredItems = items.filter((item) =>
        Object.values(item)[0].toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }
    }

    return acc;
  }, {});
}

function ItemsAccordion({ data, depth = 0, onItemSelect }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item, category, subCategory) => {
    setSelectedItem([item, category, subCategory]);
    setShowModal(true);
  };

  return (
    <>
      <Accordion>
        {Object.entries(data).map(([category, items], index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>
              {toTitleCase(category)}
            </Accordion.Header>
            <Accordion.Body>
              {!Array.isArray(items) ? (
                <ItemsAccordion data={items} depth={depth + 1} onItemSelect={(item, subCategory) => onItemSelect(item, category, subCategory)} />
              ) : (
                <ListGroup>
                  {items.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      onClick={() => handleItemClick(item, category, category)}
                    >
                      {Object.values(item)[0]}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem && Object.values(selectedItem[0])[0]}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='overflow-auto'>
          {selectedItem && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {Object.keys(selectedItem[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(selectedItem[0]).map((value, valueIndex) => (
                    <td key={valueIndex}>{value}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => onItemSelect(selectedItem[0], selectedItem[1], selectedItem[2])}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function ItemsAndCostsComponent({ itemsAndCosts, onItemSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(itemsAndCosts);

  useEffect(() => {
    const filtered = filterData(itemsAndCosts, searchTerm);
    setFilteredData(filtered);
  }, [searchTerm, itemsAndCosts]);

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>Search</InputGroup.Text>
        <Form.Control
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <ItemsAccordion data={filteredData} onItemSelect={onItemSelect} />
    </>
  );
}