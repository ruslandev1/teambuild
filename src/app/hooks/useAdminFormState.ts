import { useEffect, useState } from "react";

/**
 * Local form state for admin pages. Re-syncs from `source` when the API
 * finishes loading or when saved content is refreshed from the server.
 */
export function useAdminFormState<T>(source: T, isLoading: boolean) {
  const [state, setState] = useState(source);

  useEffect(() => {
    if (!isLoading) {
      setState(source);
    }
  }, [isLoading, source]);

  return [state, setState] as const;
}
