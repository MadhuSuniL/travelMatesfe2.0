import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import InteractionTabs from "../../components/interactions/InteractionTabs";

const Interactions =()=> {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
 
  return (
      <div className='max-w-[850px] mx-auto pt-1 px-1'>
        <InteractionTabs/>
      </div>
  );
}

export default Interactions