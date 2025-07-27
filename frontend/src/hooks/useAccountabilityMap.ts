// src/hooks/useAccountabilityMap.ts
import { useState, useEffect } from "react";
import type { Stage, Method, Detail } from "../types";
import * as service from "../services/accountabilityService";

export function useAccountabilityMap() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [details, setDetails] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const fetchedStages = await service.fetchStages();
        setStages(fetchedStages);

        const fetchedMethods = await service.fetchMethods();
        setMethods(fetchedMethods);

        const detailsArrays = await Promise.all(
          fetchedMethods.map((m) => service.fetchDetailsByMethod(m.id))
        );
        setDetails(detailsArrays.flat());
      } catch (err) {
        setError("Failed to load accountability map data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { stages, methods, details, loading, error };
}

export {};
