const envs = import.meta.env;

export default {
  baseApiUrl: envs.VITE_BASE_API_URL,
  public_key:envs.VITE_PUBLIC_API_KEY,
  private_key:envs.VITE_PRIVATE_API_KEY
};