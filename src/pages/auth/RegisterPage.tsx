import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, MapPin, Shield } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { registerUser, clearAuthError } from '../../store/authSlice';

export default function RegisterPage() {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((s) => s.auth);

  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPwd,  setShowPwd]  = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => () => { dispatch(clearAuthError()); }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim())           errs.name = 'Name is required';
    if (!formData.email.trim())          errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (formData.password.length < 6)    errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await dispatch(registerUser({ name: formData.name, email: formData.email, password: formData.password }));
    if (registerUser.fulfilled.match(result)) navigate('/dashboard');
  };

  const field = (id: string, label: string, type: string, placeholder: string, Icon: React.ElementType, extra?: React.ReactNode) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input id={id} name={id} type={type} value={(formData as any)[id]}
          onChange={handleChange} placeholder={placeholder}
          className={`w-full pl-10 pr-${extra ? '12' : '4'} py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all ${fieldErrors[id] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
        />
        {extra}
      </div>
      {fieldErrors[id] && <p className="mt-1 text-xs text-red-600">{fieldErrors[id]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-500 p-3 rounded-xl"><MapPin className="h-8 w-8 text-white" /></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Join TravelHub and start your journey</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {field('name', 'Full Name', 'text', 'Enter your full name', User)}
            {field('email', 'Email Address', 'email', 'Enter your email', Mail)}
            {field('password', 'Password', showPwd ? 'text' : 'password', 'Create a password', Lock,
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            )}
            {field('confirmPassword', 'Confirm Password', showCPwd ? 'text' : 'password', 'Confirm your password', Lock,
              <button type="button" onClick={() => setShowCPwd(!showCPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showCPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            )}

            <div className="flex items-start gap-2">
              <input type="checkbox" required id="terms" className="mt-1 rounded border-gray-300 text-primary-600" />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
              {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Shield className="h-3 w-3 text-pink-500" />
            <span>Your data is secure and encrypted</span>
          </div>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
