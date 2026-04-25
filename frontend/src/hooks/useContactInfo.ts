import { useEffect, useState } from 'react';
import { CLINIC } from '../constants/contact';
import { IMAGES } from '../constants/images';

export interface ContactInfo {
  address: string;
  address_short: string;
  city: string;
  phone: string;
  phone_raw: string;
  email: string;
  hours: string;
  map_embed: string;
  map_link: string;
  building_image_url: string;
}

const FALLBACK: ContactInfo = {
  address: CLINIC.address,
  address_short: CLINIC.addressShort,
  city: CLINIC.city,
  phone: CLINIC.phone,
  phone_raw: CLINIC.phoneRaw,
  email: CLINIC.email,
  hours: CLINIC.hours,
  map_embed: CLINIC.mapEmbed,
  map_link: CLINIC.mapLink,
  building_image_url: IMAGES.building,
};

export function useContactInfo(): ContactInfo {
  const [info, setInfo] = useState<ContactInfo>(FALLBACK);

  useEffect(() => {
    fetch('/api/settings/contact')
      .then((r) => r.json())
      .then((data) => {
        const parsed: ContactInfo = JSON.parse(data.value);
        setInfo(parsed);
      })
      .catch(() => {});
  }, []);

  return info;
}
