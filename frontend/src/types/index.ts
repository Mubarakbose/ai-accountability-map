export interface Stage {
  id: string;
  name: string;
  description: string;
}

export interface ResponsibleActor {
  id: string;
  name: string;
  role: string;
  contributions?: string;
  decisions?: string;
  reasons?: string;
  timestamp?: string;
}

export interface Method {
  id: string;
  name: string;
  description: string;
  stage_id: string;
  actors: ResponsibleActor[];
  timestamp?: string;  // ✅ Add this line
}

export interface Detail {
  id: string;
  name: string;
  description: string;
  value: string;
  method_id: string;
  file_url?: string;
}
