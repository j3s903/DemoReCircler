import { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const typeConfig = {
  success: {
    bg: 'bg-[#66BB6A]',
    icon: CheckCircle,
    label: 'Success',
  },
  error: {
    bg: 'bg-[#EF5350]',
    icon: XCircle,
    label: 'Error',
  },
  warning: {
    bg: 'bg-[#FFA726]',
    icon: AlertTriangle,
    label: 'Warning',
  },
  info: {
    bg: 'bg-[#42A5F5]',
    icon: Info,
    label: 'Info',
  },
};

const Toast = ({ show, message, type = 'info', onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const config = typeConfig[type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`${config.bg} text-white rounded-xl shadow-lg px-5 py-4 flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        <IconComponent className="w-5 h-5 shrink-0" />
        <p className="text-sm font-medium font-[Poppins] flex-1">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 hover:bg-white/20 rounded-lg p-1 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
