import { apiPost } from './client';
import type { ContactCreate, ContactResponse } from '../types';

export function sendContactMessage(data: ContactCreate): Promise<ContactResponse> {
  return apiPost<ContactResponse>('/api/contact', data);
}
