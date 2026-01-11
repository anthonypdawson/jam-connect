const API_BASE_URL = 'http://localhost:4000';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  // Basic demographics
  age?: number;
  gender?: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY';
  // Location
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  // Profile content
  bio?: string;
  avatarUrl?: string;
  website?: string;
  socialLinks?: Record<string, string>; // {instagram: "...", soundcloud: "..."}
  // Musical info
  musicalInfluences?: string;
  collaborationStyle?: string;
  genres?: string[]; // ["rock", "jazz", "electronic"]
  // Relations (will be populated when needed)
  instruments?: UserInstrument[];
  // Platform metadata
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
  isVerified: boolean;
  preferences?: Record<string, any>;
}

export interface UserInstrument {
  id: number;
  instrument: string;
  experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL';
  yearsExperience?: number;
  createdAt: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || `HTTP ${response.status}: ${response.statusText}` };
      }

      return { data };
    } catch (error) {
      return { error: 'Network error. Please try again.' };
    }
  }

  async signUp(userData: SignUpData): Promise<ApiResponse<{ message: string }>> {
    return this.request('/api/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginData): Promise<ApiResponse<{ user: User }>> {
    return this.request('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
}

export const apiClient = new ApiClient();