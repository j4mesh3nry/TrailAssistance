import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { Star, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import './styles/StudentViews.css';

export const WebsiteFeedbackView = () => {
  const { activeUser, handleSubmitRating } = usePortal();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("Dean's Office Walk-in Assistance");
  const [feedback, setFeedback] = useState('');
  const [selectedPraise, setSelectedPraise] = useState(['Fast Response', 'Clear Explanations']);
  const [submitted, setSubmitted] = useState(false);

  const praiseTags = [
    'Fast Response',
    'Clear Explanations',
    'Supportive Staff',
    'Efficient Clearance',
    'Intuitive Portal UI',
    'Helpful Dean Advising'
  ];

  const togglePraise = (tag) => {
    if (selectedPraise.includes(tag)) {
      setSelectedPraise(selectedPraise.filter(t => t !== tag));
    } else {
      setSelectedPraise([...selectedPraise, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    handleSubmitRating({
      studentName: activeUser?.name || 'Alex Morgan',
      studentEmail: activeUser?.email || 'alex.morgan@demo.edu',
      studentId: activeUser?.studentId || '2024-10492',
      rating,
      category,
      feedback: `${feedback.trim()} [Tags: ${selectedPraise.join(', ')}]`
    });

    setSubmitted(true);
  };

  return (
    <div className="student-view-container">
      <div className="feedback-page-header">
        <h1 className="tickets-page-title">Service Quality & Portal Feedback</h1>
        <p className="tickets-page-sub">
          Help the Office of the Dean continuously optimize academic counseling and student assistance workflows.
        </p>
      </div>

      <div className="feedback-card-container">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="card-modern feedback-form-card">
            {/* Star Rating Section */}
            <div className="star-rating-block">
              <label className="feedback-block-label">Overall Service Satisfaction</label>
              <div className="stars-row">
                {[1, 2, 3, 4, 5].map(star => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${isFilled ? 'filled' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star size={32} />
                    </button>
                  );
                })}
              </div>
              <span className="rating-score-caption">
                {rating === 5 && 'Outstanding - Exceeded Expectations'}
                {rating === 4 && 'Very Good - Helpful & Efficient'}
                {rating === 3 && 'Satisfactory - Standard Service'}
                {rating === 2 && 'Needs Improvement - Experienced Delays'}
                {rating === 1 && 'Unsatisfactory'}
              </span>
            </div>

            {/* Assistance Category */}
            <div className="form-field-group" style={{ marginTop: '20px' }}>
              <label className="field-label">Assistance Touchpoint</label>
              <select
                className="select-modern"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Dean's Office Walk-in Assistance">Dean's Office Walk-in Assistance</option>
                <option value="Academic Advising Consultation">Academic Advising Consultation</option>
                <option value="Financial Aid Hardship Review">Financial Aid Hardship Review</option>
                <option value="Graduation Clearance Processing">Graduation Clearance Processing</option>
                <option value="Portal Usability & Self-Service">Portal Usability & Self-Service</option>
              </select>
            </div>

            {/* Praise Tags */}
            <div className="form-field-group" style={{ marginTop: '20px' }}>
              <label className="field-label">What went well? (Select all that apply)</label>
              <div className="praise-tags-cloud">
                {praiseTags.map(tag => {
                  const isSelected = selectedPraise.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      className={`praise-tag-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => togglePraise(tag)}
                    >
                      <Sparkles size={13} />
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Narrative Feedback */}
            <div className="form-field-group" style={{ marginTop: '20px' }}>
              <label className="field-label">
                Detailed Comments & Suggestions <span className="req">*</span>
              </label>
              <textarea
                className="input-modern"
                rows={4}
                required
                placeholder="Share your thoughts on the counseling responsiveness, clarity of instructions, or ideas for improving university services..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
            </div>

            <div className="form-actions-bar right-only" style={{ marginTop: '24px' }}>
              <button type="submit" className="btn-primary">
                <Send size={16} />
                <span>Submit Evaluation</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="card-modern feedback-success-card">
            <div className="success-icon-bubble">
              <CheckCircle2 size={44} />
            </div>
            <h2>Thank You for Your Feedback!</h2>
            <p>
              Your rating of <strong>{rating} / 5 Stars</strong> has been submitted to the Academic Affairs Quality Assurance Committee.
            </p>
            <div className="feedback-thank-actions">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setSubmitted(false);
                  setFeedback('');
                }}
              >
                Submit Another Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteFeedbackView;
