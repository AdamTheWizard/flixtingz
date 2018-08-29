const api_key = "1d416f57dfaeb8ebb4298e8b70c491e5";
const movies = document.getElementById("movies");
const imgUrl = "https://image.tmdb.org/t/p/w500/";
let pageCounter = 2;
 

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

          //create trailer link
          let newLink = document.createElement("a");
          newLink.className = "trailer-link";
          newLink.innerHTML = "<i class='trailer-icon fas fa-film'></i>";
          newLink.href = "https://www.youtube.com/results?search_query=trailer+" + item.title.replace(" ", "+");
          newLink.target = "_blank";
          
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
    $(".genre-buttons").css("opacity", "1");
    this.style.opacity = ".5";
    console.log(clickedButton);

    $.getJSON(`  https://api.themoviedb.org/3/discover/movie?&api_key=${api_key}&with_genres=${clickedButton}&region=GB&vote_average&page=1`, function success(data) {
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

                //create trailer link
                let newLink = document.createElement("a");
                newLink.className = "trailer-link";
                newLink.innerHTML = "<i class='trailer-icon fas fa-film'></i>";
                newLink.href = "https://www.youtube.com/results?search_query=trailer+" + item.title.replace(" ", "+");
                newLink.target = "_blank";
                
                newBox.appendChild(newPoster);
                newBox.appendChild(newTitle);
                newBox.appendChild(newOverview);
                newBox.appendChild(newLink);
                movies.appendChild(newBox);
                

              });
              
              // create 'more' button
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

function viewMore() {

    let genreCode = $(".view-more-button").attr("id");

    $.getJSON(`  https://api.themoviedb.org/3/discover/movie?&api_key=${api_key}&with_genres=${genreCode}&region=GB&vote_average&page=${pageCounter}`, function success(results) {
        console.log(results);  

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

          //create trailer link
          let newLink = document.createElement("a");
          newLink.className = "trailer-link";
          newLink.innerHTML = "<i class='trailer-icon fas fa-film'></i>";
          newLink.href = "https://www.youtube.com/results?search_query=trailer+" + results.title.replace(" ", "+");
          newLink.target = "_blank";

          
          newBox.appendChild(newPoster);
          newBox.appendChild(newTitle);
          newBox.appendChild(newOverview);
          newBox.appendChild(newLink);
          movies.appendChild(newBox);
          

        });
        
        // create 'more' button
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

const backToTopButton = document.getElementById("back-to-top");

backToTopButton.onclick = function(){
    setTimeout(
    window.scrollTo({top: 0,left: 0,behavior: 'smooth'}), 100);
}

window.onscroll = function(){
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        $(backToTopButton).fadeIn(1000);
    } else {
        $(backToTopButton).fadeOut(1000);
    }
    
}


const aboutContainer = document.getElementById("about-container");
const aboutLink = document.getElementById("about-link");
const closeButton = document.getElementById("about-close");

aboutLink.onclick = function(){
    $(aboutContainer).fadeIn(300);
}

closeButton.onclick = function() {
    $(aboutContainer).fadeOut(300);
}



