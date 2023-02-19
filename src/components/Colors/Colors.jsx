import { useState } from 'react';
import './Colors.css';
import colors from '../../colors.json';

const Colors = () => {
  // const [colors, setColors] = useState([
  //   //brown
  //   'rgba(76,35,12, 255)',
  //   //black
  //   'rgba(0, 0, 0, 255)',
  //   //gray
  //   'rgba(175,177,176, 255)',
  //   //beige
  //   'rgba(219,192,147,255)',
  //   //light beige
  //   'rgba(254,224,176,255)',
  //   //light blue
  //   'rgba(0,87,254,255)',
  //   //blue
  //   'rgba(20,66,200,255)',
  //   //dark beige
  //   'rgba(244,169,110,255)',
  //   //light brown
  //   'rgba(154,107,86,255)',
  //   //orange
  //   'rgba(254,150,13,255)',
  //   //light pink
  //   'rgba(254,184,201,255)',
  //   //green
  //   'rgba(36,202,123,255)',
  //   //lime green
  //   'rgba(217,221,66,255)',
  //   //purble
  //   'rgba(151,113,191,255)',
  //   //cyan
  //   'rgba(94,210,246,255)',
  //   //yellow
  //   'rgba(255,205,0,255)',
  //   //dark red
  //   'rgba(200,30,14,255)',
  //   //off white
  //   'rgba(248,234,232,255)',
  //   //red
  //   'rgba(252,51,31,255)',
  //   //pink
  //   'rgba(255,143,187,255)',
  // ]);
  const colorsEl = colors.map(color => {
    return (
      <div
        className='color'
        style={{ backgroundColor: `rgb(${color[1]},${color[2]}, ${color[3]})` }}
      />
    );
  });

  return <div className='colors-container'>{colorsEl}</div>;
};

export default Colors;
