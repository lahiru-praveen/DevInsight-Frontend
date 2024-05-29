import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Logo from '../../assets/Devinsight.png'
import {Link} from "react-router-dom";
import {IoIosArrowForward} from "react-icons/io";
import {IoHome} from "react-icons/io5";

export default function CodeReviewPageHeading() {
    return (
        <div className='flex items-center h-[50px] '>
            <div className="flex items-center w-1/6  mr-2">
                <img src={Logo} alt="Logo" className="w-[180px] h-[40px] m-2" />
            </div>
            <div className="flex items-center mt-2  ml-2 mr-2">
                <IoHome className="mr-1 mt-1"/>
                <IoIosArrowForward className="mr-1 mt-1"/>
                <Breadcrumb spacing='4px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/db">Dash Board</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/cp">Code Preview</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={Link} to="#">Code Review</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
    )
}
