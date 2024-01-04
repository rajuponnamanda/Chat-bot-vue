// useAuth.ts

import { ref, computed, type Ref } from 'vue';

interface User {
  nickname: string;
  // Add other user properties as needed
}

interface Auth {
  isAuthenticated: Ref<boolean>;
  user: Ref<User | null>;
  loginWithRedirect: () => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<User | null>;
}

export default function useAuth(): Auth {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);

  const loginWithRedirect = async (): Promise<void> => {
    // Replace with your actual authentication logic
    isAuthenticated.value = true;
    user.value = { nickname: 'JohnDoe' };
  };

  const logout = async (): Promise<void> => {
    // Replace with your actual logout logic
    isAuthenticated.value = false;
    user.value = null;
  };

  const getUser = async (): Promise<User | null> => {
    // Replace with your actual logic to get user information
    return user.value;
  };

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    loginWithRedirect,
    logout,
    getUser,
  };
}
