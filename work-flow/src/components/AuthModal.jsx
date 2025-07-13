const Auth = ({
  showModal,
  setShowModal,
  isLogin,
  setIsLogin,
  email,
  setEmail,
  password,
  setPassword,
  errors,
  setErrors,
  handleSubmit,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-lg z-50 animate-fadeIn">
      <div className="relative bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/20 animate-slideUp">
        {/* Animated background elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 animate-slideDown">
              {isLogin ? 'Welcome Back' : 'Join Workflow'}
            </h2>
            <p className="text-gray-600 text-sm animate-slideDown delay-100">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="animate-slideUp delay-200">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: '' });
                }}
                className="block w-full bg-white/80 backdrop-blur-sm border border-gray-200 p-3 rounded-xl 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent transition-all duration-300 hover:bg-white/90
                         focus:scale-[1.02] transform"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 animate-slideDown">{errors.email}</p>
              )}
            </div>

            <div className="animate-slideUp delay-300">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
                className="block w-full bg-white/80 backdrop-blur-sm border border-gray-200 p-3 rounded-xl 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent transition-all duration-300 hover:bg-white/90
                         focus:scale-[1.02] transform"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 animate-slideDown">{errors.password}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl 
                       font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 
                       transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] animate-slideUp delay-400
                       relative overflow-hidden group"
            >
              <span className="relative z-10">{isLogin ? 'Sign In' : 'Create Account'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="text-center animate-slideUp delay-500">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300 
                         hover:underline underline-offset-4"
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>

            <button
              onClick={() => {
                setShowModal(false);
                setEmail('');
                setPassword('');
                setErrors({});
              }}
              className="w-full text-gray-500 hover:text-gray-700 transition-all duration-300 
                       py-2 rounded-xl hover:bg-gray-100/50 animate-slideUp delay-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Auth;
