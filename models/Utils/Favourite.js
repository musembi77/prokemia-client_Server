const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema({
	uid: 				{ type: String},
	industries: 		[{ 
							name: String,
							link:String,
						}],
	technologies:		[{ 
							name: String,
							link:String
						}],
	distributors: 		[{ 
							name: String,
							industry: String,
							technology: String, 
							link: String
						}],
	manufacturers:		[{ 
							name: String,
							industry: String,
							technology: String, 
							link: String
						}],
	products: 			[{ 
							name: String,
							industry: String,
							technology: String, 
							link: String
						}],
	createdAt:			{ type: Date, default: Date.now}
},{timestamps:true})

module.exports = mongoose.model("favourites",FavouriteSchema)
