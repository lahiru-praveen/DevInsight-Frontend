import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import logo from '../../assets/Devinsight.png'

export default function CodeReviewPageHeading() {
    return (
        <div className='flex items-center h-[50px] '>
            <div className="flex items-center w-1/6  mr-2">
                <img src={logo} alt="Logo" className="w-[180px] h-[40px] m-2" />
            </div>
            <div className="flex items-center mt-2  ml-2 mr-2">
                <Breadcrumb spacing='4px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/db'>Dash Board</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href='/cp'>Code Preview</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
    )
}
