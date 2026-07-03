export interface EurovisionShow {
  id: string;
  name: string;
  startTime: string; // ISO 8601 format
  endTime: string;
}

export const EUROVISION_SCHEDULE: EurovisionShow[] = [
  {
    id: 'semi1',
    name: 'Semifinal 1',
    startTime: '2026-05-12T20:00:00Z',
    endTime: '2026-05-12T22:30:00Z',
  },
  {
    id: 'semi2',
    name: 'Semifinal 2',
    startTime: '2026-05-14T20:00:00Z',
    endTime: '2026-05-14T22:30:00Z',
  },
  {
    id: 'final',
    name: 'Grand Final',
    startTime: '2026-05-16T20:00:00Z',
    endTime: '2026-05-17T00:30:00Z',
  },
];
