import { useEffect, useState } from 'react';
import { TEAM_MEMBERS, type TeamMember } from '../constants/team';

export interface ApiTeamMember {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  bio: string;
  image_url: string;
  sort_order: number;
}

function toTeamMember(m: ApiTeamMember): TeamMember {
  return {
    id: m.id,
    name: m.name,
    title: m.title,
    specializations: m.specializations,
    bio: m.bio,
    image: m.image_url,
  };
}

export function useTeam(): { members: TeamMember[]; loading: boolean } {
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team')
      .then((r) => r.json())
      .then((data) => setMembers((data.items as ApiTeamMember[]).map(toTeamMember)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { members, loading };
}
