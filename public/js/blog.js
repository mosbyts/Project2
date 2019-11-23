$(document).ready(function() {
  // reviewContainer holds all of our reviews
  var reviewContainer = $(".reviews-container");
  var reviewCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleReviewDelete);
  $(document).on("click", "button.edit", handleReviewEdit);
  reviewCategorySelect.on("change", handleCategoryChange);
  var posts;

  // This function grabs reviews from the database and updates the view
  function getReviews(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Review", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete reviews
  function deleteReview(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function() {
      getReviews(reviewCategorySelect.val());
    });
  }

  // Getting the initial list of reviews
  getReviews();
  // InitializeRows handles appending all of our constructed review HTML inside
  // reviewContainer
  function initializeRows() {
    reviewContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    reviewContainer.append(postsToAdd);
  }

  // This function constructs a review's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCategory = $("<h5>");
    newPostCategory.text(post.category);
    newPostCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which review we want to delete and then calls
  // deleteReview
  function handleReviewDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deleteReview(currentPost.id);
  }

  // This function figures out which review we want to edit and takes it to the
  // Appropriate url
  function handleReviewEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no reviews
  function displayEmpty() {
    reviewContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No reviews yet for this category, navigate <a href='/cms'>here</a> in order to create a new review."
    );
    reviewContainer.append(messageH2);
  }

  // This function handles reloading new reviews when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getReviews(newPostCategory);
  }
});
