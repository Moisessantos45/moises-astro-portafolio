interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  status: 'current' | 'completed';
  description: string;
}

export type { Experience };
