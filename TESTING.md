# Testing Guide

## Overview

This guide covers unit testing, integration testing, and end-to-end testing for the GuideIT AI SaaS platform.

## Testing Stack

- **Unit Tests**: Jest
- **Integration Tests**: Jest + Supertest
- **E2E Tests**: Cypress/Playwright
- **Performance Tests**: Artillery
- **Load Testing**: k6

## Running Tests

### Unit Tests

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Run specific test file
pnpm run test -- ChatInterface.test.tsx
```

### Integration Tests

```bash
# Run integration tests
pnpm run test:integration

# Run with specific database
TEST_DATABASE_URL=postgresql://... pnpm run test:integration
```

### E2E Tests

```bash
# Run Cypress E2E tests
pnpm run test:e2e

# Open Cypress interactive mode
pnpm run test:e2e:open

# Run headless
pnpm run test:e2e:headless
```

## Test Structure

### Unit Test Example

```typescript
// src/components/__tests__/HeroSection.test.tsx
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../hero/HeroSection';

describe('HeroSection', () => {
  it('should render hero section with title', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Enterprise AI/)).toBeInTheDocument();
  });

  it('should have call-to-action button', () => {
    render(<HeroSection />);
    const button = screen.getByRole('button', { name: /Get Started/i });
    expect(button).toBeVisible();
  });
});
```

### API Test Example

```typescript
// api/__tests__/conversations.test.ts
import request from 'supertest';
import app from '../../app';

describe('Conversations API', () => {
  let token: string;
  let conversationId: string;

  beforeAll(async () => {
    // Create test user and get token
    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
    token = response.body.token;
  });

  describe('POST /conversations', () => {
    it('should create a new conversation', async () => {
      const response = await request(app)
        .post('/conversations')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Conversation',
          model: 'gpt-4'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      conversationId = response.body.id;
    });
  });

  describe('GET /conversations/:id', () => {
    it('should retrieve conversation', async () => {
      const response = await request(app)
        .get(`/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Test Conversation');
    });
  });
});
```

## E2E Test Example

```typescript
// cypress/e2e/chat.cy.ts
describe('Chat Interface', () => {
  beforeEach(() => {
    cy.visit('/chat');
    cy.login('test@example.com', 'password123');
  });

  it('should send and receive message', () => {
    cy.get('[data-testid="message-input"]').type('Hello AI');
    cy.get('[data-testid="send-button"]').click();

    cy.get('[data-testid="message-assistant"]')
      .should('be.visible')
      .contains(/Hello|Hi/);
  });

  it('should display loading state', () => {
    cy.get('[data-testid="message-input"]').type('Complex question');
    cy.get('[data-testid="send-button"]').click();

    cy.get('[data-testid="loading-spinner"]').should('be.visible');
    cy.get('[data-testid="loading-spinner"]').should('not.exist');
  });
});
```

## Coverage Goals

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Performance Testing

### Load Testing with k6

```bash
# Install k6
brew install k6

# Run load test
k6 run load-test.js

# Run with specific duration
k6 run --duration 30s --vus 10 load-test.js
```

### Load Test Script

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function () {
  const url = 'http://localhost:3000/api/conversations';
  const payload = JSON.stringify({
    title: 'Test',
    model: 'gpt-4'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    'status is 201': (r) => r.status === 201,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

## Continuous Integration

GitHub Actions automatically runs tests on:
- Push to main/develop
- Pull requests

View `.github/workflows/deploy.yml` for CI configuration.

## Test Database

Use SQLite for tests:

```bash
# Initialize test database
TEST_DATABASE_URL=file:./test.db pnpm run test
```

## Debugging Tests

### Debug Mode

```bash
# Run with Node debugger
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Debugging Cypress

```bash
# Open Cypress with debugging
DEBUG=* pnpm run test:e2e:open
```

### Print Statements

```typescript
console.log('[v0] Debug info:', variable);
```

## Best Practices

1. **Keep tests focused**: One assertion per test
2. **Use meaningful names**: Describe what is being tested
3. **Mock external APIs**: Don't call real APIs in tests
4. **Clean up after tests**: Remove test data
5. **Test user flows**: Not just functions
6. **Avoid flaky tests**: Use proper waits

## Troubleshooting

### Tests timeout

```bash
# Increase timeout
jest.setTimeout(10000);
```

### Database locked

```bash
# Close other connections
# Or use in-memory database
```

### Mock not working

```typescript
// Clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Documentation](https://docs.cypress.io/)
- [k6 Load Testing](https://k6.io/)
