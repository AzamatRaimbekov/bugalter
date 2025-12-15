import React from 'react';
import { ServiceCategory } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceCategory;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const isHighlight = service.highlight;

  return (
    <div 
      className={`
        group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-md
        ${isHighlight 
          ? 'bg-gradient-to-br from-brand-900/90 to-brand-800/90 border-2 border-brand-gold/30 shadow-brand-gold/10' 
          : 'bg-slate-800/40 border border-slate-700/50 hover:border-brand-500/50 hover:bg-slate-800/60'}
      `}
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className={`
          mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg shadow-lg
          ${isHighlight ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-500/10 text-brand-500'}
        `}>
          <service.icon size={24} />
        </div>

        <h3 className={`mb-3 text-xl font-serif font-bold ${isHighlight ? 'text-white' : 'text-slate-100'}`}>
          {service.title}
        </h3>
        
        <p className="mb-6 text-sm text-slate-300 leading-relaxed">
          {service.description}
        </p>

        <ul className="mt-auto space-y-3">
          {service.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300/90">
              <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${isHighlight ? 'text-brand-gold' : 'text-brand-500'}`} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl transition-all duration-500 group-hover:bg-brand-500/20" />
      {isHighlight && <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl" />}
    </div>
  );
};