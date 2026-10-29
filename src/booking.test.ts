import { describe, expect, it } from 'vitest'
import { calculateEstimate, cancelReservation, canAccommodate, countNights, createReservation, simulatedAvailability, validStay } from './booking'

const room = { id: 'suite', price: 10000, guests: 4 }

describe('booking date and occupancy rules', () => {
  it('counts nights and rejects invalid or past date ranges', () => {
    expect(countNights('2027-01-10', '2027-01-13')).toBe(3)
    expect(validStay('2027-01-10', '2027-01-13', '2027-01-01')).toBe(true)
    expect(validStay('2026-12-31', '2027-01-02', '2027-01-01')).toBe(false)
    expect(validStay('2027-01-13', '2027-01-10', '2027-01-01')).toBe(false)
  })
  it('checks room occupancy', () => {
    expect(canAccommodate(room, 4)).toBe(true)
    expect(canAccommodate(room, 5)).toBe(false)
    expect(canAccommodate(room, 0)).toBe(false)
  })
  it('produces repeatable simulated availability for the same date range', () => {
    const first = simulatedAvailability('suite', '2027-01-10', '2027-01-13')
    expect(simulatedAvailability('suite', '2027-01-10', '2027-01-13')).toBe(first)
    expect(simulatedAvailability('suite', '2026-12-31', '2027-01-02')).toBe(false)
  })
})

describe('pricing and local reservation state', () => {
  it('applies seasonal rates, extra guest charges, add-ons and illustrative tax', () => {
    const estimate = calculateEstimate(room, '2027-01-10', '2027-01-13', 3, [2400])
    expect(estimate.nightly).toBe(11500)
    expect(estimate.extraGuest).toBe(4500)
    expect(estimate.subtotal).toBe(41400)
    expect(estimate.taxes).toBe(7452)
    expect(estimate.total).toBe(48852)
  })
  it('creates and cancels a local demo reservation', () => {
    const created = createReservation({ roomId: 'suite', checkIn: '2027-01-10', checkOut: '2027-01-13', guests: 2, name: 'Demo Guest', email: 'guest@example.test', total: 100 }, 0.23456, new Date('2026-10-01T00:00:00Z'))
    expect(created.ref).toMatch(/^LT-/)
    const cancelled = cancelReservation([created], created.ref)
    expect(cancelled[0].status).toBe('Cancelled')
    expect(created.status).toBe('Confirmed')
  })
})
