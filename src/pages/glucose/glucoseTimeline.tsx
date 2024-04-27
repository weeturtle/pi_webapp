/* eslint-disable @typescript-eslint/no-unused-vars */
import { Chrono } from 'react-chrono';
import './glucoseTimeline.scss';

interface GlucoseEntry {
  description: string;
  date_time: string;
  glucose_level: number;
}

interface GlucoseTimelineProps {
  glucoseData: GlucoseEntry[];
}

const GlucoseTimeline = ({ glucoseData }: GlucoseTimelineProps) => {
  const formatDate = (dateString: string, glucoseLevel: number, description: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', weekday: 'long' };
    const [_, day] = dateString.split(', ');
    const [dd, mm, yy] = day.split('-').map(Number);
    const date = new Date(2000 + yy, mm - 1, dd);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return `${formattedDate} - ${glucoseLevel} (${description})`;
  };

  const getTimelineItems = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const filteredData = glucoseData.filter((entry) => {
      const [_, day] = entry.date_time.split(', ');
      const [dd, mm, yy] = day.split('-').map(Number);
      const entryDate = new Date(2000 + yy, mm - 1, dd);
      return entryDate >= oneWeekAgo;
    });

    return filteredData.map((entry) => ({
      title: formatDate(entry.date_time, entry.glucose_level, entry.description),
      cardDetailedText: entry.description,
    }));
  };

  return (
    <div className="Gluctimeline">
      <Chrono items={getTimelineItems()} mode="HORIZONTAL" />
    </div>
  );
};

export default GlucoseTimeline;