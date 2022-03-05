import "../../styles/tables.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState, useContext, useRef } from "react"
import TokenContext from "../../store/store"
import axios from "axios"

import { backendurl } from "../../env"
// Chart js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  
  
async function getRates(url) {
    try {
        const exchange = await axios.get(url )
        return exchange.data.rates
    }
    catch (err) {
        console.log(err)
    }
}

async function getIP(url)
 {
    try {
        const res = await axios.get(url)
        return res.data
    }
    catch (err) {
        console.log(err)
    }
 }

async function postIP(token, data)
 {
    try {
        const res = await axios.post(backendurl+'/getIpDetails',data)
        return res.data
    }
    catch (err) {
        console.log(err)
    }
 }

const DashboardPage = () => {
    const TokenCxt = useContext(TokenContext);
    const token = TokenCxt.token
    const [usRates, setUSRates] = useState([])
    const [euRates, setEURates] = useState([])
    const [labels, setLabels] = useState([])
    const [ipDet, setIPDet] = useState([])
    const [findIPDet, setFindIPDet] = useState([])
    const [showMore, setShowMore] = useState(false)
    const [showIPDet, setShowIPDet] = useState(false)

    const ipRef = useRef();
    
    const getIpDetails = async e => {
        e.preventDefault();
        const ip = ipRef.current.value;
        const det = await postIP(token, {ip: ip})
        setShowIPDet(true)
        setFindIPDet(det.data)
        console.log(det)
    }

    const showMorefn = () => {
        setShowMore(!showMore)
    }

    useEffect(() => {
        const getFunction = async () => {
            const ipdetails = await getIP('https://geolocation-db.com/json/')
            console.log(ipdetails)
            setIPDet(ipdetails)
            const usexchangeRatesFromServer = await getRates("https://api.exchangerate.host/latest?symbols=USD,EUR,CZK,AED,INR,HKD,AUD,CNY,QAR,PHP,PKR,TRY,WST&base=USD");
            const euexchangeRatesFromServer = await getRates("https://api.exchangerate.host/latest?symbols=USD,EUR,CZK,AED,INR,HKD,AUD,CNY,QAR,PHP,PKR,TRY,WST");
            setLabels(Object.keys(usexchangeRatesFromServer))
            setUSRates(usexchangeRatesFromServer)
            setEURates(euexchangeRatesFromServer)
        }
        getFunction()
    },[])
    let data =  null
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Latest Exchange Rates'
          },
        },
      };
    
      if(usRates !== undefined){
          data = {
            labels,
            datasets: [
              {
                label: 'V/S USD',
                data: usRates,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'V/S EUR',
                data: euRates,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };
      }
    if (usRates)
        return (
            <div className="container-fluid">
                <div className="respTable">
                    <Bar options={options} data={data} />
                    <br/>
                    <h2>Your IP Address is</h2>
                    <h4>{ipDet.IPv4}</h4> 
                    <button className="btn-primary" onClick={showMorefn}>{showMore ? "Close": "Show More Details"}</button>
                    <div hidden={!showMore}>
                        <h4>City: {ipDet.city}</h4>    
                        <h4>State: {ipDet.state}</h4>    
                        <h4>Country: {ipDet.country_name}</h4>    
                        <h4>Latitude: {ipDet.latitude}</h4>    
                        <h4>Longitude: {ipDet.longitude}</h4>    
                    </div>
                    <form onSubmit={getIpDetails}>
                        <h2>Find Details by using IPv4 Address</h2>
                        <div className="mb-3">
                        <input className="form-control" ref={ipRef} type="text" name="IP" placeholder="IPv4" />
                        </div>
                        <button className="btn btn-primary w-100" type="submit">
                        Submit
                        </button>
                        <div hidden={!showIPDet}>
                        <h4>Country: {findIPDet.country_name}</h4>    
                        <h4>ISP: {findIPDet.isp}</h4>    
                        </div>              
                    </form>
                </div>
            </div>
    )

    else{
        return (<h1>LOADING</h1>)
    }
}

export default DashboardPage