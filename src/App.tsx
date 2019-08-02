//@format
import React, {useState, useEffect} from 'react';
import Map from './Map';
import Menu from './Menu';

function getPortrait() {
  const {innerWidth: width, innerHeight: height} = window;
  return height > width ? true : false;
}

const App: React.FC = () => {
  const [portrait, setPortrait] = useState(getPortrait);
    const [selection, setSelection] = useState<{type: string, id: number}>({type: 'all', id: 0})
  useEffect(() => {
    function handleResize() {
      setPortrait(getPortrait());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    // div that takes up all
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: portrait ? 'column' : 'row'
      }}>
      {/*menu - whether horizontal overlay or vertical side bar depends on orientation. order > 10 to place after, < 10 to place before*/}
      <Menu
          portrait={portrait}
          selection={selection}
          setSelection={setSelection}
      />
      {/*map - order = 10*/}
      <Map
          selection={selection}
          setSelection={setSelection}
      />
    </div>
  );
};

export default App;
