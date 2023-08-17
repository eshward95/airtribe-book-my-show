class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    // 1)Filtering
    const excludedField = ["limit", "page", "sort", "fields"];
    excludedField.forEach((el) => delete queryObj[el]);

    // 2)Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    //Match exact string
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)
    );
    // This is for searching based on array of value for any fields
    //! Ex: genre : ["action","drama"]

    // We create a regex to match

    // Using the in operator we are doing a or check for the values
    // 1>This will return values which has either action or drama

    // Using the all operator that the search is for exact keywords
    // 2> This will return values which has both action and drama
    // if(queryStr)
    for (const key in queryStr) {
      if (typeof queryStr[key] != "object") {
        queryStr[key] = queryStr[key]?.split(",");
        if (Array.isArray(queryStr[key]) && queryStr[key].length > 1) {
          queryStr[key] = {
            $all: queryStr[key].map((value) => new RegExp(value, "i")),
          };
        } else {
          queryStr[key] = new RegExp(queryStr[key], "i");
        }
      }
    }
    this.query = this.query.find(queryStr);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeatures;
