// ✅ Updated accountabilityService.ts with full types

import axios from "axios";
import { Stage, Method, Detail, ResponsibleActor } from "../types";

const API_BASE = "http://127.0.0.1:8000";

// === Stages ===
export const fetchStages = async (): Promise<Stage[]> => {
  const res = await axios.get<Stage[]>(`${API_BASE}/pipeline_stages/`);
  return res.data;
};

export const fetchStageById = async (id: string): Promise<Stage> => {
  const res = await axios.get<Stage>(`${API_BASE}/pipeline_stages/${id}`);
  return res.data;
};

export const createStage = async (data: {
  name: string;
  description: string;
}): Promise<Stage> => {
  const res = await axios.post<Stage>(`${API_BASE}/pipeline_stages/`, data);
  return res.data;
};

// === Responsible Actors ===
export const fetchAllActors = async (): Promise<ResponsibleActor[]> => {
  const res = await axios.get<ResponsibleActor[]>(`${API_BASE}/responsible_actors/`);
  return res.data;
};

export const createResponsibleActor = async (data: {
  id: string;
  name: string;
  role: string;
  contributions?: string;
  decisions?: string;
  reasons?: string;
  stage_id?: string;
}): Promise<{ id: string }> => {
  const res = await axios.post<{ id: string }>(`${API_BASE}/responsible_actors/`, data);
  return res.data;
};

// === Methods ===
export const fetchMethods = async (): Promise<Method[]> => {
  const res = await axios.get<Method[]>(`${API_BASE}/pipeline_methods/`);
  return res.data;
};

export const fetchMethodById = async (id: string): Promise<Method> => {
  const res = await axios.get<Method>(`${API_BASE}/pipeline_methods/${id}`);
  return res.data;
};

export const createMethod = async (data: {
  stage_id: string;
  name: string;
  description: string;
  actor_ids: string[];
}): Promise<Method> => {
  const res = await axios.post<Method>(`${API_BASE}/pipeline_methods/`, data);
  return res.data;
};

// === Details ===
export const fetchDetailsByMethod = async (method_id: string): Promise<Detail[]> => {
  const res = await axios.get<Detail[]>(`${API_BASE}/pipeline_details/`, {
    params: { method_id },
  });
  return res.data;
};

export const createDetail = async (data: {
  method_id: string;
  name: string;
  value: string;
  description: string;
  file?: File;
}): Promise<Detail> => {
  const formData = new FormData();
  formData.append("method_id", data.method_id);
  formData.append("name", data.name);
  formData.append("value", data.value);
  formData.append("description", data.description);
  if (data.file) {
    formData.append("file", data.file);
  }

  const res = await axios.post<Detail>(`${API_BASE}/pipeline_details/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
