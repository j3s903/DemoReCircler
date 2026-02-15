import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Modal from './Modal';
import StarRating from './StarRating';

const RatingModal = ({ isOpen, onClose, onSubmit, itemTitle }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit?.({ rating, review });
    setSubmitted(true);
  };

  const handleClose = () => {
    setRating(0);
    setReview('');
    setSubmitted(false);
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Leave a Review">
      {submitted ? (
        <div className="flex flex-col items-center py-8 text-center">
          <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-[#4CAF50]" />
          </div>
          <h3 className="text-lg font-semibold text-[#212121] font-[Poppins] mb-1">
            Thank you!
          </h3>
          <p className="text-sm text-[#757575] font-[Poppins]">
            Your review has been submitted successfully.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {itemTitle && (
            <p className="text-sm text-[#757575] font-[Poppins]">
              How was your experience with{' '}
              <span className="font-medium text-[#212121]">{itemTitle}</span>?
            </p>
          )}

          {/* Star rating */}
          <div>
            <label className="block text-sm font-medium text-[#212121] font-[Poppins] mb-2">
              Rating
            </label>
            <StarRating
              rating={rating}
              size="lg"
              interactive
              onChange={setRating}
            />
            {rating === 0 && (
              <p className="text-xs text-[#757575] font-[Poppins] mt-1">
                Tap a star to rate
              </p>
            )}
          </div>

          {/* Review text */}
          <div>
            <label
              htmlFor="review-text"
              className="block text-sm font-medium text-[#212121] font-[Poppins] mb-2"
            >
              Review (optional)
            </label>
            <textarea
              id="review-text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#212121] placeholder-[#757575] font-[Poppins] text-sm resize-none focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={rating === 0}
            className="w-full py-3 bg-[#4CAF50] hover:bg-[#2E7D32] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold font-[Poppins] text-sm rounded-xl transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}
    </Modal>
  );
};

export default RatingModal;
