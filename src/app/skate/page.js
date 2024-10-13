"use client";

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Home.module.css';

const HomePage = () => {
  const links = [
    { href: '/fallout', title: 'Overview', icon: '📊', color: '#FFE5B4' },  // Pastel Yellow
    { href: '/fallout/inventory', title: 'Inventory', icon: '🎒', color: '#E0FFFF' },  // Pastel Cyan
    { href: '/fallout/combat', title: 'Combat', icon: '⚔️', color: '#FFB6C1' },  // Pastel Pink
    { href: '/fallout/wiki', title: 'Wiki', icon: '📚', color: '#98FB98' },  // Pastel Green
  ];

  return (
    <Container className="py-5">
      <h1 className={`text-center mb-5 ${styles.title}`}>Welcome to Fallout</h1>
      <Row className="justify-content-center">
        {links.map((link, index) => (
          <Col key={index} xs={12} sm={6} md={3} className="mb-4">
            <Link href={link.href} passHref style={{textDecoration: 'none'}}>
              <Card className={`${styles.card}`} style={{ backgroundColor: link.color }}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>{link.icon}</span>
                  </div>
                  <Card.Text className={`${styles.cardTitle} mt-3`}>{link.title}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;