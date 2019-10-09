import React from 'react';
import './App.css'
// import { Link, Route, Router, Switch } from 'react-router-dom'
import {
  Button, Card, CardActions, CardTitle, Content, FABButton, Footer, FooterLinkList,
  FooterSection, Header, Icon, List, ListItem, ListItemContent, Navigation, Layout, Tabs, Tab
} from 'react-mdl'

import CarForm from './components/CarForm'
import ServiceForm from './components/ServiceForm'
import OwnerForm from './components/OwnerForm'

//---------Owner Info---------
const ownerUsernames = (owner) => (
  <option value={owner.id}>{owner.username}</option>
)

const ownerList = (owners, currentOwner, onChange) => (
  <select value={currentOwner} onChange={(evnt) => onChange(evnt.target.value)}>
    <option value="100" disabled>Select Owner</option>
    {owners.map(ownerUsernames)}
  </select>
)

//----------- Selecting Current Car --------------
const ownerCarsDD = (car) => (
  <option value={car.id}>{car.nickname}</option>
)

const ownerCarList = (cars, currentCar, onChange) => (
  <select value={currentCar} onChange={(evnt) => onChange(evnt.target.value)}>
    <option value="100" disabled>Select Car</option>
    {cars.map(ownerCarsDD)}
  </select>
)

//---------Service History Info---------
const servicePreview = (service) => (
  <ListItem threeLine>
    <ListItemContent subtitle={`Was serviced at ${service.dealership} in ${service.location}.
    The cost of the service was $${service.price}. The vehicle left with ${service.mileage} miles.`}>
      {service.service} {service.date}
    </ListItemContent>
  </ListItem>
)
const serviceList = (services) => (
  <List style={{ width: 500, height: 260 }} className='service-list-ant scroll-list'>
    {services.map(servicePreview)}
  </List>
)
const ownerCarService = (cars) => (serviceList(cars.services))

//----------- Log Tab Layout --------------
const logTab = (car) => (
  <div className='log-tab'>
    <span>
      <h3>{car.nickname}</h3>
      <img src={car.image_url} style={{ width: '500px' }} alt={`${car.nickname}`} />
    </span>
    <section>
      <h4>{car.year}  {car.make}  {car.model}</h4>
      {ownerCarService(car)}
    </section>
    <hr />
  </div>
)
const logTabList = (cars) => (<div>{cars.map(logTab)}</div>)
const logFull = (owner) => (<div>{logTabList(owner.cars)}</div>)

//------------Car card (Dashboard) ----------------
const carCard = (car) => (

  <Card shadow={6} style={{ width: '512px', margin: 'auto', marginBottom: '50px' }}>
    <CardTitle style={{ color: '#fff', height: '200px', background: `url(${car.image_url}) center / cover` }}>
      {car.nickname}
    </CardTitle>
    <CardActions border>
      <Button colored ripple>View Log</Button>
    </CardActions>
  </Card>
)
const listCards = (cars) => (<div className='car-cards'>{cars.map(carCard)}</div>)
const ownerCars = (owner) => (
  <div className='owner-cars'>
    <h6>Owner: {owner.username}</h6>
    {listCards(owner.cars)}
  </div>
)

//--------Test Data Structures------------

const testOwner =
{
  1:
  {
    id: 1,
    username: 'juuuussttin',
    email: 'justin@gmail.com',
    cars:
      [
        {
          id: 1
          , image_url: 'http://carphotos.cardomain.com/ride_images/3/206/2861/25513930001_large.jpg'
          , nickname: 'bertha'
          , year: 2003
          , make: 'chevy'
          , model: 'monte carlo'
          , owner: 1
          , services:
            [
              {
                id: 1,
                dealership: 'stone mountain ford',
                location: 'stone mountain, ga',
                service: 'Brakes',
                mileage: 250000,
                price: 59.99,
                date: '2019-10-10',
                note: 'my name is lynd',
                car: 1
              }
            ]
        }
      ]
  },
  //-----------------------------------------------------------
  2:
  {
    id: 2,
    username: 'lynd21',
    email: 'justin@gmail.com',
    cars:
      [
        {
          id: 2
          , image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyx_2uIVjt64vs8tDNCMg_uHPRgHlXfFLTqqC3ER44-oZrJxtc'
          , nickname: 'shirley'
          , year: 1999
          , make: 'isuzu'
          , model: 'trooper'
          , owner: 2
          , services:
            [
              {
                id: 2,
                dealership: 'stone mountain ford',
                location: 'stone mountain, ga',
                service: 'Brakes',
                mileage: 250000,
                price: 59.90,
                date: '2019-10-10',
                note: 'my name is lynd',
                car: 2
              }
            ]
        }
      ]
  }
}


const objectFromListById = (owners, cars) => (
  owners.reduce((obj, owner) => {
    owner.cars = cars.filter(car => car.owner === owner.id)

    obj[owner.id] = owner

    return obj
  }, {})
)

const serviceObject = (cars, services) => (
  cars.reduce((obj, car) => {
    car.services = services.filter(services => services.car === car.id)

    obj[car.id] = car

    return obj
  }, {})
)


//----------- Fetch to GET -------------------
const getOwnersFromServer = () => (
  fetch('/api/owner/')
    .then(res => res.json())
)

const getCarsFromServer = () => (
  fetch('/api/car/')
    .then(res => res.json())
)

const getServiceHistoryFromServer = () => (
  fetch('/api/service/')
    .then(res => res.json())
)


const getAllFromServer = () => (
  getOwnersFromServer().then(owners =>
    getCarsFromServer().then(cars =>
      getServiceHistoryFromServer().then(services =>
        objectFromListById(owners, cars, serviceObject(cars, services))
      )))
)

const sendOwnerToServer = (ownerInfo) => (
  fetch('/api/owner/', 
    {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(ownerInfo)
    }).then(res => res.json())
)

const sendOwnerCarToServer = (carInfo) => (
  fetch('/api/car/', 
    {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(carInfo)
    }).then(res => res.json())
)

const sendCarServiceToServer = (serviceInfo) => (
  fetch('/api/service/', 
    {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify(serviceInfo)
    }).then(res => res.json())
)


class App extends React.Component {
  state = {
    activeTab: 2,
    currentOwner: '100',
    currentCar: '100',
    owners: testOwner,
    addCar: false,
    addHistory: false,
    showOwners: false,
    swap: true
  }

  //----------- Ajax Request ------------
  componentDidMount = () => {
    getAllFromServer()
      .then(owners => {
        this.setState({ owners })
      })
  }

  //---------Adding From Form ----------
  getNextOwnerId = () => (
    Math.max(...this.getAllOwners().map(owner => owner.id)) + 1
  )

  addNewCarForOwner = (newCar) => {
    sendOwnerCarToServer({...newCar, owner:this.state.currentOwner}).then(newCar => {

      newCar.services = []
  
      let owners = { ...this.state.owners }
  
      owners[this.state.currentOwner].cars.push(newCar)
  
  
      this.setState({ owners })
      console.log(this.state.owners)
    })
  }

  addServiceToCar = (newInfo) => {
    sendCarServiceToServer({...newInfo, car:this.state.currentCar}).then(newInfo =>{
      
      let owners = { ...this.state.owners[this.getCurrentOwner] }

      owners.cars[this.state.currentCar].services.push(newInfo)
  
      this.setState({ owners })
    })

  }

  addOwner = (newOwner) => {
    sendOwnerToServer(newOwner).then(newOwner => {

      newOwner.cars = []
  
      let owners = { ...this.state.owners }
  
      owners[newOwner.id] = newOwner
  
      this.setState({ owners, currentOwner: newOwner.id })
      console.log(this.state.owners)
    })
  }

  //------- Toggle Forms ----------
  toggleAddCar = () => {
    const addCar = !this.state.addCar
    console.log(this.state.owners)
    this.setState({ addCar })
  }

  toggleAddHistory = () => {
    const addHistory = !this.state.addHistory
    console.log(this.state)
    this.setState({ addHistory })
  }

  toggleSwap = () => {
    const swap = !this.state.swap
    console.log(this.state)
    this.setState({ swap })
  }

  //--------- Menu Button Actions -------------
  toggleOwner = () => {
    const showOwners = !this.state.showOwners
    this.setState({ showOwners })
  }

  linkToDashboard = () => {
    this.setState({ activeTab: 1 })
  }

  linkToLog = () => {
    this.setState({ activeTab: 0 })
  }
  //----------- Getting current entity ------------
  getCurrentOwner = () => (
    this.state.owners[this.state.currentOwner]
  )

  getCurrentCar = () => (
    this.state.owners[this.state.currentOwner].cars
  )

  getAllOwners = () => (
    Object.values(this.state.owners)
  )

  setCurrentOwner = (currentOwner) => {
    this.setState({ currentOwner })
  }

  setCurrentCar = (currentCar) => {
    this.setState({ currentCar })
  }

  //-------------- Tabs ------------------
  toggleTab = () => {
    // LOG TAB (list service history for one car)
    if (this.state.activeTab === 0) {
      return (
        <div>
          <header>
            <h1>Log</h1>
            <FABButton onClick={this.toggleAddHistory} className='service-button' ripple>
              <Icon name="+" />
            </FABButton>
            <aside>
              {this.state.addHistory ? <ServiceForm addServiceToCar={this.addServiceToCar} /> : null}
              {ownerCarList(this.getCurrentCar(), this.state.currentCar, this.setCurrentCar)}
            </aside>
          </header>
          <section>
            {logFull(this.getCurrentOwner())}
          </section>
        </div>
      )
    }

    // DASHBOARD TAB (list all cars)
    else if (this.state.activeTab === 1) {
      return (
        <div>
          <header>
            <h1>Dashboard</h1>
            <FABButton onClick={this.toggleAddCar} className='car-button' ripple>
              <Icon name="+" />
            </FABButton>
          </header>
          <section>
            {this.state.addCar ? <CarForm addNewCar={this.addNewCarForOwner} /> : null}
          </section>
          <aside>
            {ownerCars(this.getCurrentOwner())}
          </aside>
        </div>
      )
    }

    //Owner Tab (add new owner)
    else if (this.state.activeTab === 2) {
      return (
        <div>
          <header>
            <h1>Owner</h1>
            <Button onClick={this.toggleSwap} className='car-button' raised colored>
              {this.state.swap ? 'Existing Owner' : 'New Owner'}
            </Button>
          </header>
          {
            this.state.swap ? <OwnerForm addNewOwner={this.addOwner} /> :
              ownerList(this.getAllOwners(), this.state.currentOwner, this.setCurrentOwner)
          }
        </div>
      )
    }

  }


  render = () => (
    <div style={{ height: '789px', position: 'relative' }}>
      <Layout>
        <Header title="MotorBoard" className='header-color' scroll>
          <Navigation>
            <a onClick={this.toggleOwner} style={{ marginTop: '14px' }}><i className="fa fa-cog fa-2x" aria-hidden="true"></i></a>
            <a onClick={this.linkToDashboard} style={{ marginTop: '14px' }}><i className="fa fa-home fa-2x" aria-hidden="true"></i></a>
          </Navigation>
        </Header>
        <Tabs activeTab={this.state.activeTab}
          onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
          <Tab>Log</Tab>
          <Tab>Dashboard</Tab>
          {this.state.showOwners ? <Tab>Owner</Tab> : <Tab disabled>Owner</Tab>}
        </Tabs>
        <Content>
          <div className='tab-content'>
            {this.toggleTab()}
          </div>
        </Content>
        <Footer size="mini">
          <FooterSection type="left" logo="MotorBoard">
            <FooterLinkList>
              <a href="#">Help</a>
              <a href="#">Privacy & Terms</a>
            </FooterLinkList>
          </FooterSection>
        </Footer>
      </Layout>
    </div>
  )
}

export default App;
