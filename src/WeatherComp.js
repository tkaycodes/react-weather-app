import React, { Component } from 'react';
import axios from 'axios';
// import City from './City.js';

class WeatherComp extends Component {

    constructor(props) {
        super(props) 
        
        this.state = {
            city: 'Select City', 
            forecast: [], 
            currentConditions: '',
            currentConditionImage: ''
        }

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {

        let currentCity = e.target.value

        let cityQueryObj = {
            "Vancouver": "vancouver, bc",
            "London": "london, uk",
            "New York": "newyork, us",
            "New Delhi": "newdelhi, in", 
            "Sydney": "sydney, au"
        }

        this.setState({
            city: currentCity
        }, function() {
            
            // Make a request for a user with a given ID
            axios.get(`https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${cityQueryObj[currentCity]}")`)
                .then((response) => {

                    let forecast = JSON.parse(response.request.responseText).query.results.channel.item.forecast;
                    let currentConditions = JSON.parse(response.request.responseText).query.results.channel.item.condition;
                    let currentConditionImage = JSON.parse(response.request.responseText).query.results.channel.item.description.match(/<img[^>]*src="([^"]*)/)[1];

                    this.setState({
                        forecast: forecast,
                        currentConditions: currentConditions,
                        currentConditionImage: currentConditionImage
                    })
                    
                })

                
            });


    }

    render() {

        let cityList = ['Vancouver', 'London', 'New York', 'New Delhi', 'Sydney']

        return (
            <div>
                <select onChange={this.handleChange} value={this.state.city}>
                    <option>Select City</option>

                    {
                        cityList.map((city, index) => {
                            
                            return <option key={index}> {city} </option>;

                        })
                    }


                </select>

                {

                    this.state.forecast.length > 0 &&


                    <div style={{ marginTop: '25px' }}>

                        

                        <div style={{ fontWeight: 'bold' }}>Current Conditions:</div>

                        {
                            this.state.currentConditions.text

                        }   

                        
                        <div><img src={this.state.currentConditionImage} /></div>
                                         
                       

                        <div style={{ fontWeight: 'bold', marginTop: '20px' }}>Forecast:</div>

                        {
                            this.state.forecast.map((value, index) => {

                                return (
                                    <div style= {{ border: '1px solid black', margin: '12px', padding: '15px' }}>
                                        <div style={{ marginBottom: '15px', borderBottom: '1px solid black', fontWeight: 'bold'}}>
                                            <span style={{ marginRight: '5px'}}>
                                                {value.day} 
                                            </span>
                                            <span>
                                                {value.date}
                                            </span>
                                        </div>
                                        <div>
                                            High: <span style={{marginRight: '5px'}}>{value.high} °F </span>/
                                                  <span style={{marginLeft: '10px'}}>{Math.round((parseInt(value.high) - 32) * (5/9))} °C </span>
                                        </div>
                                        <div>
                                            Low: <span style={{marginRight: '10px'}}>{value.low} °F </span>/
                                                 <span style={{marginLeft: '10px'}}>{Math.round((parseInt(value.low) - 32) * (5/9))} °C </span>

                                        </div>
                                        <div style={{ marginTop: '15px', fontWeight: 'bold'}}>
                                            {value.text}
                                        </div>
                                    </div>
                                )

                            })

                        }

                    </div>
                        

                        
                } 

            </div>
        );
    }
}

export default WeatherComp;
