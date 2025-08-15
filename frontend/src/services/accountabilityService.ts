import { Stage, Method, Detail, ResponsibleActor } from "../types";
import { api } from "./pipelineAPI"; // ← use shared Axios client (baseURL=/api in prod)

// === Stages ===
export const fetchStages = async (): Promise<Stage[]> => {
  const { data } = await api.get<Stage[]>("/pipeline_stages/");
  return data;
};

export const fetchStageById = async (id: string): Promise<Stage> => {
  const { data } = await api.get<Stage>(`/pipeline_stages/${id}`);
  return data;
};

export const createStage = async (payload: {
  name: string;
  description: string;
}): Promise<Stage> => {
  const { data } = await api.post<Stage>("/pipeline_stages/", payload);
  return data;
};

// === Responsible Actors ===
export const fetchAllActors = async (): Promise<ResponsibleActor[]> => {
  const { data } = await api.get<ResponsibleActor[]>("/responsible_actors/");
  return data;
};

export const createResponsibleActor = async (payload: {
  id: string;
  name: string;
  role: string;
  contributions?: string;
  decisions?: string;
  reasons?: string;
  stage_id?: string;
}): Promise<{ id: string }> => {
  const { data } = await api.post<{ id: string }>("/responsible_actors/", payload);
  return data;
};

// === Methods ===
export const fetchMethods = async (): Promise<Method[]> => {
  const { data } = await api.get<Method[]>("/pipeline_methods/");
  return data;
};

export const fetchMethodById = async (id: string): Promise<Method> => {
  const { data } = await api.get<Method>(`/pipeline_methods/${id}`);
  return data;
};

export const createMethod = async (payload: {
  stage_id: string;
  name: string;
  description: string;
  actor_ids: string[];
}): Promise<Method> => {
  const { data } = await api.post<Method>("/pipeline_methods/", payload);
  return data;
};

// === Details ===
export const fetchDetailsByMethod = async (methodId: string): Promise<Detail[]> => {
  // Use the backend's by-method route (cleaner than query param)
  const { data } = await api.get<Detail[]>(`/pipeline_details/by_method/${methodId}`);
  return data;
};

export const createDetail = async (payload: {
  method_id: string;
  name: string;
  value: string;
  description: string;
  file?: File;
}): Promise<Detail> => {
  const formData = new FormData();
  formData.append("method_id", payload.method_id);
  formData.append("name", payload.name);
  formData.append("value", payload.value);
  formData.append("description", payload.description);
  if (payload.file) formData.append("file", payload.file);

  const { data } = await api.post<Detail>("/pipeline_details/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
