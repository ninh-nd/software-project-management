export interface Progress {
  total: number;
  resolved: number;
}
export interface Resolution {
  cveId: string;
  resolution: [
    {
      createdBy?: string;
      description: string;
    }
  ];
}
