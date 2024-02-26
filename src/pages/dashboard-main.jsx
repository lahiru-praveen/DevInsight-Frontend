import PreviousSubmissionRight1 from "../components/dashboard/previous-submission-navbar.jsx";
import { Grid, GridItem } from '@chakra-ui/react';

function DashboardMain() {
    return (
        <>
            <Grid
                templateAreas={`"header header"
                        "nav main"
                        "footer footer"`}
                gridTemplateRows={'50px 1fr 30px'}
                gridTemplateColumns={'250px 1fr'} // Using relative units for responsiveness
                h='100vh'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
            >
                <GridItem pl='2' bg='orange.300' area={'header'}>
                    Header
                </GridItem>
                <GridItem pl='2' bg='green.300' area={'nav'}>
                    <PreviousSubmissionRight1 />
                </GridItem>
                <GridItem pl='2' bg='blue.300' area={'main'}>
                    Main
                </GridItem>
                <GridItem pl='2' bg='blue.300' area={'footer'}>
                    Footer
                </GridItem>
            </Grid>
        </>
    );
}

export default DashboardMain;
