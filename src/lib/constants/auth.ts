export const INITIAL_USER = {
  $id: "",
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
  isInvite: false,
  setIsInvite: () => {},
};
