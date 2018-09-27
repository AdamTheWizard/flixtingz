const api_key = API_KEY;
const movies = document.getElementById("movies");
const imgUrl = "https://image.tmdb.org/t/p/w500/";
let pageCounter = 2;
 
// fill the movies container with currently playing movies onload
window.onload = function() {
    
    $.getJSON(`  https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`, function success(data) {
        console.log(data);  

        pageCounter = 2;

        data.results.forEach(function(item) {

          //create movies boxes 
          let newBox = document.createElement("div");
          newBox.className = "movie-box";

          // create movies poster image
          let newPoster = document.createElement("img");
          newPoster.src = imgUrl + item.poster_path;
          newPoster.className = "poster-image";
          
          // create titles from data
          let newTitle = document.createElement("h1");
          newTitle.innerHTML = item.title + " <br><span class='date'>(" + item.release_date.substring(0,4) + ") - " + item.vote_average + "</span>";
          newTitle.className = "movie-title";

          // create overview from data
          let newOverview = document.createElement("p");
          newOverview.innerHTML = item.overview;
          newOverview.className = "movie-overview";

          //create trailer link by concatting item.title with a youtube url
          let newLink = document.createElement("a");
          newLink.className = "trailer-link";
          newLink.innerHTML = "<i class='trailer-icon fab fa-youtube'></i>";
          newLink.href = "https://www.youtube.com/results?search_query=trailer+" + item.title.replace(" ", "+");
          newLink.target = "_blank";
          

          //append details to movieBox and then append movieBox to the movies container
          newBox.appendChild(newPoster);
          newBox.appendChild(newTitle);
          newBox.appendChild(newOverview);
          newBox.appendChild(newLink);
          movies.appendChild(newBox);
          

        });
                
}
);
}


// click button with genre name
// use clickedButton to get correct genre of movies for list
$(".genre-buttons").click(function(){

    let clickedButton = $(this).val();
    $(".genre-buttons").css("opacity", ".5");
    this.style.opacity = "1";
    console.log(clickedButton);

    $.getJSON(`  https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=${api_key}&with_genres=${clickedButton}&region=GB&vote_average&page=1&vote_count.gte=1000`, function success(data) {
              console.log(data);  
              movies.innerHTML = "";

              pageCounter = 2;

              data.results.forEach(function(item) {

                //create movies boxes 
                let newBox = document.createElement("div");
                newBox.className = "movie-box";

                // create movies poster image
                let newPoster = document.createElement("img");
                newPoster.src = imgUrl + item.poster_path;
                newPoster.className = "poster-image";
                
                // create titles from data
                let newTitle = document.createElement("h1");
                newTitle.innerHTML = item.title + " <br><span class='date'>(" + item.release_date.substring(0,4) + ") - " + item.vote_average + "</span>";
                newTitle.className = "movie-title";

                // create overview from data
                let newOverview = document.createElement("p");
                newOverview.innerHTML = item.overview;
                newOverview.className = "movie-overview";

                 //create trailer link by concatting item.title with a youtube url
                let newLink = document.createElement("a");
                newLink.className = "trailer-link";
                newLink.innerHTML = "<i class='trailer-icon fab fa-youtube'></i>";
                newLink.href = "https://www.youtube.com/results?search_query=trailer+" + item.title.replace(" ", "+");
                newLink.target = "_blank";
                
                //append details to movieBox and then append movieBox to the movies container
                newBox.appendChild(newPoster);
                newBox.appendChild(newTitle);
                newBox.appendChild(newOverview);
                newBox.appendChild(newLink);
                movies.appendChild(newBox);
                

              });
              
              // create 'view more' button and attatch it to the bottom of the container
              const newButton = document.createElement("button");
              newButton.innerHTML = "View more...";
              newButton.className = "view-more-button";
              newButton.id = clickedButton;
              movies.appendChild(newButton);
              newButton.addEventListener("click", function(){
                  viewMore()
                });

              

    
    }
  );
});

// show more movies by increasing pageCounter during the request
function viewMore() {

    // .view-more-button has been given an id when a genre is first selected. 
    // This id is the genre code generated by TMDB.
    // the id is then used to get more movies from the same genre 
    let genreCode = $(".view-more-button").attr("id");

    $.getJSON(`  https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=${api_key}&with_genres=${genreCode}&region=GB&vote_average&page=${pageCounter}&vote_count.gte=1000`, function success(results) {
        console.log(results);  

        // remove the view-more-button so another one can be added at the end of the container
        let viewMoreButton = document.getElementById(genreCode);
        movies.removeChild(viewMoreButton);

        results.results.forEach(function(results) {

          //create movies boxes 
          let newBox = document.createElement("div");
          newBox.className = "movie-box";

          // create movies poster image
          let newPoster = document.createElement("img");
          newPoster.src = imgUrl + results.poster_path;
          newPoster.className = "poster-image";
          
          // create titles from data
          let newTitle = document.createElement("h1");
          newTitle.innerHTML = results.title + " <br><span class='date'>(" + results.release_date.substring(0,4) + ") - " + results.vote_average + "</span>";
          newTitle.className = "movie-title";

          // create overview from data
          let newOverview = document.createElement("p");
          newOverview.innerHTML = results.overview;
          newOverview.className = "movie-overview";

           //create trailer link by concatting item.title with a youtube url
          let newLink = document.createElement("a");
          newLink.className = "trailer-link";
          newLink.innerHTML = "<i class='trailer-icon fab fa-youtube'></i>";
          newLink.href = "https://www.youtube.com/results?search_query=trailer+" + results.title.replace(" ", "+");
          newLink.target = "_blank";

          // create 'view more' button and attatch it to the bottom of the container
          newBox.appendChild(newPoster);
          newBox.appendChild(newTitle);
          newBox.appendChild(newOverview);
          newBox.appendChild(newLink);
          movies.appendChild(newBox);
          

        });
        
        // create 'view more' button
        const newButton = document.createElement("button");
        newButton.innerHTML = "View more...";
        newButton.className = "view-more-button";
        newButton.id = genreCode;
        newButton.addEventListener("click", function(){
            viewMore()
          });
        movies.appendChild(newButton);

        pageCounter++;

}
);


}

//  added setTimeout as advised by someone on stackOverflow as the scrollTo was not working on android. Need to test.
// TODO TODO TODO TODO TODO
// TODO TODO TODO TODO TODO
// TODO TODO TODO TODO TODO
// TODO TODO TODO TODO TODO
// TODO TODO TODO TODO TODO
// TODO TODO TODO TODO TODO 
const backToTopButton = document.getElementById("back-to-top");

backToTopButton.onclick = function(){
    setTimeout(
    window.scrollTo({top: 0,left: 0,behavior: 'smooth'}), 100);
}

// fade in .back-to-top button on scroll and fadeOut when the top is reached
window.onscroll = function(){
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        $(backToTopButton).fadeIn(1000);
    } else {
        $(backToTopButton).fadeOut(1000);
    }
    
}

// open and close the about section with the about link and the close button
const aboutContainer = document.getElementById("about-container");
const aboutLink = document.getElementById("about-link");
const closeButton = document.getElementById("about-close");

aboutLink.onclick = function(){
    $(aboutContainer).fadeIn(300);
}

closeButton.onclick = function() {
    $(aboutContainer).fadeOut(300);
}



