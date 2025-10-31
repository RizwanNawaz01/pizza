
//import prisma  from '../../../utils/prisma'

import prisma from '~/server/utils/prisma' 


export default defineEventHandler(async () => {
  try {
    // Fetch all pages with their page
    
      
    const pages = await prisma.page.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return pages
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch pages',
    })
  }
})
