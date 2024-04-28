import { Chrono } from 'react-chrono';
import './glucoseTimeline.scss';

interface GlucoseEntry {
  description: string;
  date_time: string;
  glucose_level: number;
}

/*interface TimelineEntry {
  title: string;
  cardDetailedText: string;
}*/


interface GlucoseTimelineProps {
  glucoseData: GlucoseEntry[];
}

const GlucoseTimeline = ({ glucoseData }: GlucoseTimelineProps) => {
  const formatDate = (dateString: string, glucoseLevel: number) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', weekday: 'long', month: 'long' };
    const dayWithSuffix = date.toLocaleString('en-US', { day: 'numeric' }) + getDaySuffix(date.getDate());
    const formattedDate = date.toLocaleDateString('en-US', options).replace(/\d+/, dayWithSuffix);
    return `${formattedDate}, Glucose: ${glucoseLevel}`;
  };

  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
    }
  };

  const getTimelineItems = () => {
    const sortedData = [...glucoseData].sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime());
    //10 most recent ones
    const recentEntries = sortedData.slice(0, 10);
    console.log('10 Most Recent Glucose Entries:', recentEntries);

    const timelineItems = recentEntries.map((entry) => ({
      title: formatDate(entry.date_time, entry.glucose_level),
      cardDetailedText: entry.description
    }));

    console.log('Timeline Items:', timelineItems);

    return timelineItems;
  };

  /*const testTimelineData: TimelineEntry[] = [
    { title: 'Saturday, April 27th, Glucose: 6.8', cardDetailedText: 'Random glucose reading' },
    { title: 'Saturday, April 27th, Glucose: 4.8', cardDetailedText: 'Random glucose reading' },
    { title: 'Saturday, April 27th, Glucose: 9.4', cardDetailedText: 'Random glucose reading' },
    { title: 'Saturday, April 27th, Glucose: 8.5', cardDetailedText: 'Random glucose reading' },
    { title: 'Saturday, April 27th, Glucose: 8.3', cardDetailedText: 'Random glucose reading' },
    { title: 'Saturday, April 27th, Glucose: 8.5', cardDetailedText: 'Random glucose reading' },
    { title: 'Saturday, April 27th, Glucose: 9.1', cardDetailedText: 'Random glucose reading' },
    { title: 'Saturday, April 27th, Glucose: 9.1', cardDetailedText: 'Random glucose reading' },
    { title: 'Saturday, April 27th, Glucose: 5.8', cardDetailedText: 'Random glucose reading' },
    { title: 'Friday, April 26th, Glucose: 9.3', cardDetailedText: 'Random glucose reading' }
  ];*/

  return (
    <div className="Gluctimeline">
      <Chrono items={getTimelineItems() /*testTimelineData*/} mode="HORIZONTAL" />
    </div>
  );
};

export default GlucoseTimeline;