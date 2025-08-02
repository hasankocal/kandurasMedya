import React, { useEffect, useState } from 'react';
import { usePerformance } from '../../hooks/usePerformance';

interface PerformanceMonitorProps {
  showInProduction?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  showInProduction = false 
}) => {
  const { getMetrics, logMetrics } = usePerformance();
  const [metrics, setMetrics] = useState(getMetrics());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sadece development ortamında göster
    if (import.meta.env.PROD && !showInProduction) {
      return;
    }

    const interval = setInterval(() => {
      setMetrics(getMetrics());
    }, 1000);

    return () => clearInterval(interval);
  }, [getMetrics, showInProduction]);

  useEffect(() => {
    // 3 saniye sonra göster
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || (import.meta.env.PROD && !showInProduction)) {
    return null;
  }

  const getScore = (value: number | null, thresholds: { good: number; needsImprovement: number }) => {
    if (value === null) return 'N/A';
    if (value <= thresholds.good) return '🟢';
    if (value <= thresholds.needsImprovement) return '🟡';
    return '🔴';
  };

  const getLcpScore = (lcp: number | null) => getScore(lcp, { good: 2500, needsImprovement: 4000 });
  const getFidScore = (fid: number | null) => getScore(fid, { good: 100, needsImprovement: 300 });
  const getClsScore = (cls: number | null) => getScore(cls, { good: 0.1, needsImprovement: 0.25 });

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Core Web Vitals</h3>
        <button
          onClick={logMetrics}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Console
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">LCP:</span>
          <div className="flex items-center space-x-2">
            <span>{getLcpScore(metrics.lcp)}</span>
            <span className="font-mono">
              {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">FID:</span>
          <div className="flex items-center space-x-2">
            <span>{getFidScore(metrics.fid)}</span>
            <span className="font-mono">
              {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">CLS:</span>
          <div className="flex items-center space-x-2">
            <span>{getClsScore(metrics.cls)}</span>
            <span className="font-mono">
              {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">FCP:</span>
          <span className="font-mono">
            {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">TTFB:</span>
          <span className="font-mono">
            {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          🟢 Good | 🟡 Needs Improvement | 🔴 Poor
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor; 