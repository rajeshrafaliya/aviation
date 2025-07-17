import React from 'react';
import Button from '../../../components/ui/Button';

const StreamTabs = ({ activeStream, onStreamChange, streams }) => {
  return (
    <div className="flex space-x-1 bg-muted p-1 rounded-lg">
      {streams.map((stream) => (
        <Button
          key={stream.id}
          variant={activeStream === stream.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onStreamChange(stream.id)}
          className="flex-1"
        >
          {stream.name}
        </Button>
      ))}
    </div>
  );
};

export default StreamTabs;