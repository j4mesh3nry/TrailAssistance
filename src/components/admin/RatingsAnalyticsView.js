import React from 'react';
import { usePortal } from '../../context/PortalContext';
import { Star } from 'lucide-react';
import './styles/AdminViews.css';

export const RatingsAnalyticsView = () => {
  const { ratings, analytics } = usePortal();

  // Rating distribution counts
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  ratings.forEach(r => {
    const score = Math.round(Number(r.rating) || 5);
    if (starCounts[score] !== undefined) starCounts[score] += 1;
  });

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="tickets-management-header">
        <div>
          <h1 className="exec-title">Student Experience & Service Satisfaction</h1>
          <p className="exec-subtitle">
            Direct student sentiment analytics, counseling touchpoint evaluations, and institutional service feedback.
          </p>
        </div>
      </div>

      {/* Ratings Overview Row */}
      <div className="ratings-overview-grid">
        {/* Overall Score Box */}
        <div className="card-modern rating-hero-score-card">
          <span className="hero-score-label">Overall Experience Score</span>
          <div className="hero-score-val">
            <span>{analytics.avgRating}</span>
            <span className="hero-score-base">/ 5.0</span>
          </div>
          <div className="hero-stars-row">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={20} className="star-gold-fill" />
            ))}
          </div>
          <p className="hero-score-footer">
            Derived from <strong>{ratings.length}</strong> authenticated student ratings
          </p>
        </div>

        {/* Breakdown by Stars */}
        <div className="card-modern rating-breakdown-card">
          <h3 className="chart-title" style={{ marginBottom: '14px' }}>Rating Distribution</h3>
          <div className="star-bars-list">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = starCounts[stars] || 0;
              const percentage = ratings.length > 0 ? Math.round((count / ratings.length) * 100) : 0;
              return (
                <div key={stars} className="star-bar-row">
                  <div className="star-row-label">
                    <span>{stars}</span>
                    <Star size={12} className="star-gold-fill" />
                  </div>
                  <div className="star-bar-track">
                    <div className="star-bar-fill" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="star-bar-pct">{count} ({percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ratings Feed */}
      <div className="card-modern admin-table-card" style={{ marginTop: '24px' }}>
        <div className="table-card-header">
          <div>
            <h3 className="chart-title">Student Review Ledger & Comments</h3>
            <p className="chart-sub">Detailed evaluations with category touchpoints and timestamps</p>
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="modern-data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Touchpoint Category</th>
                <th>Rating</th>
                <th>Feedback & Praise Comments</th>
                <th>Quality Tag</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map(r => (
                <tr key={r.id}>
                  <td>
                    <div className="student-cell">
                      <span className="student-name">{r.studentName}</span>
                      <span className="student-id">{r.studentId}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-tag-cell">{r.category}</span>
                  </td>
                  <td>
                    <div className="stars-mini-display">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star 
                          key={s} 
                          size={13} 
                          className={s <= r.rating ? 'star-gold-fill' : 'star-empty'} 
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <p className="rating-feedback-text">{r.feedback}</p>
                  </td>
                  <td>
                    <span className="response-quality-chip">
                      {r.responseQuality || 'Outstanding'}
                    </span>
                  </td>
                  <td>
                    <span className="date-cell">
                      {new Date(r.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RatingsAnalyticsView;
