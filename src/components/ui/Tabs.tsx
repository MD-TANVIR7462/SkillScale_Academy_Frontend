import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  className
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      setActiveTab(tabId);
      onChange?.(tabId);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  const getTabClasses = (tab: Tab) => {
    const baseClasses = 'flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-200';
    
    if (variant === 'pills') {
      return cn(
        baseClasses,
        'rounded-lg',
        tab.disabled 
          ? 'text-gray-400 cursor-not-allowed'
          : activeTab === tab.id
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      );
    }
    
    if (variant === 'underline') {
      return cn(
        baseClasses,
        'border-b-2 rounded-none',
        tab.disabled
          ? 'text-gray-400 cursor-not-allowed border-transparent'
          : activeTab === tab.id
            ? 'text-blue-600 border-blue-600'
            : 'text-gray-600 hover:text-blue-600 border-transparent hover:border-gray-300'
      );
    }

    return cn(
      baseClasses,
      'border border-gray-200 first:rounded-l-lg last:rounded-r-lg -ml-px first:ml-0',
      tab.disabled
        ? 'text-gray-400 cursor-not-allowed bg-gray-50'
        : activeTab === tab.id
          ? 'bg-blue-600 text-white border-blue-600 z-10'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 bg-white'
    );
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'flex',
        variant === 'underline' ? 'border-b border-gray-200' : ''
      )}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={getTabClasses(tab)}
            disabled={tab.disabled}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;