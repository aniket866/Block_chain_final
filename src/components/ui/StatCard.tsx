
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, isLoading = false }) => {
  const isTrendPositive = trend && trend > 0;
  const trendAbs = trend ? Math.abs(trend) : 0;
  
  return (
    <div className="crypto-card h-full">
      <div className="flex justify-between items-start">
        <div className="rounded-xl bg-primary/10 p-3">
          {icon}
        </div>
        
        {trend !== undefined && (
          <div className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            isTrendPositive 
              ? 'bg-green-500/10 text-green-500' 
              : 'bg-red-500/10 text-red-500'
          }`}>
            {isTrendPositive 
              ? <ArrowUp className="h-3 w-3 mr-1" />
              : <ArrowDown className="h-3 w-3 mr-1" />
            }
            {trendAbs}%
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        {isLoading ? (
          <div className="h-7 bg-secondary animate-pulse rounded mt-1"></div>
        ) : (
          <p className="text-2xl font-bold mt-1">{value}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
