// @flow
import React from 'react';

import { Banner, Page, DisplayText, Button, TextField, Layout, DescriptionList } from '@shopify/polaris';
import axios from 'axios';
import type { RouterHistory } from 'react-router-redux';

type OwnProps = {
  history: RouterHistory
};


class BlogService extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataitems: '',
      title: '',
      content: '',
      articleid: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { showing: true };

  handleGoToProducts = () => {
    const { history } = this.props;
    history.push('/');
  };

  _onPressButton = (value) => {
    console.log(value);
    const { showing } = this.state;
    this.setState({ showing: !showing });
    this.setState({ articleid: value });
  }

  _showReviewArticle = (value) => {
    console.log(value);
    const { history } = this.props;
    history.push({
      pathname: '/review',
      state: { detail: value }
    })
  }

  handleArticleCont = (content) => {
    this.setState({ content });
  }

  handleArticleTitle = (title) => {
    this.setState({ title });
  }

  handleSubmit(event) {
    event.preventDefault();
    var dataarr = [];
    let temp_bundled = {};
    temp_bundled.articleid = this.state.articleid;
    temp_bundled.title = this.state.title;
    temp_bundled.content = this.state.content;
    dataarr.push(temp_bundled);
    let dataarrd = JSON.stringify({ data: dataarr });
     var apiBaseUrl = "https://5739210b.ngrok.io/api/generatearticle";
    var self = this;
    const myInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: dataarrd
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

  componentDidMount() {
    var self = this;
    const apiUrl = "https://5739210b.ngrok.io/api/getarticles";

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

  render() {
    const { showing } = this.state;
    const dataitem = this.state.dataitems;
    let renderItems = '';
    if (dataitem) {
      renderItems = this.state.dataitems.map((item, index) => {

        let productdataJson = item.productdata;
        let protitle = '';
        let prourl = '';
        if(JSON.parse(productdataJson)){
          JSON.parse(productdataJson).map(function (innerItem, innerIndex) {
            protitle = innerItem.title;
            prourl = innerItem.producturl;
          });  
        }
        return <Layout.Section key={index}>
              <Layout.Section secondary>
                <DescriptionList
                
                  items={[
                    {
                      term: 'Shop',
                      description: item.shopurl,
                    },
                    {
                      term: 'Describe',
                      description: item.describe,
                    },
                    {
                      term: 'Title',
                      description: protitle,
                    },
                  ]}
                />    
                
                  
                <Button onClick={() => this._onPressButton(item.id)}>Write a Article</Button>
                <Button onClick={() => this._showReviewArticle(item.id)}>Go to Review</Button>
              </Layout.Section>
          
        </Layout.Section>
      });
    }
    return (
      <Page title="Blog List" secondaryActions={[{ content: 'Back to products', onAction: this.handleGoToProducts },]} >
      
        <Banner title="Your React Shopify app is ready. You can start building solutions for Blog Listing!" status="success" />
        <Layout sectioned>
            
            <Layout.Section secondary>
            {showing ?
                <Layout.Section secondary>
                  <Layout.Section secondary><TextField label="Blog Title" value={this.state.title} onChange={this.handleArticleTitle} /></Layout.Section>
                  <Layout.Section secondary><TextField label="Please describe" name="describe" value={this.state.content} onChange={this.handleArticleCont} multiline /></Layout.Section>
                  <Layout.Section secondary><Button onClick={(event) => this.handleSubmit(event)} size="large" primary submit > Request Article </Button></Layout.Section>
                </Layout.Section>
              : null
            }
            </Layout.Section>

            {renderItems}

        </Layout>

      </Page>
    );
  }
}

export default BlogService;
