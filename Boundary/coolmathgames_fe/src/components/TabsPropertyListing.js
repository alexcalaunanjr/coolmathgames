import React, { useState } from 'react';

function PLTabs({unitFeatures, facilities}) {
  const [activeTab, setActiveTab] = useState('unitFeatures');

  const handleTabClick = (e, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
  };

  // Function to convert comma separated string to bullet points
  function bulletPoints(list) {
    if (!list) return null;
    const items = list.split(',').map((item, index) => (
      <li key={index} className="list-disc ml-4">{item.trim()}</li>
    ));
    return <ul className="list-inside">{items}</ul>;
  }

  return (
    <div>
      <div className="flex -mb-px">
        <div className="me-2">
          <button
            className={`inline-block p-4 border-b-2 ${
              activeTab === 'unitFeatures'
                ? 'border-gray-800 dark:border-gray-300'
                : 'border-transparent text-gray-500'
            } rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300`}
            onClick={(e) => handleTabClick(e, 'unitFeatures')}
          >
            Unit Features
          </button>
        </div>
        <div className="me-2">
          <button
            className={`inline-block p-4 border-b-2 ${
              activeTab === 'facilities'
                ? 'border-gray-800 dark:border-gray-300'
                : 'border-transparent text-gray-500'
            } rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300`}
            onClick={(e) => handleTabClick(e, 'facilities')}
          >
            Facilities
          </button>
        </div>
      </div>
      {/* Render content based on activeTab */}
      {activeTab === 'unitFeatures' && 
        <div className='pt-10'>
            {bulletPoints(unitFeatures)}
        </div>
        }
      {activeTab === 'facilities' && 
        <div className='pt-10'>
            {bulletPoints(facilities)}
        </div>
        }
    </div>
  );
}

export default PLTabs;
