import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { bindActionCreators } from 'redux';
import { filter, isEmpty } from 'lodash';
import { Lines } from 'react-preloading-component';
import ReactPaginate from 'react-paginate';
import getUserRecipe from '../../../actionController/getUserRecipe';
import addRecipeAction from '../../../actionController/addRecipe';
import saveImageToCloudAction from '../../../actionController/saveImageToCloud';
import AddRecipeButton from '../../Include/buttons/AddRecipeButton';
import deleteRecipeAction from '../../../actionController/deleteRecipe';
import editRecipeAction from '../../../actionController/editRecipe';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import RecipeGrid from '../RecipeGrid';

/**
 * @class UserRecipes
 *
 * @description UserRecipes
 */
class UserRecipes extends Component {
  /**
   * @description create an instance of UserRecipes
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredient: '',
      recipeData: [],
      isFetched: false,
      isChanged: false,
      responseMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveImageToCloud = this.saveImageToCloud.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.handleShowRecipe = this.handleShowRecipe.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  /**
   * @description check the state of isFetched and call the get recipe action
   *
   * @param {props} props
   *
   * @returns {void} return all recipes
   */
  componentDidMount() {
    const { userId, page } = this.props;
    this.props.getUserRecipe(userId, page);
  }

  /**
   * @description update the state of user recipes
   *
   * @param {nextProps} nextProps
   *
   * @return {undefined} updated user recipe
   */
  componentWillReceiveProps(nextProps) {
    const { recipeImageUrl, recipes, addRecipeResponse } = nextProps;
    const { recipeData, isFetched } = recipes;
    if (!isEmpty(addRecipeResponse)) {
      this.setState({
        responseMessage: nextProps.addRecipeResponse
      });
    }
    if (recipeData !== this.props.recipes.recipeData) {
      this.setState({
        recipeData,
        isFetched
      });
    }
    if (recipeImageUrl !== this.props.recipeImageUrl) {
      this.setState({
        image: recipeImageUrl
      });
    }
  }
  /**
   * @description function to edit a recipe
   *
   * @param {id} id id of recipe to be edited
   *
   * @param {recipeData} recipeData recipe data to be sent to the database
   *
   * @returns {undefined} calls editRecipeAction
   */
  editRecipe(id, recipeData) {
    this.props.editRecipeAction(id, recipeData);
  }

  /**
   * @description function to delete a recipe
   *
   * @param {id} id id of recipe to be deleted
   *
   * @returns {undefined} calls the delete recipe action
   */
  deleteRecipe(id) {
    this.props.deleteRecipeAction(id);
  }

  /**
   * @description set the state of value inputs on form
   *
   * @param {event} event
   *
   * @returns {void} set the state of value inputs on form
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isChanged: true
    });
  }

  /**
   * @description get the state of recipe to be edited and display it on the edit form
   *
   * @param {recipeId} recipeId
   *
   * @returns {object} object
   */
  handleShowRecipe(recipeId) {
    const recipe = filter(this.state.recipeData, filterRecipe => filterRecipe.id === recipeId);
    this.setState({
      recipe
    });
  }

  /**
   * @description function to add a recipe
   *
   * @param {event} event
   *
   * @returns {undefined} calls add recipe action
   */
  addRecipe(event) {
    event.preventDefault();
    const {
      name, image, description, ingredient
    } = this.state;
    const newRecipe = {
      name, image, description, ingredient
    };
    this.props.addRecipeAction(newRecipe);
    // this.setState({
    //   name: '', image: '', description: '', ingredient: ''
    // });
  }

  /**
   * @description upload Image to cloud
   *
   * @param {event} event
   *
   * @returns {undefined} call saveImageToCloudAction to save images
   */
  saveImageToCloud(event) {
    const image = event.target.files[0];
    if (image) {
      this.props.saveImageToCloudAction(image);
    }
  }

  /**
   * @description set the state of recipe data when form is closed
   *
   * @returns {undefined} set state of isChanged
   */
  handleCloseModal() {
    this.setState({
      isChanged: false
    });
  }

  handlePaginationChange(recipes) {
    const { userId } = this.props;
    this.props.getUserRecipe(userId, recipes.selected);
  }

  /**
   * @description render user recipes
   *
   * @returns {JSX} JSX
   */
  render() {
    const renderUserRecipes = <h1>No recipes in your catalog</h1>;
    return (
      <div>
        <Header />
        <div className="container">
          <div className="top-nav-bar">
            <AddRecipeButton
              value={this.state}
              onChange={this.handleChange}
              addRecipe={this.addRecipe}
              saveImageToCloud={this.saveImageToCloud}
              recipeImage={this.props.recipeImageUrl}
            />

          </div>
          <div className="row">
            {/* {this.state.isFetched && renderUserRecipes} */}
            {
              !this.props.recipes.isFetched ? <Lines /> :
              <RecipeGrid
                showActionButton
                recipeData={this.state.recipeData}
                showRecipeDetails={this.handleShowRecipe}
                deleteRecipe={this.deleteRecipe}
                editRecipe={this.editRecipe}
                addRecipe={this.addRecipe}
                value={this.state}
                handleCloseModal={this.handleCloseModal}
                onChange={this.handleChange}
                saveImageToCloud={this.saveImageToCloud}
              />
            }
          </div>
          <div className="pt-3 pb-5">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel={<a href="">...</a>}
              breakClassName="page-link"
              onPageChange={this.handlePaginationChange}
              pageCount={this.props.page}
              containerClassName="pagination justify-content-center"
              pageLinkClassName="page-link"
              nextLinkClassName="page-link"
              previousLinkClassName="page-link"
              disabledClassName="disabled"
              pageClassName="page-item"
              previousClassName="page-item"
              nextClassName="page-item"
              activeClassName="active"
              subContainerClassName="pages pagination"
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
UserRecipes.propTypes = {
  getUserRecipe: PropTypes.func.isRequired,
  addRecipeAction: PropTypes.func.isRequired,
  deleteRecipeAction: PropTypes.func.isRequired,
  editRecipeAction: PropTypes.func.isRequired,
  recipes: PropTypes.objectOf(any).isRequired,
  recipeImageUrl: PropTypes.string.isRequired,
  saveImageToCloudAction: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

/**
 * @description allow state to be available to UserRecipes class as props
 * @param {state} state
 * @returns {object} object
 */
const mapStateToProps = state => ({
  recipes: state.getUserRecipeReducer,
  userId: state.authReducer.userData.id,
  page: state.getUserRecipeReducer.page,
  recipeImageUrl: state.saveImageToCloud.image,
  addRecipeResponse: state.addRecipeReducer.errorMessage
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserRecipe,
    addRecipeAction,
    deleteRecipeAction,
    editRecipeAction,
    saveImageToCloudAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);