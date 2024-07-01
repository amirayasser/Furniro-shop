import React from 'react'
import { Badge } from 'react-bootstrap'

const ProdBadge = ({content , classN}) => {
  return (
    <Badge
    style={{
        top:'25px',
        right:'25px',
        color:'#fff',
        position:'absolute',
        width:'48px',
        height:'48px',
        borderRadius:'50%',
        display: `${content}` === '' ? 'none' : 'flex',
        alignItems:'center',
        justifyContent:'center',
        
    }}
      className={`${classN} ${content === 'New' ? 'bg-success' : 'bg-danger' }`}
    >
      {content}
    </Badge>
  )
}

export default ProdBadge
