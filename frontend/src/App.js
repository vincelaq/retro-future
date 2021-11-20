import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import AboutScreen from './screens/AboutScreen'
import SellScreen from './screens/SellScreen'
import ReviewEditScreen from './screens/ReviewEditScreen' 

function App() {
  return (
    <Router>
      <Header />
      <main>
        
          <Route path='/' component={SplashScreen} exact />
          <Route path='/home' component={HomeScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/review/:id' component={ReviewEditScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/sell' component={SellScreen} />
    
      </main>
      <br/>
      <br/>
      <Footer />
    </Router>
  );
}

export default App;
