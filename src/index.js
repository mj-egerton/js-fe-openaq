window.onload = () => {
  console.log("Script loaded...");
};

let searchInput = document.getElementById("searchbox");
let query;

searchInput.addEventListener("keyup", () => {
  query = searchInput.value;

  fetchAQDataByCity(query);
});

const fetchAQDataByCity = async (query) => {
  try {
    let response = await fetch(
      `https://api.openaq.org/v2/latest?city=${query}`
    );
    let data = await response.json();

    const formatArticles = data.results.map((article) =>
      formatLocationArticle({ ...article })
    );

    document.getElementById("search-results").innerHTML =
      formatArticles.join("");
  } catch (error) {
    console.log(error);
  }
};

const formatLocationArticle = ({
  city,
  coordinates,
  country,
  location,
  measurements,
}) => {
  return `<article class='air-quality-article'>   
        <h3>${city + ", " + country}</h3>
        <p>- ${location}</p>
        <p>- ${(coordinates.latitude, coordinates.longitude)}</p>
        <p>- ${measurements.map((measurement) => {
          return (
            measurement.parameter +
            " " +
            measurement.value +
            " " +
            measurement.unit
          );
        })}</p>
    </article>`;
};
