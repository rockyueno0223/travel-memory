import React, { Suspense } from 'react'
import ProcessAuthClient from '@/components/login/ProcessAuthClient'

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
    <ProcessAuthClient />
  </Suspense>
  )
}

export default page
