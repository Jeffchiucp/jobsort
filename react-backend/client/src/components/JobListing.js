import React, { Component } from 'react';

class JobListing extends Component {
  /* istanbul ignore next */
  constructor() {
    super()
    this.state = {
      fullDescriptionVisible: false,
      hidden: false
    };
    this.handleDescriptionLengthToggle = this.handleDescriptionLengthToggle.bind(this);
    this.handleHideClick = this.handleHideClick.bind(this);
  }

  handleDescriptionLengthToggle(event) {
    let fullDescriptionVisible = this.state.fullDescriptionVisible;
    if (fullDescriptionVisible) {
      event.target.parentElement.parentElement.scrollIntoView(true);
      this.props.descriptionClicked('read less');
    }
    else {
      this.props.descriptionClicked('read more');
    }
    this.setState({fullDescriptionVisible:!fullDescriptionVisible});
    event.preventDefault();
  }

  handleHideClick(event) {
    let hidden = this.state.hidden;
    this.setState({hidden:!hidden});
    this.props.onHideClick();
    event.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    let updateListings = nextProps.updateListings;
    let hidden = this.state.hidden;
    let fullDescriptionVisible = this.state.fullDescriptionVisible;
    if (updateListings.unhideAll) {
      if (hidden) {
        this.setState({hidden:false});
      }
    }
    if (updateListings.showShortDescriptions) {
      if (fullDescriptionVisible) {
        this.setState({fullDescriptionVisible:false});
      }
    }
    if (updateListings.showFullDescriptions) {
      if (!fullDescriptionVisible) {
        this.setState({fullDescriptionVisible: true});
      }
    }
  }

  render() {
    let fullDescriptionVisible = this.state.fullDescriptionVisible;
    let listing = this.props.listing;
    let hidden = this.state.hidden;
    let index = this.props.index;
    let text = listing.descriptionText.slice(0,200);
    text = text.slice(0,text.lastIndexOf(" "));
    text = text.concat('...');
    let source;
    if (listing.source === 'hackerNews') {
      source = <span className="source hacker-news">hn who's hiring</span>;
    }
    else if (listing.source === 'stackOverflow') {
      source = <span className="source stack-overflow">stack overflow</span>;
    }
    else if (listing.source === 'github') {
      source = <span className="source github">github</span>;
    }
    else {
      source = <span className="bad-source"></span>;
    }
    if (hidden) {return (null);}
    return (
      <div className="job-listing">
        <button className="exit" data-value={index} onClick={this.handleHideClick}>&#10006;</button>
        {source}
        {listing.url ? (
          <h4><a className="listing-url" href={listing.url}>{listing.title}</a></h4>
        ) : (
          <h4>{listing.title}</h4>
        )}
        <p className="listing-item">{listing.companyName}</p>
        <p className="listing-item">{listing.location}</p>
        <p className="listing-item">{listing.postTimeStr}</p>
        <p className="listing-item">{listing.type}</p>
        <p className="listing-item">Technologies: {listing.descriptionHasTech.join(' ')}</p>
        {fullDescriptionVisible ?
          <p className="listing-item full-description"><span dangerouslySetInnerHTML={{__html: listing.descriptionHTML}}></span><a className="read-less" data-value={index} onClick={this.handleDescriptionLengthToggle}>read less</a></p>
        :
          <p className="listing-item short-description">{text}<a className="read-more" data-value={index} onClick={this.handleDescriptionLengthToggle}>read more</a></p>
        }
      </div>
    );
  }
}

export default JobListing;
