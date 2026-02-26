import { apiPost } from './client';
import type { BookingCreate, BookingResponse } from '../types';

export function createBooking(data: BookingCreate): Promise<BookingResponse> {
  return apiPost<BookingResponse>('/api/bookings', data);
}
