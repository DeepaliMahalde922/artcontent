
// @flow
import React from 'react';
import type { RouterHistory } from 'react-router-redux';
import { Banner, Page, DisplayText, Card, Layout, Button, ButtonGroup, AccountConnection, TextField} from '@shopify/polaris';
import axios from 'axios';
type OwnProps = {
  history: RouterHistory
};

// These values are used in development. They are defined in the .env file
const { REACT_APP_SHOPIFY_API_KEY, REACT_APP_SHOP_ORIGIN } = process.env;

type environment = {
  SHOPIFY_API_KEY?: string,
  SHOP_ORIGIN?: string
};

const env: environment = window.env || {};

// Express injects these values in the client script when serving index.html
const { SHOPIFY_API_KEY, SHOP_ORIGIN } = env;

const apiKey: ?string = REACT_APP_SHOPIFY_API_KEY || SHOPIFY_API_KEY;
const shop: ?string = REACT_APP_SHOP_ORIGIN || SHOP_ORIGIN;

const shopOrigin: ?string = shop && `https://${shop}`;

class BlogService extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      describe: '',
      requestId: '',
      dataitems: '',
    }
  }

  state = { showing: true };

  componentDidMount() {
    var requestid =  this.props.location.state.detail;
    if(requestid){
      this.setState({ requestId: requestid });

      var self = this;
    const apiUrl = "https://5739210b.ngrok.io/api/article/:"+requestid;

    const myInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    const myRequest = new Request(apiUrl, myInit);

    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        this.setState({ dataitems: responseData.data });
      })
      .catch(function (e) {
        console.log(e);
      });
      
    }
  }

  handleGoToProducts = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleGoTolist = () => {
    const { history } = this.props;
    history.push('/blogservice');
  };

  state = {
    connected: false,
    revisionarticle: '',
  }

  _onPressButton = () => {
    const { showing } = this.state;
    this.setState({ showing: !showing });
  }

  _onPressPayemnt = () => {
    console.log(2);

//    /admin/application_charges.json

var apiBaseUrl = shopOrigin+"/admin/application_charges.json";

      var application_charge = {
          "name": "Super Duper Article",
          "price": 100.0,
          "return_url": shopOrigin,
          "test": true
         // 'api_client_id': REACT_APP_SHOPIFY_API_KEY
      };

    let payload = JSON.stringify({ application_charge });
    console.log(application_charge);
    console.log(payload);
    var apiBaseUrl = shopOrigin+"/admin/application_charges.json";
  //  var self = this;

   /*  var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } */
    axios.post(apiBaseUrl, payload)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })

    /* const myInit = {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': 'e53c7773-D836-421E-91EC-413ADEE7F535'
      },
      body: payload
    };
    const myRequest = new Request(apiBaseUrl, myInit);
    fetch(myRequest).then(function (response) {
      return response;
    }).then(function (response) {
      console.log(response);
    }).catch(function (e) {
      console.log(e);
    }); */

  }

  handleAction = () => {

    let revsionDes = this.state.describe;
    let requestid = this.state.requestId;
    
     
    let dataRev = JSON.stringify({ data: revsionDes });
    var apiBaseUrl = "https://5739210b.ngrok.io/api/updatearticles/:"+requestid;
    var self = this;

    const myInit = {
      method: 'PUT',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: dataRev
    };
    const myRequest = new Request(apiBaseUrl, myInit);
    fetch(myRequest).then(function (response) {
      return response;
    }).then(function (response) {
      if (response.status == 200) {
        alert('Your Entries has been saved.');
      }
      else if (response.status == 500) {
        alert('Something went worng');
      }
      else if (response.status == 404) {
        alert('Please fill all the fields including Product selection.');
      }
    }).catch(function (e) {
      console.log(e);
    });

  }

  handleDesChange = (describe) => {
    this.setState({ describe });
  }


  render() {

    const dataitem = this.state.dataitems;
    const {revisionarticle, connected} = this.state;
    const buttonText = connected ? 'Disconnect' : 'Submit Revision';
    const productId = this.state.productID;
    const { showing } = this.state;

    const terms = connected
      ? null
      : (
        <TextField placeholder="Please describe" name="describe" value={this.state.describe} onChange={this.handleDesChange} />
      ); 

    

    return (
      <Page
        title="Blog List"
        secondaryActions={[
          { 
            content: 'Back to products',
            onAction: this.handleGoToProducts
          },
          {
            content: 'Go to List',
            onAction: this.handleGoTolist
          }
        ]}
      >
        <DisplayText size="extraLarge">Your Request is Ready!</DisplayText>
        <Layout sectioned>
          <Layout.Section>
            <Card title="Please Review Your Request">
            
              {dataitem ?
                <Card.Section title={dataitem.title}>
                  <p>{dataitem.content}</p>
                </Card.Section>
              : <Card.Section title="Your Article is not done yet.">
                  <p>View a summary of your online store’s performance.</p>
                </Card.Section>
              }
              

              <Card.Section title="Acceptance and Payment">
                <p>View a summary of your online store’s performance, including sales, visitors, top products, and referrals.</p>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <ButtonGroup>
              <Button onClick={() => this._onPressPayemnt()} primary>Accept Article and Remit Payment</Button>
              <Button onClick={() => this._onPressButton()}>Request Revision</Button>
            </ButtonGroup>
          </Layout.Section>
          <Layout.Section>

          {showing ?
            <AccountConnection
            revisionarticle={revisionarticle}
            termsOfService=''
            connected={connected}
            title={terms}
            action={{
              content: buttonText,
              onAction: this.handleAction,
            }}
          />
          : null
          }
           
          </Layout.Section>

        </Layout>
      </Page>
    );
  }
}

export default BlogService;