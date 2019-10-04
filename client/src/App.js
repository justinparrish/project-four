import React from 'react';
import './App.css'
import { Button, Card, CardActions, CardTitle, Content, FABButton, Header, Icon, Navigation, Layout, Tabs, Tab } from 'react-mdl'

import CarForm from './components/CarForm'
import ServiceForm from './components/ServiceForm'
import OwnerForm from './components/OwnerForm'

//---------Car Info---------
/* will be used for card */
const carNickname = (car) => (`${car.nickname}`)
const carInfo = (car) => (<li>{car.year} - {car.make} - {car.model}</li>)
const carList = (list) => (<ul>{list.map(carInfo)}</ul>)
/* will be used for card */
const carImage = (car) => (`${car.image_url}`)
const imageList = (car) => (<img src={car.map(carImage)} atl='car image' />)
const carNicknameList = (car) => (<ul>{car.map(carNickname)}</ul>)



const carCard = (car) => (
  <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
    <CardTitle style={{ color: '#fff', height: '176px', background: `url(${car.image_url}) center / cover` }}>
      {car.nickname}
    </CardTitle>
    <CardActions border>
      <Button colored>View Log</Button>
    </CardActions>
  </Card>
)

const listCards = (cars) => (
  <span>
    {cars.map(carCard)}
  </span>
)

//---------Owner Info---------
const username = (text) => (<li>{text.username}</li>)
const usernameList = (list) => (<ul>{list.map(username)}</ul>)
const ownerCars = (owner) => (
  <div>
    {owner.username}
    {listCards(owner.cars)}
  </div>
)

//---------Service History Info---------
/* will link to modal of full info */
const servicePreview = (info) => (<li>{info.service} - {info.date}</li>)
const serviceList = (list) => (<ul>{list.map(servicePreview)}</ul>)

/* will be used for modal */
const serviceFullInfo = (info) => (
  <div>
    <li>{info.dealership}</li>
    <li>{info.location}</li>
    <li>{info.service}</li>
    <li>{info.mileage}</li>
    <li>${info.price}</li>
    <li>{info.date}</li>
    <li>{info.note}</li>
  </div>
)
const serviceFullInfoList = (list) => (
  <span>
    {list.map(serviceFullInfo)}
  </span>
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
          , image_url: 'data:image/jpeg;base64,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'
          , nickname: 'bertha'
          , year: 2016
          , make: 'dodge'
          , model: 'challenger'
          , service_history:
            [
              {
                id: 1,
                dealership: 'stone mountain ford',
                location: 'stone mountain, ga',
                service: 'Brakes',
                mileage: 250000,
                price: 59.90,
                date: '2019-10-10',
                note: 'my name is lynd'
              }
            ]
        }
      ]
  },
  2:
  {
    id: 3,
    username: 'juuuussttin',
    email: 'justin@gmail.com',
    cars:
      [
        {
          id: 2
          , image_url: 'data:image/jpeg;base64,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'
          , nickname: 'bertha'
          , year: 2016
          , make: 'dodge'
          , model: 'challenger'
          , service_history:
            [
              {
                id: 2,
                dealership: 'stone mountain ford',
                location: 'stone mountain, ga',
                service: 'Brakes',
                mileage: 250000,
                price: 59.90,
                date: '2019-10-10',
                note: 'my name is lynd'
              }
            ]
        }
      ]
  }
}

class App extends React.Component {
  state = {
    activeTab: 1,
    currentOwner: 1,
    owners: testOwner
  }


  addNewCar = () => {

  }

  toggleTab = () => {
    if (this.state.activeTab === 0) {
      return (
        <div>
          <h1>Log</h1>
        </div>

      )
    }
    else if (this.state.activeTab === 1) {
      return (
        <div>

          <h1>Dashboard</h1>
          <CarForm addNewCar={this.addNewCar} />
          <FABButton ripple>
            <Icon name="+" />
          </FABButton>
          {ownerCars(this.getCurrentOwner())}
        </div>
      )
    }

  }
  getCurrentOwner = () =>
    this.state.owners[this.state.currentOwner]

  getAllOwners = () =>
    Object.values(this.state.owners)

  render = () => (
    <div style={{ height: '350px', position: 'relative' }}>
      <Layout>
        <Header title="MotorBoard" className='header-color' scroll>
          <Navigation>
            <a href="#" style={{ marginTop: '14px' }}><i class="fa fa-cog fa-2x" aria-hidden="true"></i></a>
            <a href="#" style={{ marginTop: '14px' }}><i class="fa fa-home fa-2x" aria-hidden="true"></i></a>
          </Navigation>
        </Header>
        <Tabs activeTab={this.state.activeTab}
          onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
          <Tab>Log</Tab>
          <Tab>Dashboard</Tab>
        </Tabs>
        <Content>
          <div className='tab-content'>
            {this.toggleTab()}

          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default App;
