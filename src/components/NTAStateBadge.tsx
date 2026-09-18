import React from 'react';
import { QuestionStatus } from '../types';
import { Check } from 'lucide-react';

interface NTAStateBadgeProps {
  status: QuestionStatus;
  label: string | number;
  isSelected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  title?: string;
}

export const NTAStateBadge: React.FC<NTAStateBadgeProps> = ({
  status,
  label,
  isSelected = false,
  size = 'md',
  onClick,
  className = '',
  title,
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs sm:text-sm font-semibold',
    lg: 'w-11 h-11 text-base font-bold',
  }[size];

  // Official NTA JEE Main colors & shapes
  const getShapeAndColor = () => {
    switch (status) {
      case 'ANSWERED':
        return {
          bg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
          shape: 'rounded-b-xl rounded-t-sm',
          border: 'border-b-2 border-emerald-800',
        };
      case 'NOT_ANSWERED':
        return {
          bg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
          shape: 'rounded-t-xl rounded-b-sm',
          border: 'border-t-2 border-rose-800',
        };
      case 'MARKED_FOR_REVIEW':
        return {
          bg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm',
          shape: 'rounded-full',
          border: 'border border-purple-800',
        };
      case 'ANSWERED_AND_MARKED':
        return {
          bg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm relative',
          shape: 'rounded-full',
          border: 'border border-purple-800',
        };
      case 'NOT_VISITED':
      default:
        return {
          bg: 'bg-white hover:bg-slate-100 text-slate-800 shadow-sm',
          shape: 'rounded-md',
          border: 'border border-slate-300',
        };
    }
  };

  const styling = getShapeAndColor();

  return (
    <button
      type="button"
      id={`palette-btn-${label}`}
      onClick={onClick}
      title={title}
      className={`
        relative inline-flex items-center justify-center transition-transform active:scale-95 focus:outline-none select-none
        ${sizeClasses}
        ${styling.shape}
        ${styling.bg}
        ${styling.border}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white font-black scale-105 z-10' : ''}
        ${className}
      `}
    >
      <span className="leading-none">{label}</span>

      {/* Answered and Marked for review has the official small green checkmark / indicator in bottom-right */}
      {status === 'ANSWERED_AND_MARKED' && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center ring-1 ring-white"
          title="Answered & Marked for Review"
        >
          <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
        </span>
      )}
    </button>
  );
};
