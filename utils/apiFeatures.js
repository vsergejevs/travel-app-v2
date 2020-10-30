class APIFeatures {
  
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1) FILTERING
    // create a hard copy of the req.query object using destructuring
    // it contains all the requested tours from the server
    const queryObj = { ...this.queryString };

    // define query fields that will be removed if they appear in the querystring
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // delete query fields from the queryObj object before searching for querystrings
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) ADVANCED FILTERING
    // converting query object to string
    let queryStr = JSON.stringify(queryObj);
    // replacing the operators using regex and replace() method to add mongodb "$" operator
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    
    // search for all tours in the queryStr instead of req.query or queryObj as before and save it to query variable
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 3) Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    // 4) Field limiting to respond to api call with selected fields (like only tour name and )
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;

  }

  paginate() {
    // 5) Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;

  }

}
module.exports = APIFeatures;