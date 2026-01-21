import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function PasswordInput({ value, onChange, tool }) {
  const [password, setPassword] = useState(value?.password || '');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (newPassword) => {
    setPassword(newPassword);
    onChange({ password: newPassword });
  };

  const isProtect = tool?.id === 'protect-pdf';
  const label = isProtect ? 'Set Password' : 'PDF Password';
  const placeholder = isProtect ? 'Enter password to protect PDF...' : 'Enter PDF password...';
  const description = isProtect 
    ? 'Enter the password to protect this PDF' 
    : 'Enter the password to unlock this PDF';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Lock className="w-4 h-4 inline mr-2" />
          {label}
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className="input pr-20"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-2 py-1"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}
