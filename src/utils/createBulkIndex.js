const { ESClient } = require("../config/elasticsearch");
const Movie_noSql = require("../models/movie_mongo");
const indexName = "movie_data";

async function createBulkMovieIndex() {
  const movieData = await Movie_noSql.find();
  try {
    await ESClient.indices.create({
      index: indexName,
      body: {
        settings: {
          analysis: {
            analyzer: {
              edge_ngram_analyzer: {
                type: "custom",
                tokenizer: "standard",
                filter: ["lowercase", "edge_ngram_tokenizer"],
              },
            },
            filter: {
              edge_ngram_tokenizer: {
                type: "edge_ngram",
                min_gram: 2, // Minimum n-gram length
                max_gram: 10, // Maximum n-gram length
                token_chars: ["letter", "digit"], // Token characters
              },
            },
          },
        },
        mappings: {
          properties: {
            name: {
              type: "text",
              analyzer: "edge_ngram_analyzer", // Use the custom analyzer
            },
            rating: {
              type: "text",
              //   analyzer: "edge_ngram_analyzer",
            },
            genre: {
              type: "text",
              //   analyzer: "edge_ngram_analyzer",
            },
            crew: {
              type: "text",
              //   analyzer: "edge_ngram_analyzer",
            },
            language: {
              type: "text",
              analyzer: "edge_ngram_analyzer",
            },
            description: {
              type: "text",
              //   analyzer: "edge_ngram_analyzer",
            },
          },
        },
      },
    });
    // const bulkRequests = [];
    for (const movie of movieData) {
      //   const indexRequest = {
      //     index: { _index: indexName },
      //     data: { name: movie.name, rating: movie.rating },
      //   };
      await ESClient.index({
        index: indexName,
        body: {
          name: movie.name,
          rating: movie.rating,
          crew: movie.crew,
          language: movie.language,
          genre: movie.genre,
        },
      });
      // await ESClient.indices.create({

      // })
    }
    // console.log("bulkRequests", bulkRequests);
    // const bulkResponse = await ESClient.bulk({
    //   refresh: true,
    //   body: bulkRequests,
    // });
    // console.log("bulkResponse", bulkResponse);
    // Check the response for errors
    // if (bulkResponse.error) {
    //   const erroredDocuments = [];

    //   bulkResponse.items.forEach((action, i) => {
    //     const operation = Object.keys(action)[0];
    //     if (action[operation].error) {
    //       erroredDocuments.push({
    //         status: action[operation].status,
    //         error: action[operation].error,
    //         data: bulkRequests[i],
    //       });
    //     }
    //   });

    //   console.error("Error indexing documents:", erroredDocuments);
    // }
  } catch (err) {
    console.log("err", err);
  }
}

module.exports = { createBulkMovieIndex };
