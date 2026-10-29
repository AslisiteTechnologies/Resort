export type BookingRoom = { id: string; price: number; guests: number }
export type BookingStatus = 'Confirmed' | 'Cancelled' | 'Checked in' | 'Checked out'
export type DemoReservation = { ref: string; roomId: string; checkIn: string; checkOut: string; guests: number; name: string; email: string; total: number; status: BookingStatus; created: string }

export function countNights(checkIn: string, checkOut: string) {
  const start = parseISO(checkIn), end = parseISO(checkOut)
  return isValid(start) && isValid(end) ? Math.max(0, differenceInCalendarDays(end, start)) : 0
}

export function validStay(checkIn: string, checkOut: string, today: string) {
  const start = parseISO(checkIn), end = parseISO(checkOut), current = parseISO(today)
  return isValid(start) && isValid(end) && isValid(current) && checkIn >= today && checkOut > checkIn
}

export function canAccommodate(room: BookingRoom, guests: number) {
  return Number.isInteger(guests) && guests > 0 && guests <= room.guests
}

export function simulatedAvailability(roomId: string, checkIn: string, checkOut: string) {
  if (!validStay(checkIn, checkOut, new Date().toISOString().slice(0, 10))) return false
  const seed = [...`${roomId}:${checkIn}:${checkOut}`].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return seed % 17 !== 0
}

export function calculateEstimate(room: BookingRoom, checkIn: string, checkOut: string, guests: number, addOns: number[]) {
  const nights = countNights(checkIn, checkOut)
  const month = new Date(`${checkIn}T00:00:00`).getMonth()
  const seasonal = [11, 0, 1, 2].includes(month) ? 1.15 : 1
  const nightly = Math.round(room.price * seasonal)
  const extraGuest = Math.max(0, guests - 2) * 1500 * nights
  const lodging = nightly * nights
  const addOnsTotal = addOns.reduce((sum, amount) => sum + amount, 0)
  const subtotal = lodging + extraGuest + addOnsTotal
  const taxes = Math.round(subtotal * 0.18)
  return { nights, seasonal, nightly, lodging, extraGuest, addOnsTotal, subtotal, taxes, total: subtotal + taxes }
}

export function createReservation(input: Omit<DemoReservation, 'ref' | 'status' | 'created'>, random = Math.random(), now = new Date()) {
  return { ...input, ref: `LT-${random.toString(36).slice(2, 8).toUpperCase()}`, status: 'Confirmed' as const, created: now.toISOString() }
}

export function cancelReservation(reservations: DemoReservation[], ref: string) {
  return reservations.map(reservation => reservation.ref === ref ? { ...reservation, status: 'Cancelled' as const } : reservation)
}
import { differenceInCalendarDays, isValid, parseISO } from 'date-fns'

