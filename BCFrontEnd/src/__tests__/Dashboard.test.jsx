import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../components/Dashboard';
import authSlice from '../store/slices/authSlice';
import companySlice from '../store/slices/companySlice';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      company: companySlice,
    },
    preloadedState: initialState
  });
};

const renderWithProviders = (component, initialState) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('Dashboard Component', () => {
  const mockUser = {
    id: 1,
    full_name: 'Test User',
    email: 'test@example.com',
    is_email_verified: true,
    is_mobile_verified: true
  };

  test('renders welcome message with user name', () => {
    const initialState = {
      auth: {
        user: mockUser,
        isAuthenticated: true,
        token: 'mock-token'
      },
      company: {
        profile: null,
        loading: false
      }
    };

    renderWithProviders(<Dashboard />, initialState);
    
    expect(screen.getByText('Welcome, Test User!')).toBeInTheDocument();
  });

  test('shows company registration prompt when no profile exists', () => {
    const initialState = {
      auth: {
        user: mockUser,
        isAuthenticated: true,
        token: 'mock-token'
      },
      company: {
        profile: null,
        loading: false
      }
    };

    renderWithProviders(<Dashboard />, initialState);
    
    expect(screen.getByText('Complete your company registration to get started.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register company/i })).toBeInTheDocument();
  });

  test('displays company information when profile exists', () => {
    const mockCompany = {
      company_name: 'Test Company',
      industry: 'Technology',
      city: 'Mumbai',
      state: 'Maharashtra'
    };

    const initialState = {
      auth: {
        user: mockUser,
        isAuthenticated: true,
        token: 'mock-token'
      },
      company: {
        profile: mockCompany,
        loading: false
      }
    };

    renderWithProviders(<Dashboard />, initialState);
    
    expect(screen.getByText('Company: Test Company')).toBeInTheDocument();
    expect(screen.getByText('Industry: Technology')).toBeInTheDocument();
    expect(screen.getByText('Location: Mumbai, Maharashtra')).toBeInTheDocument();
  });

  test('shows verification status', () => {
    const initialState = {
      auth: {
        user: mockUser,
        isAuthenticated: true,
        token: 'mock-token'
      },
      company: {
        profile: null,
        loading: false
      }
    };

    renderWithProviders(<Dashboard />, initialState);
    
    expect(screen.getByText('Email: ✅ Verified')).toBeInTheDocument();
    expect(screen.getByText('Mobile: ✅ Verified')).toBeInTheDocument();
  });
});