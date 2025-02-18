


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
    <Card className="max-w-[400px] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardBody className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-base text-gray-600 leading-relaxed">{cardBody ? cardBody : 0}</p>
      </CardBody>
      <Divider className="border-gray-200" />
</Card>
  )
}

export default CustomCard
