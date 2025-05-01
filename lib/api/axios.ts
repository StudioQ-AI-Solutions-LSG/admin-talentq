import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosRequestConfig,
  } from "axios";
  //import { useAuthStore } from "@/store/auth.store";
  
  // Types
  export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
  }
  
  interface ApiErrorData {
    errors?: Record<string, string[]>;
  }
  
  interface ApiConfig extends AxiosRequestConfig {
    dataSource?: string;
  }
  
  type ErrorHandlers = {
    [key: number]: (error: AxiosError<ApiErrorData>) => Promise<never>;
  };
  
  // Error handlers map
  const errorHandlers: ErrorHandlers = {
    401: () => {
      //useAuthStore.getState().logout();
      window.location.href = "en/auth/login";
      return Promise.reject(new Error("Session expired"));
    },
    403: () => Promise.reject(new Error("Access denied")),
    404: () => Promise.reject(new Error("Resource not found")),
    422: (error) =>
      Promise.reject({
        message: "Validation failed",
        errors: error.response?.data?.errors,
      }),
    429: () => Promise.reject(new Error("Too many requests")),
    500: () => Promise.reject(new Error("Internal server error")),
  };
  
  // Factory function to create API instances
  const createApiInstance = (baseURL: string) => {
    const instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
  
    // Request interceptor
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      //const token = useAuthStore.getState().token;
      //if (token) config.headers.Authorization = `Bearer ${token}`;
  
      config.headers.Authorization = `Bearer eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.M06y7MZTKwMGzQG0YDUwCQN4FMFWGdJvQTRuDowO53oMsqVn-WOAqfJWKN2y3wybctcFT9goRgh0O1H7pNX61fbBAbemGcTj.9PortlBA6vnNgFMztPautw.MOPPdt-9_ghIxGMiu3qVNwDsApqqcnCO9Jxpax9zKufhDYn9p3rgUkGDnggMMWEmH7J0OonvqUSMG4DZFuceSpmaaTB8OH0aqiITjedMOHJFXA6NT97wy4C0QkVpUzRg4tZ-i_ZQm14jE0HBYrYpsw.NWqFsONXpqoHBB4Fy5dFO_LINjcLeEHEMtYCnsofq3Y`;

      // Add X-Data-Source header when not in production
      const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "develop";
      if (environment !== "production") {
        const dataSource = (config as any).dataSource || "develop";
        config.headers["X-Data-Source"] = dataSource;
      }
  
      return config;
    });
  
    // Response interceptor
    instance.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError<ApiErrorData>) => {
        if (!error.response) return Promise.reject(new Error("Network error"));
        return (
          errorHandlers[error.response.status] || (() => Promise.reject(error))
        )(error);
      }
    );
  
    return instance;
  };
  
  // Create API instances
  const api = createApiInstance(
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  );
  const apiV2 = createApiInstance(
    process.env.NEXT_PUBLIC_API_URL_V2 || "http://localhost:3000/api/v2"
  );
  
  // Factory function to create HTTP methods
  const createHttpMethods = (instance: ReturnType<typeof axios.create>) => ({
    get: <T>(url: string, config: ApiConfig = {}) =>
      instance.get<any, T>(url, config),
    post: <T>(url: string, data?: any, config: ApiConfig = {}) =>
      instance.post<any, T>(url, data, config),
    put: <T>(url: string, data?: any, config: ApiConfig = {}) =>
      instance.put<any, T>(url, data, config),
    patch: <T>(url: string, data?: any, config: ApiConfig = {}) =>
      instance.patch<any, T>(url, data, config),
    delete: <T = void>(url: string, config: ApiConfig = {}) =>
      instance.delete<any, T>(url, config),
  });
  
  // Create HTTP methods for each API instance
  export const http = createHttpMethods(api);
  export const httpV2 = createHttpMethods(apiV2);
  
  export default http;
  