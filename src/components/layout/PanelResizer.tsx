import React from 'react';

interface PanelResizerProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onDoubleClick?: () => void;
  isDragging?: boolean;
  title?: string;
}

export const PanelResizer: React.FC<PanelResizerProps> = ({
  onMouseDown,
  onDoubleClick,
  isDragging = false,
  title = "Arraste para redimensionar (clique duplo para redefinir)"
}) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      title={title}
      className={`relative w-1 hover:w-1.5 shrink-0 cursor-col-resize select-none transition-all flex items-center justify-center z-20 group ${
        isDragging 
          ? 'bg-[#121110] w-1.5 shadow-sm ring-1 ring-[#946f19]' 
          : 'bg-[#e5e5e2] hover:bg-[#946f19]'
      }`}
    >
      {/* Invisible expanded hit-zone (8px wide) for easy cursor grab */}
      <div className="absolute inset-y-0 -left-1 -right-1 cursor-col-resize z-10" />

      {/* Visual grip indicator pill */}
      <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex flex-col space-y-1 items-center z-20 pointer-events-none ${
        isDragging ? 'opacity-100' : ''
      }`}>
        <div className={`w-1 h-6 rounded-full shadow-xs ${isDragging ? 'bg-[#d4a359]' : 'bg-[#946f19]'}`} />
      </div>
    </div>
  );
};

