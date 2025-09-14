// Utility functions for onboarding data management

export interface OnboardingData {
  theme: 'light' | 'dark';
  personalDetails: {
    name: string;
    age: number;
    email: string;
  };
  referralSource: string;
  persona: string;
  pricingPlan: string;
}

export interface OnboardingResponse {
  success: boolean;
  data?: {
    message: string;
    userId: string;
    status: string;
    _id?: string;
    theme?: string;
    personalDetails?: {
      name: string;
      age: number;
      email: string;
    };
    referralSource?: string;
    persona?: string;
    pricingPlan?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  errors?: any[];
  message?: string;
}

/**
 * Submit onboarding data to the backend
 */
export const submitOnboardingData = async (data: OnboardingData): Promise<OnboardingResponse> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  
  const response = await fetch(`${API_BASE_URL}/api/onboarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit onboarding data');
  }
  
  return result;
};

/**
 * Retrieve onboarding data by user ID
 */
export const getOnboardingData = async (userId: string): Promise<OnboardingResponse> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  
  const response = await fetch(`${API_BASE_URL}/api/onboarding/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.message || 'Failed to retrieve onboarding data');
  }
  
  return result;
};

/**
 * Get stored onboarding profile ID from localStorage
 */
export const getStoredProfileId = (): string | null => {
  return localStorage.getItem('onboardingProfileId');
};

/**
 * Store onboarding profile ID in localStorage
 */
export const storeProfileId = (profileId: string): void => {
  localStorage.setItem('onboardingProfileId', profileId);
};

/**
 * Clear stored onboarding data
 */
export const clearStoredOnboardingData = (): void => {
  localStorage.removeItem('onboardingProfileId');
};
