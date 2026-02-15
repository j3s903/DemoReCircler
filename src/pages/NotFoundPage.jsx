import { Link } from 'react-router-dom';
import { Leaf, Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-light mb-4">
            <Leaf className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-primary-dark mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Page Not Found</h2>
          <p className="text-text-secondary leading-relaxed">
            Looks like this item has already been recycled! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            to="/browse"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary-light transition-colors"
          >
            <Search className="h-4 w-4" />
            Browse Items
          </Link>
        </div>

        <p className="mt-8 text-sm text-text-secondary">
          If you think this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  );
}
