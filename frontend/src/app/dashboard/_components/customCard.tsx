


import { Card, CardHeader, Divider, CardBody, CardFooter } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

function CustomCard({
  cardBody ,
  title
} : {
  cardBody :string , 
  title : string
}) {
  
  return (
    <Card className="max-w-[400px]">
      <CardBody>
       <h3>{title}</h3>
      <p>{cardBody}</p>
     </CardBody>
    <Divider />

  </Card>
  )
}

export default CustomCard
