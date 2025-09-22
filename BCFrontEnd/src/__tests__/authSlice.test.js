import authSlice, { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError 
} from '../store/slices/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  test('should return initial state', () => {
    expect(authSlice(undefined, {})).toEqual(initialState);
  });

  test('should handle loginStart', () => {
    const action = loginStart();
    const state = authSlice(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('should handle loginSuccess', () => {
    const mockPayload = {
      user: { id: 1, email: 'test@example.com' },
      token: 'mock-token'
    };
    
    const action = loginSuccess(mockPayload);
    const state = authSlice(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockPayload.user);
    expect(state.token).toBe(mockPayload.token);
  });

  test('should handle loginFailure', () => {
    const errorMessage = 'Login failed';
    const action = loginFailure(errorMessage);
    const state = authSlice(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('should handle logout', () => {
    const loggedInState = {
      user: { id: 1, email: 'test@example.com' },
      token: 'mock-token',
      isAuthenticated: true,
      loading: false,
      error: null,
    };
    
    const action = logout();
    const state = authSlice(loggedInState, action);
    
    expect(state.user).toBe(null);
    expect(state.token).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });

  test('should handle clearError', () => {
    const errorState = {
      ...initialState,
      error: 'Some error'
    };
    
    const action = clearError();
    const state = authSlice(errorState, action);
    
    expect(state.error).toBe(null);
  });
});