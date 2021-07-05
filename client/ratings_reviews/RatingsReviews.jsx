import React from 'react';
import $ from 'jquery';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingOptions from './components/SortingOptions.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';
import SearchBar from './components/SearchBar.jsx';
import helpers from './helpers.js';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReviews: [],
      sortingOption: 'relevance',
      starFilters: [],
      keyword: '',
      showRemoveFilters: false
    };
    this.initialize = this.initialize.bind(this);
    this.handleOptionChanges = this.handleOptionChanges.bind(this);
    this.handleStarFilters = this.handleStarFilters.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.initialize();
    }
  }

  initialize() {
    this.setState({
      filteredReviews: helpers.sortReviews(this.props.reviews, 'relevance'),
      sortingOption: 'relevance',
      starFilters: [],
      keyword: '',
      showRemoveFilters: false
    });
    if (!localStorage.getItem('helpfulReviews')) {
      localStorage.setItem('helpfulReviews', JSON.stringify([]));
    }
    sessionStorage.setItem('helpfulReviews', JSON.stringify([]));
    sessionStorage.setItem('reportedReviews', JSON.stringify([]));
  }

  handleOptionChanges(newOption) {
    let newFilteredReviews = this.updateReviews(this.props.reviews, newOption, this.state.starFilters, this.state.keyword);
    this.setState({
      sortingOption: newOption,
      filteredReviews: newFilteredReviews
    });
  }

  handleStarFilters(star) {
    let newStarFilters = this.state.starFilters.slice();
    if (this.state.starFilters.indexOf(star) === -1) {
      newStarFilters.push(star);
    } else {
      newStarFilters.splice(this.state.starFilters.indexOf(star), 1);
    }
    let newFilteredReviews = this.updateReviews(this.props.reviews, this.state.sortingOption, newStarFilters, this.state.keyword);
    let showRemoveFilters = newStarFilters.length !== 0;
    this.setState({
      starFilters: newStarFilters,
      filteredReviews: newFilteredReviews,
      showRemoveFilters: showRemoveFilters
    });
  }

  removeFilters() {
    let newFilteredReviews = this.updateReviews(this.props.reviews, this.state.sortingOption, [], this.state.keyword);
    this.setState({
      starFilters: [],
      filteredReviews: newFilteredReviews,
      showRemoveFilters: false
    });
  }

  handleSearch(keyword) {
    if (keyword.length < 3) {
      keyword = '';
    }
    let queriedReviews = this.updateReviews(this.props.reviews, this.state.sortingOption, this.state.starFilters, keyword);
    this.setState({
      keyword: keyword,
      filteredReviews: queriedReviews
    });
  }

  updateReviews(review, sortingOption, starFilters, keyword) {
    let sortedReviews = helpers.sortReviews(review, sortingOption);
    let filteredReviews = helpers.applyStarFilters(sortedReviews, starFilters);
    let queriedReviews = helpers.applyKeyword(filteredReviews, keyword);
    return queriedReviews;
  }

  render() {
    if (!$.isEmptyObject(this.props.meta) && this.props.info !== null) {
      return (
        <div class='review-overall-container' id='review-overall-container'>
          <span>RATINGS & REVIEWS</span>
          <div class='review-content-container'>
            <div id='review-left-container' class='review-sub-container left'>
              <RatingBreakdown
                product_id={this.props.product_id}
                meta={this.props.meta}
                handleStarFilters={this.handleStarFilters}
                starFilters={this.state.starFilters}
                removeFilters={this.removeFilters}
                showRemoveFilters={this.state.showRemoveFilters}/>
              <ProductBreakdown
                meta={this.props.meta}/>
            </div>
            <div id='review-right-container' class='review-sub-container right'>
              <SearchBar
                handleSearch={this.handleSearch}/>
              <SortingOptions
                handleOptionChanges={this.handleOptionChanges}
                reviews={this.state.filteredReviews}
                product_id={this.props.product_id}/>
              <ReviewsList
                reviews={this.state.filteredReviews}
                sortingOption={this.state.sortingOption}/>
              <ReviewForm
                productName={this.props.info.name}
                meta={this.props.meta}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default RatingsReviews;
