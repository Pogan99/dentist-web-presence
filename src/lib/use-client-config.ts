import { clientConfig, type DentistConfig } from "@/client-config";

export function useClientConfig(): DentistConfig {
  return clientConfig;
}
