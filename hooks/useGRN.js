import { useState } from 'react';
import { toast } from '../utils';

const useGRN = () => {
  const [grnItems, setGrnItems] = useState([]);

  const addToGRN = article => {
    const index = grnItems.findIndex(
      item => item.po && item.material === article.po && article.material,
    );

    if (index === -1) {
      let message = 'Item added successfully';
      toast(message);
      setGrnItems([...grnItems, article]);
    } else {
      let message = 'Item updated successfully';
      toast(message);
      const newItems = [...grnItems];
      newItems[index] = {...article};
      setGrnItems(newItems);
    }
  };

  console.log('GRN items', grnItems, grnItems.length);

  const GRNInfo = {
    grnItems,
    setGrnItems,
    addToGRN,
  };

  return GRNInfo;
};

export default useGRN;
