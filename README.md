# TicketLink airtribe
TicketLink is a ticketing platform where you can book tickets for a movie show.


## Getting Started

To get started with the application, you'll need to have Node.js and npm installed on your system. Once you've installed these dependencies, follow the instructions below:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/eshward95/airtribe-book-my-show.git
   ```

2. Install the necessary dependencies for both server and client:

   ```
   npm install
   ```

3. Start the server and client using:

   ```
   npm start
   ```

4. Open the application in your browser:
    >Server is running on   
     ```
   http://localhost:5000
   ```
   
### Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- MySql (with Sequelize)
- Elasticsearch

## Features

The chat application includes the following features:

- Search for movies
- Add review to moview
- Book seat in a particular theatre based on shows

## 1. Building APIs and Database Structure

### Sequelize (MySQL) Tables:

1. `Theatres` table:
   - `theatre_id` (Primary Key)
   - `theatre_name`
   - `city_id` (Foreign Key)

2. `Cities` table:
   - `city_id` (Primary Key)
   - `city_name`

3. `Seats` table:
   - `seat_id` (Primary Key)
   - `isBooked` 
   - `show_id` (Foreign Key referencing `Show`)

4. `Showtimes` table:
   - `showtime_id` (Primary Key)
   - `theatre_id` (Foreign Key referencing `Theatres`)
   - `movie_id` (Foreign Key referencing Movies)
   - `showtime_datetime`

4. `Booking` table:
   - `name` 
   - `showId` (Foreign Key referencing Show)
   - `seat_id` (Foreign Key referencing Seat)

   ### Mongoose (MongoDB) Schema:

1. `Movies` collection:
   - `movie_id` (Unique Identifier)
   - `movie_title`
   - Other movie-related information

2. `reviews` collection:
   - `review_id` (Unique Identifier)
   - `movie_id` (Reference to Movies collection)
   - Other review-related information

   ### Mongoose (MongoDB) Schema:

### API Endpoints:

https://documenter.getpostman.com/view/6256239/2s9Y5WyjGR

1. **Get Theatres:**
   - Endpoint: `/theater/city`
   - Method: GET
   - Returns a list of theatres in a city.

2. **Get Show for Theatre:**
   - Endpoint: `/theater/{theatre_id}|name/show`
   - Method: GET

3. **Get Movie Details:**
   - Endpoint: `/movies/{movie_id}`
   - Method: GET
   - Parameters: `movie_id` (required, the ID of the movie)
   - Returns detailed information about the specified movie, including showtimes and reviews.

4. **Filter Movie**
   - Endpoint: `movie?genre=action`
   - Method: GET
   - Parameters: `genre,language,crew` (required)
   - Returns detailed information about query

   ### Example Elasticsearch Query:

When a user searches for "ava," the Elasticsearch query might look something like:

```json
{
  "query": {
    "match": {
      "title": {
        "query": "ava",
      }
    }
  }
}
```

5. **Filter Movie**
   - Endpoint: `/movies/_search?query={searchQuery}`
   - Method: GET
   - Parameters: `searchQuery` (required, query like partial match)
   - Returns detailed information about Searched query

## Elasticsearch for Partial Text Search

For Elasticsearch integration, you can use it as a search engine for efficient partial text searching.

### Elasticsearch Indexing:

1. Create an Elasticsearch index to store movie-related data.
2. Configure the index to tokenize and analyze the text appropriately for partial text matching using grams.

