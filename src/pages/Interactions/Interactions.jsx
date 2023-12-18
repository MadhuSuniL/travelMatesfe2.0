import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import InteractionTabs from "../../components/interactions/InteractionTabs";

const Interactions =()=> {
 
  return (
      <div className='max-w-[850px] mx-auto pt-1 px-1'>
        <InteractionTabs/>
      </div>
  );
}

export default Interactions