import { clientConfig, type ClientConfig } from "@/client-config";

export function useClientConfig(): ClientConfig {
  return clientConfig;
}
