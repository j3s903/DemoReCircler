const variantClasses = {
  primary: 'bg-[#E8F5E9] text-[#2E7D32]',
  secondary: 'bg-blue-50 text-[#42A5F5]',
  success: 'bg-green-50 text-[#66BB6A]',
  warning: 'bg-amber-50 text-[#FFA726]',
  error: 'bg-red-50 text-[#EF5350]',
  accent: 'bg-orange-50 text-[#8D6E63]',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
};

const Badge = ({ text, variant = 'primary', size = 'sm' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold font-[Poppins] whitespace-nowrap ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.sm}`}
    >
      {text}
    </span>
  );
};

export default Badge;
