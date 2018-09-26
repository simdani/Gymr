import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteReview } from '../../actions/gymActions';

class ReviewFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  removeReview = (e, gymId, reviewId) => {
    e.preventDefault();

    this.props.deleteReview(gymId, reviewId);
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const updateReview = {
      text: this.state.text
    };

    console.log(updateReview);

    // this.props.addGym(updateReview, () => {
    //   this.props.history.push('/');
    //   // NotificationManager.success('Gym created successfully!', 'Success');
    // });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  showEditModal = (reviewText) => {
    return (
      <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">Edit your review</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>

          <form onSubmit={this.onSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="text">Your review:</label>
                <input type="text"
                  className="form-control"
                  placeholder="enter your review"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="modal-footer">        
              <button type="submit" className="btn btn-secondary">
                  Create
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
    );
  }

  render() {
    const { reviews, gymId } = this.props;

    const { user } = this.props.auth;

    return reviews.map(review => 
      <div key={review._id} className="card card-info">
        <div className="card-body">
          <div className="d-flex">  
            <p><strong>{review.username} ({review.date})</strong></p>  
            
            { review.user === user.id ? 
              <p className="ml-auto">
                <button type="button" onClick={() => this.setState({text: review.text})} className="btn btn-dark" data-toggle="modal" data-target="#myModal">
                  Edit
                </button>
                <button className="btn btn-danger" onClick={(e) => this.removeReview(e, gymId, review._id)}>
                  Delete
                </button>
                

              </p>
              : (null)
            }
            {this.showEditModal(review.text)}
          </div>   
          
          <p>{review.text}</p>
        </div>
      </div>
      );
  }
}

ReviewFeed.propTypes = {
  reviews: PropTypes.array.isRequired,
  gymId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteReview })(ReviewFeed);
