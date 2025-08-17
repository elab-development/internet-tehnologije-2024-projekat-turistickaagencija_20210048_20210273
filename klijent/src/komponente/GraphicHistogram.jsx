import React, {useEffect} from 'react';
import {Chart} from "react-google-charts";
import axiosInstance from "../komunikacija/axiosKomunikacija";

const GraphicHistogram = () => {

    const [data, setData] = React.useState([]);
    const options = {
        title: 'Broj putnika po aranžmanu',
        legend: { position: 'top' },
        hAxis: {
            title: 'Aranžman',
            minValue: 0,
        },
        vAxis: {
            title: 'Broj putnika',
            minValue: 0,
        },
        histogram: {
            lastBucketPercentile: 5,
            bucketSize: 1,
        },
    }

    useEffect(() => {
        axiosInstance.get('/grupisano').then(res => {

            if (res.data.uspesno === true) {
                const fetchedData = res.data.podaci;
                const formattedData = [['Aranžman', 'Broj putnika']];

                fetchedData.forEach(item => {
                    formattedData.push([item.nazivAranzmana, item.broj_putnika]);
                });

                setData(formattedData);
            } else {
                console.error("Greška prilikom dohvaćanja podataka:", res.statusText);
            }
        })
    }, []);


    return (
        <>
            <Chart
                chartType="Histogram"
                width="100%"
                height="100%"
                data={data}
                options={options}
            />
        </>
    );
};

export default GraphicHistogram;
