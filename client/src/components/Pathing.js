import React from 'react';
import {Breadcrumb} from 'semantic-ui-react';



function Pathing(props) {

  var sections = [
    { key: 'Home', content: 'Home', link: true }
  ]

  

  return (
    <div>
      <Breadcrumb sections={sections}/>
      <div style={{margin:'15px'}}/>
    </div>
  )
}

export default Pathing;