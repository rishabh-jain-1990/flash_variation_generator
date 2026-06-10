import { useApp } from '../context/useApp';
import VariationCard from './VariationCard';

export default function DailyView() {
  const { dailyVariation } = useApp();

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className="flex flex-col items-center gap-5 lg:gap-6 w-full max-w-4xl mx-auto">
      <div className="text-center">
        <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">
          Variant of the Day
        </p>
        <p className="text-xs lg:text-sm text-slate-400 dark:text-slate-500 mt-1">{dateStr}</p>
      </div>
      <VariationCard variation={dailyVariation} />
    </div>
  );
}
