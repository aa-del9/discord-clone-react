export const INITIAL_USER = {
  accountid: "",
  username: "",
  email: "",
  displayName: "",
  dob: "",
};

export const INITIAL_STATE = {
  user: undefined,
  isLoading: false,
  isAuthenticated: false,
  setIsLoading: () => {},
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};
