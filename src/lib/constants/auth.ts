export const INITIAL_USER = {
  accountid: "",
  username: "",
  email: "",
  displayName: "",
  dob: "",
};

export const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setIsLoading: () => {},
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};
