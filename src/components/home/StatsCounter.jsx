import { useEffect, useState, useRef } from 'react';
import { FileCheck, TrendingUp, Clock } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import { useStats } from '../../hooks/useStats';

function AnimatedCounter({ value, duration = 2000 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);

  useEffect(() => {
    const startValue = previousValue.current;
    const difference = value - startValue;
    const startTime = performance.now();

    const animateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(startValue + difference * easeOutExpo);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      } else {
        previousValue.current = value;
      }
    };

    requestAnimationFrame(animateValue);
  }, [value, duration]);

  return <span className="counter">{formatNumber(displayValue)}</span>;
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          <AnimatedCounter value={value} />
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const { stats, loading } = useStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-4 flex items-center gap-4">
            <div className="skeleton w-12 h-12 rounded-xl" />
            <div>
              <div className="skeleton h-6 w-20 mb-2 rounded" />
              <div className="skeleton h-4 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={FileCheck}
        label="Files Converted Today"
        value={stats.todayCount}
        color="bg-gradient-to-br from-primary-500 to-primary-600"
      />
      <StatCard
        icon={TrendingUp}
        label="Total Conversions"
        value={stats.totalCount}
        color="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard
        icon={Clock}
        label="Avg Processing Time"
        value={stats.avgTime}
        color="bg-gradient-to-br from-accent to-accent-light"
      />
    </div>
  );
}
