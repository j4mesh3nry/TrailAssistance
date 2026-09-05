import { INITIAL_STUDENTS, INITIAL_TICKETS, INITIAL_RATINGS } from './services/mockData';

test('showcase dataset is preloaded for zero-config demo', () => {
  expect(INITIAL_STUDENTS.length).toBeGreaterThan(10);
  expect(INITIAL_TICKETS.length).toBeGreaterThan(10);
  expect(INITIAL_RATINGS.length).toBeGreaterThan(3);
});

test('tickets cover full lifecycle statuses', () => {
  const statuses = new Set(INITIAL_TICKETS.map((t) => t.status));
  expect(statuses.has('submitted')).toBe(true);
  expect(statuses.has('resolved')).toBe(true);
});
