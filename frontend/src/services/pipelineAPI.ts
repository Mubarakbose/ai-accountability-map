import axios from "axios";
import type { Stage, Method, Detail, ResponsibleActor } from "../types";
/**
 * Configure API base URL from env:
 *  - frontend/.env.development => REACT_APP_API_BASE=http://localhost:8000
 *  - frontend/.env.production  => REACT_APP_API_BASE=/api
 */
const API_BASE = process.env.REACT_APP_API_BASE || "/api";

export const api = axios.create({ baseURL: API_BASE });

// Helper to normalize detail.file_url into a full URL the browser can use
export function buildFileUrl(fileUrl: string | null | undefined): string | null {
  if (!fileUrl) return null;
  // already absolute
  if (/^https?:\/\//i.test(fileUrl)) return fileUrl;

  // Normalize incoming value and strip any leading path prefixes like
  // "api/", "uploads/" or repeated "uploads/uploads/"
  let cleaned = String(fileUrl).trim();

  // remove any leading slashes
  cleaned = cleaned.replace(/^\/+/, "");

  // strip any leading "api/" and any number of "uploads/" segments
  cleaned = cleaned.replace(/^(?:api\/)?(?:uploads\/)*/i, "");

  // collapse any accidental internal repeated "uploads/" fragments
  cleaned = cleaned.replace(/(?:uploads\/)+/ig, "uploads/");

  // remove leading/trailing whitespace again
  cleaned = cleaned.trim();

  // ensure API_BASE has no trailing slash
  const base = String(API_BASE || "").replace(/\/+$/, "");

  // encode filename / path safely (preserves existing safe characters)
  const encoded = encodeURI(cleaned);

  // final URL: `${base}/uploads/<encoded>`
  const url = `${base}/uploads/${encoded}`;

  // collapse double slashes (except after protocol if base is absolute)
  return url.replace(/([^:]\/)\/+/g, "$1");
}

// ---- Stages ----
export async function getStages(): Promise<Stage[]> {
  const { data } = await api.get<Stage[]>("/pipeline_stages/");
  return data;
}

export async function getStageById(id: string): Promise<Stage> {
  const { data } = await api.get<Stage>(`/pipeline_stages/${id}`);
  return data;
}

export async function createStage(payload: { name: string; description?: string }): Promise<Stage> {
  const { data } = await api.post<Stage>("/pipeline_stages/", payload);
  return data;
}

// ---- Methods ----
export async function getMethods(): Promise<Method[]> {
  const { data } = await api.get<Method[]>("/pipeline_methods/");
  return data;
}

export async function getMethodById(id: string): Promise<Method> {
  const { data } = await api.get<Method>(`/pipeline_methods/${id}`);
  return data;
}

export async function createMethod(payload: { stage_id: string; name: string; description?: string }): Promise<Method> {
  const { data } = await api.post<Method>("/pipeline_methods/", payload);
  return data;
}

// ---- Details ----
export async function getDetailsByMethod(methodId: string): Promise<Detail[]> {
  const { data } = await api.get<Detail[]>(`/pipeline_details/by_method/${methodId}`);
  if (!data) return data;
  if (Array.isArray(data)) {
    return data.map((d: any) => ({
      ...d,
      file_url: buildFileUrl(d.file_url),
    }));
  }
  // fallback if API returns a single object
  return [
    {
      ...(data as any),
      file_url: buildFileUrl((data as any).file_url),
    },
  ] as unknown as Detail[];
}

export async function createDetail(payload: {
  method_id: string;
  name: string;
  value?: string;
  description?: string;
  file?: File | null;
}): Promise<Detail> {
  // handle file upload as multipart/form-data if a file is present
  if (payload.file) {
    const form = new FormData();
    form.append("method_id", payload.method_id);
    form.append("name", payload.name);
    if (payload.value) form.append("value", payload.value);
    if (payload.description) form.append("description", payload.description);
    form.append("file", payload.file);
    const { data } = await api.post<Detail>("/pipeline_details/", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // normalize returned file url
    return { ...data, file_url: buildFileUrl((data as any).file_url) } as Detail;
  } else {
    const { data } = await api.post<Detail>("/pipeline_details/", {
      method_id: payload.method_id,
      name: payload.name,
      value: payload.value,
      description: payload.description,
    });
    return { ...data, file_url: buildFileUrl((data as any).file_url) } as Detail;
  }
}

// ---- Actors (if you’ve exposed an endpoint like POST /pipeline_stages/{id}/actors ) ----
export async function addActorToStage(
  stageId: string,
  payload: Omit<ResponsibleActor, "id" | "stage_id">
): Promise<ResponsibleActor> {
  const { data } = await api.post<ResponsibleActor>(`/pipeline_stages/${stageId}/actors`, payload);
  return data;
}