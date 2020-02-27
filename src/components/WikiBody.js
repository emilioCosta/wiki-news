import React from 'react';
import api from '../api.js'
class WikiBody extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      link: '',
      fowardPage: 'for more information'
    }
    this.sortNewExcert = this.sortNewExcert.bind(this);
  }
  componentDidMount() {
    this.sortNewExcert();
  }
  render() {
    return <div className="content">
      <div className="title">{this.state.title}</div>
      <div className="body">{this.removeTags(this.state.body)}</div>
      <a href={this.state.link} className="refresh">{this.state.fowardPage}</a>
      <i onClick={this.sortNewExcert} className="refresh material-icons">refresh</i>
    </div>;
  }
  generateLink(title) {
    return 'https://en.wikipedia.org/wiki/'+title.replace(' ','_');
  }
  removeTags(body) {
    return body.replace(/<[^>]*>/g, '');
  }
  sortNewExcert() {
    const context = this;
    api.getWikipedia().then(response => {
      let pages = response.data.query.pages;
      pages = pages[Object.keys(pages)[0]];
      context.setState({
        title: pages.title,
        body: pages.extract,
        link: context.generateLink(pages.title),
        fowardPage: 'for more information'
      });
    }).catch(e => {
      context.setState({
        title: 'Server error',
        body: 'Sorry, the wikipedia server that we are using is having some problems. I believe that they are working to solve that.',
        link: 'https://www.wikipedia.org',
        fowardPage: 'access wikipedia'
      })
    });
  }
}

export default WikiBody;